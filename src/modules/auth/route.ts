import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { AuthLoginSchema, AuthRegisterSchema } from "./schema";
import { PrivateUserSchema } from "../user/schema";
import { bundlerModuleNameResolver } from "typescript";
import { hashPassword, verifyPassword } from "../../lib/password";

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
        content: { "application/json": { schema: PrivateUserSchema } },
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

    const { password, ...userWithoutPassword } = user;

    return c.json(userWithoutPassword);
  }
);

authRoute.openapi(
  createRoute({
    method: "post",
    path: "/me",

    responses: {
      200: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Get Authenticated User Success",
      },
      404: { description: "User Not Found" },
    },
  }),

  async (c) => {
    const user = await prisma.user.findFirst();
    if (!user) {
      return c.notFound();
    }

    return c.json(user);
  }
);
