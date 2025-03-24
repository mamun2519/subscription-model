import { RoleHierarchy } from "./config";

interface PermissionContext {
  roles: string[];
  permissions: string[];
}

export class PermissionManager {
  private readonly cachedRoleHierarchy: Map<string, Set<string>> = new Map();
  private readonly cachedRolePermissions: Map<string, Set<string>> = new Map();

  constructor(private readonly context: PermissionContext) {
    Object.keys(RoleHierarchy).forEach((role) => {
      this.cachedRoleHierarchy.set(role, this.computeRoleHierarchy(role));
    });
  }

  private computeRoleHierarchy(role: string, visited: Set<string> = new Set()) {
    const result = new Set<string>();
    if (visited.has(role)) {
      return result;
    }
    visited.add(role);
    const inheritedRoles = RoleHierarchy[role] || role;
    inheritedRoles.forEach((inheritedRole) => {
      result.add(inheritedRole);

      // create closer
      const inheritedHierarchy = this.computeRoleHierarchy(
        inheritedRole,
        visited
      );
      inheritedHierarchy.forEach((r) => result.add(r));
    });

    return result;
  }
}
