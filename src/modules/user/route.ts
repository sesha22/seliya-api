import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { UserSchema, UsersSchema, UsersIdSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export const userRoute = new OpenAPIHono();

userRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: UserSchema,
          },
        },
        description: "Get all products",
      },
    },
  }),

  async (c) => {
    const users = await prisma.user.findMany({
      omit: {
        email: true,
      },
    });
    return c.json(users);
  }
);

userRoute.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    request: {
      params: UsersIdSchema,
    },

    responses: {
      200: {
        content: {
          "application/json": {
            schema: UserSchema,
          },
        },
        description: "Get all user",
      },
      404: {
        description: " Not Found",
      },
    },
  }),

  async (c) => {
    const { id } = c.req.valid("param");
    const user = await prisma.user.findUnique({
      where: { id },
      omit: {
        email: true,
      },
    });
    if (!user) {
      return c.json({ message: "Product not found" }, 404);
    }

    return c.json(user);
  }
);
