import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  DIRECT_URL: z.string().min(1).optional(),
  AUTH_SECRET: z.string().min(32).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const parsedServerEnv = serverEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsedServerEnv.success) {
  console.warn("Environment variables are incomplete. Falling back where possible.");
}

export const env = {
  databaseUrl: process.env.DATABASE_URL,
  directUrl: process.env.DIRECT_URL,
  authSecret:
    process.env.AUTH_SECRET ??
    "development-only-auth-secret-change-this-before-production",
  publicSiteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bengkellasal-ihsan.com",
};

export const hasDatabaseUrl = Boolean(env.databaseUrl);
