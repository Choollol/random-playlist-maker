import { Session } from "@/lib/auth";
import { UserId } from "@/lib/types/authTypes";

export function getUserIdFromData(userData: Session): UserId {
  return userData.user.email;
}
