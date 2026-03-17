"use server"

import {jwtVerify, type JWTPayload, base64url} from "jose";
import { cookies } from "next/headers";

const secret = base64url.decode(process.env.JWT_SECRET!)


export type AppJwtPayload = JWTPayload & {
  sub: string;
  jti: string;
  token_type: "ACCESS" | "REFRESH";
  auth_id: number;
  user_id: number;
  roles: string[];
  first_name: string;
  last_name: string;
};

async function verifyToken(token: string) {
  if (!secret) {
    throw new Error("JWT_SECRET non definito");
  }

  const { payload } = await jwtVerify<AppJwtPayload>(token, secret, {
    algorithms: ["HS256"],
  });
  return payload;
}

async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("access_token")?.value ?? null
}


export async function isAuthorized(roles?: string[]): Promise<number> {
  const access_token = await getAccessToken();

  if(!access_token) {
    return 401
  }

  try {
    const payload = await verifyToken(access_token);

    if(!roles) {
      return 200
    }
    else {
      if (roles.some(r => payload.roles.includes(r))) {
        return 200
      } else {
        return 403
      }
    }
  } catch {
    return 401;
  }
}

