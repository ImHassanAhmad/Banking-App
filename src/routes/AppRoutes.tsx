import AppLayout from '@app/layout/AppLayout';
import { Suspense, type FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { privateRoutes, publicRoutes } from './RoutesPath';
import type { IRouteConfig } from './types';
import Loader from '@app/components/Loader';
const renderRoutes: FC<IRouteConfig[]> = (routes: IRouteConfig[]) => {
  return routes.map(({ path, element: Element, params }: IRouteConfig) => (
    <Route
      key={path}
      path={`${path}${params ?? ''}`}
      element={
        <Suspense fallback={<Loader />}>
          <Element />
        </Suspense>
      }
    />
  ));
};

const AppRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {renderRoutes(publicRoutes)}
        </Route>
        <Route element={<ProtectedRoute />}>{renderRoutes(privateRoutes)}</Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
