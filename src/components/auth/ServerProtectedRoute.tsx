"use server"

import React from "react";
import {isAuthorized} from "@/components/auth/action";
import {redirect} from "next/navigation";
import {headers} from "next/headers";

const ServerProtectedRoute = async ({children, requiredRoles}: {children: React.ReactNode, requiredRoles?: string[]}) => {

  const authStatus = await isAuthorized(requiredRoles)

  if(authStatus === 200) {
    return <>{children}</>
  } else if (authStatus === 403) {
    redirect("/")
  } else {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || "/";
    redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
  }
}

export default ServerProtectedRoute