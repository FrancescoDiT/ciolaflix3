import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type TmdbResponseDTO = Partial<{
  page: number;
  results: Array<TmdbMovieDTO>;
  total_pages: number;
  total_results: number;
}>;
type TmdbMovieDTO = Partial<{
  id: number;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  first_air_date: string;
  genre_ids: Array<number>;
  media_type: string;
}>;

const UpdateUserInfoRequestDTO = z
  .object({ name: z.string().min(1), lastname: z.string().min(1) })
  .partial()
  .passthrough();
const MediaRequestDTO = z
  .object({
    mediaId: z.string().min(1),
    mediaType: z.enum(["MOVIE", "TV"]),
  })
  .passthrough();
const ContinueWatchingRequestDTO = z
  .object({
    mediaId: z.string().min(1),
    mediaType: z.enum(["MOVIE", "TV"]),
    currentTime: z.number().int().gte(0),
    seasonId: z.number().int().optional(),
    episodeId: z.number().int().optional(),
  })
  .passthrough();
const SignupRequestDTO = z
  .object({
    email: z.string().min(1),
    password: z.string().min(8).max(2147483647),
    repeatPassword: z.string().min(1),
    name: z.string().min(1),
    lastname: z.string().min(1),
  })
  .passthrough();
const AuthResponseDTO = z
  .object({
    needOTP: z.boolean(),
    access_token: z.string(),
    refresh_token: z.string(),
    access_token_expiration: z.number().int(),
    refresh_token_expiration: z.number().int(),
    userJson: z.string(),
  })
  .partial()
  .passthrough();
const UnauthorizedException = z
  .object({
    cause: z
      .object({
        stackTrace: z.array(
          z
            .object({
              classLoaderName: z.string(),
              moduleName: z.string(),
              moduleVersion: z.string(),
              methodName: z.string(),
              fileName: z.string(),
              lineNumber: z.number().int(),
              className: z.string(),
              nativeMethod: z.boolean(),
            })
            .partial()
            .passthrough()
        ),
        message: z.string(),
        localizedMessage: z.string(),
      })
      .partial()
      .passthrough(),
    stackTrace: z.array(
      z
        .object({
          classLoaderName: z.string(),
          moduleName: z.string(),
          moduleVersion: z.string(),
          methodName: z.string(),
          fileName: z.string(),
          lineNumber: z.number().int(),
          className: z.string(),
          nativeMethod: z.boolean(),
        })
        .partial()
        .passthrough()
    ),
    status: z.enum([
      "100 CONTINUE",
      "101 SWITCHING_PROTOCOLS",
      "102 PROCESSING",
      "103 EARLY_HINTS",
      "200 OK",
      "201 CREATED",
      "202 ACCEPTED",
      "203 NON_AUTHORITATIVE_INFORMATION",
      "204 NO_CONTENT",
      "205 RESET_CONTENT",
      "206 PARTIAL_CONTENT",
      "207 MULTI_STATUS",
      "208 ALREADY_REPORTED",
      "226 IM_USED",
      "300 MULTIPLE_CHOICES",
      "301 MOVED_PERMANENTLY",
      "302 FOUND",
      "303 SEE_OTHER",
      "304 NOT_MODIFIED",
      "307 TEMPORARY_REDIRECT",
      "308 PERMANENT_REDIRECT",
      "400 BAD_REQUEST",
      "401 UNAUTHORIZED",
      "402 PAYMENT_REQUIRED",
      "403 FORBIDDEN",
      "404 NOT_FOUND",
      "405 METHOD_NOT_ALLOWED",
      "406 NOT_ACCEPTABLE",
      "407 PROXY_AUTHENTICATION_REQUIRED",
      "408 REQUEST_TIMEOUT",
      "409 CONFLICT",
      "410 GONE",
      "411 LENGTH_REQUIRED",
      "412 PRECONDITION_FAILED",
      "413 CONTENT_TOO_LARGE",
      "413 PAYLOAD_TOO_LARGE",
      "414 URI_TOO_LONG",
      "415 UNSUPPORTED_MEDIA_TYPE",
      "416 REQUESTED_RANGE_NOT_SATISFIABLE",
      "417 EXPECTATION_FAILED",
      "418 I_AM_A_TEAPOT",
      "421 MISDIRECTED_REQUEST",
      "422 UNPROCESSABLE_CONTENT",
      "422 UNPROCESSABLE_ENTITY",
      "423 LOCKED",
      "424 FAILED_DEPENDENCY",
      "425 TOO_EARLY",
      "426 UPGRADE_REQUIRED",
      "428 PRECONDITION_REQUIRED",
      "429 TOO_MANY_REQUESTS",
      "431 REQUEST_HEADER_FIELDS_TOO_LARGE",
      "451 UNAVAILABLE_FOR_LEGAL_REASONS",
      "500 INTERNAL_SERVER_ERROR",
      "501 NOT_IMPLEMENTED",
      "502 BAD_GATEWAY",
      "503 SERVICE_UNAVAILABLE",
      "504 GATEWAY_TIMEOUT",
      "505 HTTP_VERSION_NOT_SUPPORTED",
      "506 VARIANT_ALSO_NEGOTIATES",
      "507 INSUFFICIENT_STORAGE",
      "508 LOOP_DETECTED",
      "509 BANDWIDTH_LIMIT_EXCEEDED",
      "510 NOT_EXTENDED",
      "511 NETWORK_AUTHENTICATION_REQUIRED",
    ]),
    category: z.string(),
    description: z.string(),
    message: z.string(),
    suppressed: z.array(
      z
        .object({
          stackTrace: z.array(
            z
              .object({
                classLoaderName: z.string(),
                moduleName: z.string(),
                moduleVersion: z.string(),
                methodName: z.string(),
                fileName: z.string(),
                lineNumber: z.number().int(),
                className: z.string(),
                nativeMethod: z.boolean(),
              })
              .partial()
              .passthrough()
          ),
          message: z.string(),
          localizedMessage: z.string(),
        })
        .partial()
        .passthrough()
    ),
    localizedMessage: z.string(),
  })
  .partial()
  .passthrough();
const LoginRequestDTO = z
  .object({
    subject: z.string().min(1).optional(),
    totpCode: z.string().optional(),
    password: z.string().min(1),
    rememberMe: z.boolean().optional(),
  })
  .passthrough();
const ExceptionResponseDTO = z
  .object({
    timestamp: z.string().datetime({ offset: true }),
    status: z.number().int(),
    category: z.string(),
    message: z.string(),
  })
  .partial()
  .passthrough();
const TOTPRegistrationResponse = z
  .object({ secret: z.string(), qrURI: z.string() })
  .partial()
  .passthrough();
const Enable2FARequest = z
  .object({ secret: z.string().min(1), totp: z.string().min(1) })
  .partial()
  .passthrough();
const TFAEnabledResponse = z
  .object({ recoveryCodes: z.array(z.string()) })
  .partial()
  .passthrough();
const Disable2FA = z
  .object({ code: z.string().min(1) })
  .partial()
  .passthrough();
const Disable2FAWithRecoveryRequest = z
  .object({
    subject: z.string().min(1),
    password: z.string().min(1),
    recoveryCode: z.string().min(1),
  })
  .partial()
  .passthrough();
const ErrorResponse = z
  .object({ status: z.number().int(), error: z.string(), message: z.string() })
  .partial()
  .passthrough();

export const schemas = {
  UpdateUserInfoRequestDTO,
  MediaRequestDTO,
  ContinueWatchingRequestDTO,
  SignupRequestDTO,
  AuthResponseDTO,
  UnauthorizedException,
  LoginRequestDTO,
  ExceptionResponseDTO,
  TOTPRegistrationResponse,
  Enable2FARequest,
  TFAEnabledResponse,
  Disable2FA,
  Disable2FAWithRecoveryRequest,
  ErrorResponse,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/2fa",
    alias: "request2FA",
    description: `Generates a new TOTP secret key and QR code for setting up two-factor authentication.

This endpoint initializes the 2FA setup process by generating a unique secret key
for the current user and a corresponding QR code that can be scanned by
authenticator apps (Google Authenticator, Authy, etc.).

After calling this endpoint, the user should:
1. Scan the QR code with their authenticator app
2. Call POST /api/2fa with the secret and a generated TOTP code to complete setup

Note: This endpoint does not enable 2FA by itself. The user must confirm by
providing a valid TOTP code via the POST endpoint.
`,
    requestFormat: "json",
    response: TOTPRegistrationResponse,
    errors: [
      {
        status: 400,
        description: `User not authenticated`,
        schema: TOTPRegistrationResponse,
      },
      {
        status: 409,
        description: `2FA is already enabled for this user`,
        schema: TOTPRegistrationResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/2fa",
    alias: "enable2FA",
    description: `Enables TOTP-based two-factor authentication for the current user.

This endpoint validates the TOTP code provided by the user along with
the secret key. Once enabled, the user will be required to provide a
valid TOTP code during login in addition to their password.

The user should first call GET /api/2fa to obtain the secret key and
QR code, then use an authenticator app (e.g., Google Authenticator,
Authy) to generate TOTP codes.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Enable2FARequest,
      },
    ],
    response: TFAEnabledResponse,
    errors: [
      {
        status: 400,
        description: `Invalid TOTP code or secret`,
        schema: TFAEnabledResponse,
      },
      {
        status: 401,
        description: `User not authenticated`,
        schema: TFAEnabledResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/2fa/disable",
    alias: "disable2FA",
    description: `Disables TOTP-based two-factor authentication for the current user.

This endpoint validates the TOTP code provided by the user to ensure
they have access to their authenticator app before disabling 2FA.

Once disabled, the user will only need their email and password to log in.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({ code: z.string().min(1) })
          .partial()
          .passthrough(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid TOTP code`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `User not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/2fa/disable-recovery",
    alias: "disable2FAWithRecovery",
    description: `Disables two-factor authentication using a recovery code.

This endpoint is designed for users who have lost access to their
authenticator app. It validates the user&#x27;s credentials (email/username
and password) along with a valid recovery code to disable 2FA.

Once used, the recovery code is invalidated and cannot be reused.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Disable2FAWithRecoveryRequest,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid credentials or recovery code`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Authentication failed`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/auth/login",
    alias: "login",
    description: `Authenticate user with email and password, returns JWT tokens`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: LoginRequestDTO,
      },
    ],
    response: AuthResponseDTO,
    errors: [
      {
        status: 401,
        description: `Invalid credentials`,
        schema: ExceptionResponseDTO,
      },
    ],
  },
  {
    method: "post",
    path: "/auth/logout",
    alias: "logout",
    description: `Clears the authentication cookies to log out the user.

This endpoint expires both the access_token and refresh_token cookies,
effectively ending the user&#x27;s session on the client side.

Note: Since JWTs are stateless, the tokens remain valid until their
natural expiration time. For immediate token revocation, consider
implementing a token blacklist or similar mechanism.
`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/auth/refresh",
    alias: "refresh",
    description: `Generates a new access token using a valid refresh token.

For security, this endpoint also rotates the refresh token,
returning a new refresh token that should be stored by the client.

Use this endpoint when the access token expires to obtain a new one
without requiring the user to log in again.

`,
    requestFormat: "json",
    response: AuthResponseDTO,
    errors: [
      {
        status: 401,
        description: `Missing refresh_token cookie or invalid/expired refresh token`,
        schema: UnauthorizedException,
      },
    ],
  },
  {
    method: "get",
    path: "/auth/status",
    alias: "getAuthStatus",
    description: `Checks if the user is authenticated and returns user details.`,
    requestFormat: "json",
    response: AuthResponseDTO,
    errors: [
      {
        status: 401,
        description: `Not authenticated`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/ciola/info",
    alias: "getUserInfo",
    description: `Retrieves the first and last name of the current authenticated user`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/ciola/info",
    alias: "updateUserInfo",
    description: `Updates the first and last name of the current authenticated user`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateUserInfoRequestDTO,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request data`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/ciola/signup",
    alias: "signUp",
    description: `Register a new user with email, password, name and lastname`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SignupRequestDTO,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid input data`,
        schema: z.void(),
      },
      {
        status: 409,
        description: `Email already in use`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/continuewatching/add",
    alias: "addContinueWatching",
    description: `Adds or updates a continue watching entry for the current user. If an entry with the same user and media exists, it will be updated with the new timestamp.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ContinueWatchingRequestDTO,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request or movie cannot have seasons/episodes`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Media not found in TMDB`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error connecting to TMDB`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/continuewatching/delete",
    alias: "deleteContinueWatching",
    description: `Removes a media item from the current user&#x27;s continue watching list`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MediaRequestDTO,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Media not found in TMDB or continue watching list`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error connecting to TMDB`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/continuewatching/get",
    alias: "getContinueWatching",
    description: `Retrieves a list of all media that the current user is watching`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/liked/add",
    alias: "addLiked",
    description: `Adds a media item to the current user&#x27;s liked list. If the media doesn&#x27;t exist in the database, it will be created automatically.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MediaRequestDTO,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request, invalid media type, or media already liked by user`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User or media not found in TMDB`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error connecting to TMDB`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/liked/delete",
    alias: "deleteLiked",
    description: `Removes a media item from the current user&#x27;s liked list`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MediaRequestDTO,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request or invalid media type`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User, media, or liked entry not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error connecting to TMDB`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/liked/get",
    alias: "getLiked",
    description: `Retrieves a list of all media IDs that the current user has liked`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/party/session",
    alias: "createSession",
    description: `Creates a new watch party session and returns the generated session ID`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/discover/movie",
    alias: "getMoviesByGenre",
    description: `Retrieves a list of movies filtered by genre ID from TMDB`,
    requestFormat: "json",
    parameters: [
      {
        name: "with_genres",
        type: "Query",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/discover/tv",
    alias: "getTVByGenre",
    description: `Retrieves a list of TV shows filtered by genre ID from TMDB`,
    requestFormat: "json",
    parameters: [
      {
        name: "with_genres",
        type: "Query",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/movie/:id",
    alias: "getMovieDetail",
    description: `Retrieves detailed information about a specific movie from TMDB`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "append_to_response",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/movie/now_playing",
    alias: "getNowPlayingMovies",
    description: `Retrieves a list of movies currently playing in theaters from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/movie/popular",
    alias: "getPopularMovies",
    description: `Retrieves a list of popular movies from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/movie/top_rated",
    alias: "getTopRatedMovies",
    description: `Retrieves a list of top rated movies from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/search/multi",
    alias: "searchMulti",
    description: `Searches for movies, TV shows, and people matching the query from TMDB`,
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/trending/all/week",
    alias: "getTrendingAll",
    description: `Retrieves all trending media (movies and TV shows) for the current week from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/trending/movie/week",
    alias: "getTrendingMovies",
    description: `Retrieves trending movies for the current week from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/trending/tv/week",
    alias: "getTrendingTV",
    description: `Retrieves trending TV shows for the current week from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/tv/:id",
    alias: "getTvDetail",
    description: `Retrieves detailed information about a specific TV show from TMDB`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "append_to_response",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/tv/:id/season/:seasonNumber",
    alias: "getSeasonEpisodes",
    description: `Retrieves episode list for a specific season of a TV show from TMDB`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "seasonNumber",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/tv/on_the_air",
    alias: "getOnTheAirTV",
    description: `Retrieves a list of TV shows currently on the air from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/tv/popular",
    alias: "getPopularTV",
    description: `Retrieves a list of popular TV shows from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/tmdb/tv/top_rated",
    alias: "getTopRatedTV",
    description: `Retrieves a list of top rated TV shows from TMDB`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/watchlater/add",
    alias: "addWatchLater",
    description: `Adds a media item to the current user&#x27;s watch later list.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MediaRequestDTO,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request, invalid media type, or media already in watch later list`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User or media not found in TMDB`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error connecting to TMDB`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/watchlater/delete",
    alias: "deleteWatchLater",
    description: `Removes a media item from the current user&#x27;s watch later list.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MediaRequestDTO,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request or invalid media type`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User, media, or watch later entry not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error connecting to TMDB`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/watchlater/get",
    alias: "getWatchLater",
    description: `Retrieves the list of media in the current user&#x27;s watch later list.`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized - user not authenticated`,
        schema: z.void(),
      },
    ],
  },
]);

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export const zodClient = new Zodios(baseUrl, endpoints, {
    axiosConfig: {
        withCredentials: true
    }
});
