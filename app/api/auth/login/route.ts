import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@oxidlabs.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const AUTH_COOKIE_NAME = "oxid_admin_session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      // Set secure session cookie
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE_NAME, "authenticated_session_token_" + Date.now(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Login berhasil. Selamat datang di OXID Labs Control Room.",
        user: { email: ADMIN_EMAIL, role: "admin" },
      });
    }

    return NextResponse.json(
      { success: false, error: "Email atau password tidak sesuai. Coba 'admin@oxidlabs.com' / 'admin123'." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server autentikasi." },
      { status: 500 }
    );
  }
}
