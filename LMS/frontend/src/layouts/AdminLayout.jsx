import { Outlet } from "react-router-dom";

export default function AdminLayout() {

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <div style={{
                width: "220px",
                backgroundColor: "#1e293b",
                color: "white",
                padding: "20px"
            }}>
                <h2>LMS Admin</h2>
                <hr />

                <p>Dashboard</p>
                <p>Users</p>
                <p>Courses</p>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: "30px",
                backgroundColor: "#f1f5f9"
            }}>
                <Outlet />
            </div>

        </div>
    );
}