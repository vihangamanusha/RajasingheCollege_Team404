export default function AdminLayout() {

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <div
                style={{
                    width: "220px",
                    backgroundColor: "#1e293b",
                    color: "white",
                    padding: "20px"
                }}
            >
                <h2>LMS Admin</h2>

                <hr />

                <p style={{ marginTop: "20px" }}>Dashboard</p>
                <p>Users</p>
                <p>Courses</p>
            </div>

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    padding: "30px",
                    backgroundColor: "#f1f5f9"
                }}
            >
                <h1>Dashboard</h1>

                <p>Frontend is working correctly ✅</p>
            </div>

        </div>
    );
}