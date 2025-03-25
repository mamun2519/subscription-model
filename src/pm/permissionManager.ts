import { RoleBasedPermission, RoleHierarchy } from "./config";

interface PermissionContext {
  roles: string[];
  permissions: string[];
}

export class PermissionManager {
  private readonly cachedRoleHierarchy: Map<string, Set<string>> = new Map();
  private readonly cachedRolePermissions: Map<string, Set<string>> = new Map();

  constructor(private readonly context: PermissionContext) {
    // Flatten the role hierarchy and cache it
    Object.keys(RoleHierarchy).forEach((role) => {
      this.cachedRoleHierarchy.set(role, this.computeRoleHierarchy(role));
    });
    console.log(this.cachedRoleHierarchy);
    // Flatten the role permission and cache it
    Object.keys(RoleBasedPermission).forEach((role) => {
      this.cachedRolePermissions.set(role, this.computeRolePermissions(role));
    });

    console.log(this.cachedRolePermissions);
  }
  /* ----------------Public Method ------------------------- */
  // check single permission is have
  hasPermission(requiredPermission: string) {
    if (this.context.permissions.includes(requiredPermission)) {
      return true;
    }

    return this.hasPermissionThroughRole(
      this.context.roles,
      requiredPermission
    );
  }

  // check multiple permission is have
  hesPermissions(requiredPermissions: string[]) {
    return requiredPermissions.every((permission) => {
      return this.hasPermission(permission);
    });
  }

  // check the permission any
  hasAnyPermission(requiredPermissions: string[]) {
    return requiredPermissions.some((permission) =>
      this.hasPermission(permission)
    );
  }

  hasRole(requiredRole: string) {
    return this.context.roles.some((role) => {
      const hierarchySet = this.cachedRoleHierarchy.get(role);
      return hierarchySet?.has(requiredRole) || role === requiredRole;
    });
  }

  /*----------------- Private Method------------------------- */
  private computeRoleHierarchy(role: string, visited: Set<string> = new Set()) {
    const result = new Set<string>();

    if (visited.has(role)) {
      return result;
    }
    visited.add(role);
    const inheritedRoles = RoleHierarchy[role] || role;

    inheritedRoles.forEach((inheritedRole) => {
      result.add(inheritedRole);

      // create closer/recoursive
      const inheritedHierarchy = this.computeRoleHierarchy(
        inheritedRole,
        visited
      );

      inheritedHierarchy.forEach((r) => result.add(r));
    });

    return result;
  }

  private computeRolePermissions(
    role: string,
    visited: Set<string> = new Set()
  ) {
    const result = new Set<string>();

    if (visited.has(role)) {
      return result;
    }

    visited.add(role);

    RoleBasedPermission[role].forEach((permission) => result.add(permission));

    const hierarchySet = this.cachedRoleHierarchy.get(role);

    hierarchySet?.forEach((inheritedRole) => {
      RoleBasedPermission[inheritedRole]?.forEach((permission) => {
        result.add(permission);
      });
    });

    return result;
  }

  private hasPermissionThroughRole(role: string[], permission: string) {
    return role.some((role) =>
      this.cachedRolePermissions.get(role)?.has(permission)
    );
  }
}
