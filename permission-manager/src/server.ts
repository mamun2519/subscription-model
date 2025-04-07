import { PermissionManager } from "./pm/permissionManager";
import { FreeTrialPolicy } from "./policy/policies/FreeTrialPolicy.ts";
import { RegistrationPolicy } from "./policy/policies/RegitrationPolicy";
import { PolicyBuilder } from "./policy/policy";

console.log("Hello world");

// contact
const user = {
  id: 124,
  name: "Mohammad Mamun",
  roles: ["user"],
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

const accessFreeTrial = async (
  userid: number,
  email: string,
  password: string
) => {
  const policyGroup = PolicyBuilder.create("FreeTrialPolicyGroup")
    .addPolicy(new RegistrationPolicy())
    .addPolicy(new FreeTrialPolicy())
    .build();

  const { allowed, reason, name } = await policyGroup.can({
    userId: userid,
    email,
  });
  if (!allowed) {
    console.error(
      `[${name}] User ${userid} cannot access free trial: ${reason}`
    );
    return;
  }
  // do the main operation

  console.log(`[${name}] User ${userid} can access free trial`);
  return {
    success: true,
    message: `trial access granted for user ${userid}`,
  };
};

accessFreeTrial(10, "test@spam.com", "password");
