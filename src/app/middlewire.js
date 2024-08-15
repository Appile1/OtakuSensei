// middleware.js
"use client";
import { AuthContext } from "../components/authContext.js";
import { NextResponse } from "next/server";

export function middleware(request) {
  const { user } = AuthContext;
  // Check if the user is authenticated

  // If not authenticated, redirect to the login page
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated, continue to the requested page
  return NextResponse.next();
}

// Apply this middleware to the specific page you want to protect
export const config = {
  matcher: "/", // Adjust this path to the correct route in your app
};
