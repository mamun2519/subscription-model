export const RoleHierarchy: Record<string, string[]> = {
  super_admin: ["admin"],
  admin: ["manager"],
  manager: ["premium_user"],
  premium_user: ["user"],
  user: [],
} as const;

export const RoleBasedPermission: Record<string, string[]> = {
  user: ["product:read"],
};
