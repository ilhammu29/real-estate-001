import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "oxid_admin_session";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);

  if (session && session.value) {
    return NextResponse.json({
      authenticated: true,
      user: {
        email: process.env.ADMIN_EMAIL || "admin@oxidlabs.com",
        role: "admin",
      },
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
