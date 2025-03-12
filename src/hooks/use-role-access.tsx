import { useMemo } from 'react';
import { useRouter } from 'next/router';

const useRoleAccess = (session: any) => {
  const router = useRouter();
  const currentPath = router.pathname; // Get the current URL path

  // Extract module name from permissions
  const menuPermissions = useMemo(() => {
    if (!session) return new Set();

    return new Set(
      session.user?.role?.permissions?.map((row: any) =>
        row.split('.')[0].toUpperCase()
      ) || []
    );
  }, [session]);

  // Extract module name from URL (assuming URLs are like "/dashboard", "/users", etc.)
  const currentModule = useMemo(() => {
    const parts = currentPath.split('/').filter(Boolean); // Remove empty parts
    return parts.length > 0 ? parts[0].toUpperCase() : '';
  }, [currentPath]);

  // Check if the current page is allowed
  const hasAccess = menuPermissions.has(currentModule);

  return hasAccess;
};

export default useRoleAccess;
