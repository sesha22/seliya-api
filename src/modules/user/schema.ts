import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
});

export const UsersSchema = z.array(UserSchema);

export const UserIdSchema = z.object({
  id: z.string(),
});
