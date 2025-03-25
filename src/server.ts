import { PermissionManager } from "./pm/permissionManager";

console.log("Hello world");

// contact
const user = {
  id: 124,
  name: "Mohammad Mamun",
  roles: ["admin"],
  permissions: ["product:read"],
};
const pm = new PermissionManager({
  roles: user.roles,
  permissions: user.permissions,
});

console.log(pm.hasPermission("product:review"));
console.log(pm.hesPermissions(["product:read", "product:delete"]));
console.log(pm.hasAnyPermission(["product:read", "product:write"]));
console.log("Max role is", pm.getMaxRole());
console.log(pm.hasRole("super_admin"));
