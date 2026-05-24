import { Suspense } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { PUBLIC_ROUTES } from './public-routes'
import { ADMIN_ROUTES } from './admin-routes';
import { AUTH_ROUTES } from './auth-routes';
import PageNotFound from '@/pages/public/404';
import AppLoading from '@/components/shared/loading/app-loading';

const MainRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Outlet />,
            children: PUBLIC_ROUTES
        },
        {
            path: '/auth',
            element: <Outlet />,
            children: AUTH_ROUTES
        },
        {
            path: '/admin',
            element: <Outlet />,
            children: ADMIN_ROUTES
        },
        {
            path: '*',
            element: <PageNotFound />
        },
    ]);
    return (
        <Suspense fallback={<AppLoading />}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default MainRouter;
