import { authClient } from "@/lib/authClient";

export type UseSessionResult = ReturnType<typeof authClient.useSession>;
