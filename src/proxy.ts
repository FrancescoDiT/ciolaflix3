import { NextResponse, type NextRequest } from 'next/server'
import { decodeJwt } from 'jose'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

const EXCLUDED_ROUTES = [
  "/login",
]

/**
 * Helper per generare NextResponse.next() iniettando il pathname negli headers della request
 */
function nextWithPathname(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-pathname', request.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers,
    },
  })
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip per route escluse
  if (EXCLUDED_ROUTES.some(route => pathname.startsWith(route))) {
    return nextWithPathname(request)
  }

  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value


  // Nessun access_token -- lascia passare, ServerProtectedRoute gestirà il redirect
  if (!accessToken && !refreshToken) {
    return nextWithPathname(request)
  }

  // Decodifica JWT senza verifica firma, solo per leggere exp
  if(accessToken) {
    try {
      const payload = decodeJwt(accessToken)
      const now = Math.floor(Date.now() / 1000)

      // Aggiungiamo un buffer di 10 secondi per sicurezza
      if (payload.exp && payload.exp > (now + 10)) {
        // Token ancora valido
        return nextWithPathname(request)
      }
    } catch {
      // Token malformato, prosegui con tentativo di refresh
    }
  }

  // Token scaduto o prossimo alla scadenza -- tenta il refresh

  if (!refreshToken) {
    return nextWithPathname(request)
  }

  try {
    const refreshResponse = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    })

    if (!refreshResponse.ok) {
      // Se il refresh fallisce (es 401), lascia passare: 
      // ServerProtectedRoute gestirà il redirect a /login
      return nextWithPathname(request)
    }

    const setCookies = refreshResponse.headers.getSetCookie()

    // Aggiorna i cookie nella request corrente per le server components/route
    for (const cookie of setCookies) {
      const [nameValue] = cookie.split(';')
      const [name, value] = nameValue.split('=')
      if (name?.trim() === 'access_token' && value) {
        request.cookies.set('access_token', value)
      }
    }

    // Forward del Set-Cookie (nuovo access_token) dal backend al client
    // Includiamo x-pathname negli headers della request inoltrata
    const headers = new Headers(request.headers)
    headers.set('x-pathname', pathname)

    const response = NextResponse.next({
      request: {
        headers,
      },
    })

    for (const cookie of setCookies) {
      response.headers.append('Set-Cookie', cookie)
    }

    return response
  } catch (error) {
    console.error("[Proxy] Refresh error:", error)
    return nextWithPathname(request)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
