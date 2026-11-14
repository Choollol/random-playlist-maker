import { Session } from "@/common/lib/auth/auth";
import { UserId } from "@/common/lib/auth/authTypes";

export function getUserIdFromData(userData: Session): UserId {
  return userData.user.email;
}
