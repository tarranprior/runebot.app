import { handlers } from "@/lib/auth/config";

/**
 * Auth.js v5 catch-all route handler.
 *
 * Handles all GET and POST requests under /api/auth/*:
 *   GET  /api/auth/signin
 *   GET  /api/auth/signin/discord   (redirects to Discord OAuth)
 *   GET  /api/auth/callback/discord (Discord redirects here after auth)
 *   GET  /api/auth/signout
 *   POST /api/auth/signout
 *   GET  /api/auth/session
 *
 * The Discord OAuth callback URL to register in the Discord Developer Portal:
 *   Local:      http://localhost:3000/api/auth/callback/discord
 *   Production: https://<your-domain>/api/auth/callback/discord
 */
export const { GET, POST } = handlers;
