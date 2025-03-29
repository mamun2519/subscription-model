import { Policy, PolicyContext, PolicyResult } from "../policy";

export class PurchasePolicy extends Policy {
  constructor() {
    super("PurchasePolicy", "Check if the user can purchase a product");
  }

  async can(context: PolicyContext): Promise<PolicyResult> {}
}
