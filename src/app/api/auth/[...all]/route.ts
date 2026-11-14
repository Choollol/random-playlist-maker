import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/common/lib/auth/auth";

export const { GET, POST } = toNextJsHandler(auth);
