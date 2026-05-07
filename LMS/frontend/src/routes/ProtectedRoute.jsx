import { Navigate } from "react-router-dom";

// This component protects admin pages
export default function ProtectedRoute({ children }) {

    // check token in browser
    const token = localStorage.getItem("token");

    // if no token → go login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // if token exists → allow page
    return children;
}