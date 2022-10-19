// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 *
 * Remember to update existing GitHub workflows that use env vars!
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_URL: z.string().url(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 *
 * Remember to update existing GitHub workflows that use env vars!
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_BAR: z.string(),
});

/**
 * You can't destructure `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_BAR: process.env.NEXT_PUBLIC_BAR,
};
