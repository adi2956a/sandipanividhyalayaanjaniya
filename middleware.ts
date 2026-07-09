export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/notices/:path*",
    "/admin/gallery/:path*",
    "/admin/downloads/:path*",
    "/admin/student-resources/:path*",
    "/admin/previous-papers/:path*",
    "/admin/complaints/:path*",
    "/admin/homepage/:path*",
    "/admin/settings/:path*"
  ]
};
