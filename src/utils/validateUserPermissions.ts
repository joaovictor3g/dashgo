type User = {
  permissions: string[];
  roles: string[];
};

type ValidatePermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
};

export function validateUserPermissions({
  user,
  permissions,
  roles,
}: ValidatePermissionsParams) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.some((permission) =>
      user.permissions.includes(permission)
    );

    if (!hasAllPermissions) return false;
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.every((role) => user.roles.includes(role));

    if (!hasAllRoles) return false;
  }

  return true;
}
