import { Policy, PolicyContext, PolicyResult } from "../policy";

export class RegistrationPolicy extends Policy {
  constructor() {
    super("RegistrationPolicy", "Check if the user can register");
  }

  async can(context: PolicyContext): Promise<PolicyResult> {

 

  
}
