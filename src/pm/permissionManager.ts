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

  // getMaxRole() {
  // 	return this.context.roles.reduce((maxRole, currentRole) => {
  // 		return this.cachedRoleHierarchy.get(maxRole)?.has(currentRole)
  // 			? maxRole
  // 			: currentRole;
  // 	}, this.context.roles[0]);






