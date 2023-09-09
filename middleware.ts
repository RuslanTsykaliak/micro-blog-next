export { default } from "next-auth/middleware"

// The " " route will require authentication.
export const config = {matcher: ["/blog"]}