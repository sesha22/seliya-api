import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { AuthLoginSchema, AuthRegisterSchema } from "./schema";
import { PrivateUserSchema } from "../user/schema";

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
      404: { description: "User Not Found" },
    },
  }),

  async (c) => {
    const body = c.req.valid("json");
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return c.notFound();
    }

    return c.json(user);
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
