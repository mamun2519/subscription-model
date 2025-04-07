export enum Role {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  MANAGER = "manager",
  PREMIUM_USER = "premium_user",
  USER = "user",
}

// Define permissions as an enum
export enum Permission {
  // Product permissions
  PRODUCT_CREATE = "product:create",
  PRODUCT_READ = "product:read",
  PRODUCT_UPDATE = "product:update",
  PRODUCT_DELETE = "product:delete",
  PRODUCT_REVIEW = "product:review",

  // User permissions
  USER_CREATE = "user:create",
  USER_READ = "user:read",
  USER_UPDATE = "user:update",
  USER_DELETE = "user:delete",
}
