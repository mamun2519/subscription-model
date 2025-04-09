import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { PermissionManager } from "../lib/pm/PermissionManager";
import { useMemo } from "react";

type Role = {
  id: string;
  key: string;
  name: string;
};

const flattenRoles = (roles: Role[]) => {
  return roles.map((role) => role.key);
};

export const usePermissionManager = () => {
  const auth = useKindeAuth();

  // console.log("Roles", auth.getClaim("roles"));
  // console.log("Permissions", auth.getClaim("permissions"));
  const pm = useMemo(() => {
    if (!auth.isAuthenticated) return null;

    const claimedRoles = (auth.getClaim("roles")?.value as Role[]) || [];
    const roles = flattenRoles(claimedRoles);

    console.log("roles", roles);
    const permissions = (auth.getClaim("permissions")?.value as string[]) || [];
    return new PermissionManager({
      roles,
      permissions,
    });
  }, [auth]);

  return pm;
};
