import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

    // check token in browser storage
    const token = localStorage.getItem("token");

    // if no token → redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // if token exists → allow access
    return children;
}