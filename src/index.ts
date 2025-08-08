import { Hono } from "hono";
import { PrismaClient } from "./lib/prisma";
import { cors } from "hono/cors";
import { ProductSchema } from "./modules/product/schema";

const prisma = new PrismaClient();

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.json({
    message: "Seliya Backend API",
  });
});

app.get("/products", async (c) => {
  const products = await prisma.product.findMany();
  return c.json({ products });
});

app.get("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const product = await prisma.product.findUnique({
    where: { id },
  });

  return c.json({ product });
});

app.post("/products", async (c) => {
  const body = await c.req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      spicy: body.spicy,
    },
  });

  return c.json(product);
});

app.delete("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));

  try {
    const deleted = await prisma.product.delete({
      where: { id },
    });

    return c.json(deleted);
  } catch (error) {
    return c.json({ error: "Product not found" }, 404);
  }
});

app.patch("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        spicy: body.spicy,
      },
    });

    return c.json(updated);
  } catch (error) {
    return c.json({ error: "Product not found or update failed" }, 404);
  }
});

const route = createRoute({
  method: "get",
  path: "/products",

  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProductSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});

app.openapi(route, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Ultra-man",
  });
});

export default app;
