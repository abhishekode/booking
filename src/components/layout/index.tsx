import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from 'Routes';
import Header from './Header';
import Footer from './Footer';

type RouteObject = {
  path: string;
  element: React.ReactNode;
  id: string;
};

const Layout = () => {

  const renderRoutes = (routes: RouteObject[]) => {
    return routes.map((r: RouteObject) => (
      <Route path={r.path} element={r.element} key={r.id} />
    ));
  };
  return (
    <div >
      <Header />
      <div className="min-h-screen container mx-auto mt-4">
        <Routes>
          <Route>{renderRoutes(publicRoutes)}</Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default Layout;
