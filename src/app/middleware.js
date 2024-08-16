// src/app/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware is running");

  // Replace this with actual authentication logic
  const authenticated = false; // Change this to your actual authentication check

  console.log("User authenticated:", authenticated);

  // If not authenticated, redirect to the login page
  if (!authenticated) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// Apply this middleware to the specific page you want to protect
export const config = {
  matcher: "/", // This protects the landing page (http://localhost:3000/)
};
