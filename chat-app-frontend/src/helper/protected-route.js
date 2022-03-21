import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const authLogin = JSON.parse(localStorage.getItem('user'))
    return authLogin ? <Outlet /> : <Navigate to="/login" />
}