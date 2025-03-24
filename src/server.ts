import { PermissionManager } from "./pm/permissionManager";

console.log("Hello world");

// contact
const user = {
  id: 124,
  name: "Mohammad Mamun",
  roles: ["premium_user"],
  permissions: ["product:read"],
};
const pm = new PermissionManager({
  roles: user.roles,
  permissions: user.permissions,
});

console.log(pm.hasPermission("product:review"));
