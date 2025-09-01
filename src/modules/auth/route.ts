import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import {
  AuthHeaderSchema,
  AuthLoginSchema,
  AuthLoginSuccessSchema,
  AuthRegisterSchema,
} from "./schema";
import { PrivateUserSchema } from "../user/schema";
import { bundlerModuleNameResolver } from "typescript";
import { hashPassword, verifyPassword } from "../../lib/password";
import { signToken, verifyToken } from "../../lib/token";

export const authRoute = new OpenAPIHono();

authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: {
      body: {
        content: { "application/json": { schema: AuthRegisterSchema } },
      },
    },
    responses: {
      201: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Register User Success",
      },
      400: {
        description: "Register User Failed",
      },
    },
  }),

  async (c) => {
    const body = c.req.valid("json");

    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          fullName: body.fullName,
          password: {
            create: {
              hash: await hashPassword(body.password),
            },
          },
        },
      });

      return c.json(user, 201);
    } catch (error) {
      return c.json(
        {
          message: "Register User Failed",
        },
        400
      );
    }
  }
);

authRoute.openapi(
  createRoute({
    method: "post",
    path: "/login",
    request: {
      body: {
        content: { "application/json": { schema: AuthLoginSchema } },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: AuthLoginSuccessSchema } },
        description: "Login Success",
      },
      400: { description: "Login Failed" },
      404: { description: "User Not Found" },
    },
  }),

  async (c) => {
    const body = c.req.valid("json");
    const user = await prisma.user.findUnique({
      where: { email: body.email },
      include: { password: true },
    });
    if (!user) {
      return c.notFound();
    }
    if (!user.password) {
      return c.notFound();
    }

    const isPasswordMatch = await verifyPassword(
      body.password,
      user.password.hash
    );
    if (!isPasswordMatch) {
      return c.json({ message: "Password Invalid" }, 400);
    }

    const token = await signToken(user.id);

    return c.json(token);
  }
);

authRoute.openapi(
  createRoute({
    method: "post",
    path: "/me",
    request: { headers: AuthHeaderSchema },

    responses: {
      200: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Get Authenticated User Success",
      },
      404: { description: "User Not Found" },
    },
  }),

  async (c) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.json({ message: "Authorization Header is Required" }, 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return c.json({ message: "Token is Required" }, 401);
    }

    const decodedPayload = await verifyToken(token);
    if (!decodedPayload) {
      return c.json({ message: "Invalid Token" }, 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedPayload.sub },
    });
    if (!user) {
      return c.json({ message: "User is No Longer Availabel" }, 401);
    }

    return c.json(user);
  }
);
