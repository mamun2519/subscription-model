import { Permission, Role } from "./enum";

export const RoleHierarchy: Record<string, string[]> = {
  super_admin: [Role.ADMIN],
  admin: [Role.MANAGER],
  manager: [Role.PREMIUM_USER],
  premium_user: [Role.USER],
  user: [],
} as const;

export const RoleBasedPermission: Record<string, string[]> = {
      premium_user: [Permission.PRODUCT_REVIEW]
  user: [Permission.PRODUCT_READ],
};
