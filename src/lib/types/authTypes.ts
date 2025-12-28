import { authClient } from "@/lib/authClient";

export type AuthSession =
  | ReturnType<typeof authClient.useSession>
  | Awaited<ReturnType<typeof authClient.getSession>>;
