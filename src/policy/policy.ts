export interface PolicyContext extends Record<string, unknown> {
  userId?: string | number;
  authUserId?: string | number;
  roles?: string[];
  permissions?: string[];
  featureFlags?: string[];
}

export interface PolicyResult {
  name: string;
  allowed: boolean;
  reason?: string;
}
