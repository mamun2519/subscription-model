import { Policy, PolicyContext, PolicyResult } from "../policy";

export class FreeTrialPolicy extends Policy {
  constructor() {
    super("FreeTrialPolicy", "Check if the user can access the free trial");
  }
}
