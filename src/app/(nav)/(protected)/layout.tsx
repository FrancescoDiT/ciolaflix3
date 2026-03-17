import React from 'react';
import ServerProtectedRoute from "@/components/auth/ServerProtectedRoute"

function Layout({children}: {children: React.ReactNode}) {
    return (
        <ServerProtectedRoute>
            {children}
        </ServerProtectedRoute>
    );
}

export default Layout;