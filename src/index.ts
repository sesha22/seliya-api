import { cors } from "hono/cors";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { prisma } from "./lib/prisma";
import { ProductSchema } from "./modules/product/schema";
const app = new OpenAPIHono();

app.use(cors());

app.openapi(
  createRoute({
    method: "get",
    path: "/products",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: ProductSchema,
          },
        },
        description: "Get all products",
      },
    },
  }),

  async (c) => {
    const products = await prisma.product.findMany();
    return c.json(products);
  }
);

app.doc("openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Seliya API",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
