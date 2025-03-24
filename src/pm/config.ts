export const RoleHierarchy: Record<string, string[]> = {
      admin: ["manager"]
  manager: ["premium_user"],
  premium_user: ["user"],
  user: [],
};
