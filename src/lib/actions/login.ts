/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import cookie from "cookie";
import { cookies } from "next/headers";

export default async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return {
        type: "error",
        message: error.errors[0].message,
      };
    }
    const cookieArray = response.headers.getSetCookie();
    const accessToken = cookieArray.find((cookie) =>
      cookie.includes("accessToken")
    );
    const refreshToken = cookieArray.find((cookie) =>
      cookie.includes("refreshToken")
    );

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No cookie was found!",
      };
    }

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    (await cookies()).set({
      name: "accessToken",
      value: parsedAccessToken.accessToken as string,
      expires: new Date(parsedAccessToken.expires as unknown as Date) as Date,
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.sameSite as "strict",
    });

    (await cookies()).set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken as string,
      expires: new Date(parsedRefreshToken.expires as unknown as Date) as Date,
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      path: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.sameSite as "strict",
    });

    return {
      type: "success",
      message: "Login successfully!",
    };
  } catch (err: any) {
    return {
      type: "error",
      message: err.message,
    };
  }
}
