import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|studio).*)", // Exclude only static files and the studio route
    "/(api|trpc)(.*)", // Always run for API routes
  ],
};
