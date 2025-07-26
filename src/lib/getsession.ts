import { cookies } from "next/headers";
import { Session, User } from "./Types";

const getSelf = async () => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/auth/self`,
    {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      },
    }
  );
  if (!response.ok) {
    return null;
  }

  return {
    user: (await response.json()) as User,
  };
};

export const getSession = async (): Promise<Session | null> => {
  return await getSelf();
};
