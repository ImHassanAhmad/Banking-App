import type { FC } from 'react';

export interface IRouteConfig {
  path: string;
  params?: string;
  element: FC;
}

export interface IProtectedRouterProps {
  redirectPath?: string;
}
