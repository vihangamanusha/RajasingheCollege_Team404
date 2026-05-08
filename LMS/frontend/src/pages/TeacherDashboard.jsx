import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard, BookOpen, Users,
    Upload, FileText, BarChart3, GraduationCap, Folder
} from "lucide-react";

function TeacherDashboard() {
    const navigate = useNavigate();
    const location = useLocation(); // Tracks the current URL path

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/dashboard" },
        { name: "My Subjects", icon: <BookOpen size={22} />, path: "/subjects" },
        { name: "My Classes", icon: <Users size={22} />, path: "/classes" },
        { name: "Upload Marks", icon: <Upload size={22} />, path: "/AddMarks" },
        { name: "Materials", icon: <FileText size={22} />, path: "/materials" },
        { name: "Reports", icon: <BarChart3 size={22} />, path: "/reports" },
    ];

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <nav style={styles.sidebar}>
                <div style={styles.logoSection}>
                    <div style={styles.logoPlaceholder}></div>
                    <h2 style={styles.schoolName}>Rajasinghe LMS</h2>
                    <p style={styles.subText}>Rajasinha Central College</p>
                </div>

                <ul style={styles.navList}>
                    {menuItems.map((item) => {
                        // Logic to determine if this link is currently active
                        const isActive = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/");

                        return (
                            <li
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                style={{
                                    ...styles.navItem,
                                    backgroundColor: isActive ? "#FFC107" : "transparent",
                                    color: isActive ? "#1A237E" : "white",
                                    // The "Pill" shape: rounded right corners, flat left
                                    borderRadius: isActive ? "0 40px 40px 0" : "0",
                                    width: isActive ? "90%" : "100%",
                                    fontWeight: isActive ? "600" : "400"
                                }}
                            >
                                <div style={styles.navContent}>
                                    {item.icon}
                                    <span style={{ marginLeft: "15px" }}>{item.name}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Main Content Area */}
            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <h3 style={{margin: 0, fontSize: '1rem'}}>Welcome, Nimal Silva</h3>
                </header>

                <div style={styles.contentBody}>
                    <h2 style={styles.dashboardTitle}>Teacher Dashboard</h2>

                    {/* TOP SECTION: Subjects, Classes, Actions */}
                    <div style={styles.topGrid}>

                        {/* My Subjects */}
                        <div style={styles.whiteCard}>
                            <div style={styles.cardHeader}><BookOpen size={18} color="#1E40AF"/> <b>My Subjects</b></div>
                            <div style={styles.listItemBlue}>
                                <div style={{fontWeight: 'bold'}}>Mathematics</div>
                                <div style={styles.subTextDark}>Grade 10 • 3 Classes</div>
                            </div>
                            <div style={styles.listItemBlue}>
                                <div style={{fontWeight: 'bold'}}>Mathematics</div>
                                <div style={styles.subTextDark}>Grade 11 • 2 Classes</div>
                            </div>
                        </div>

                        {/* My Classes */}
                        <div style={styles.whiteCard}>
                            <div style={styles.cardHeader}><GraduationCap size={18} color="#1E40AF"/> <b>My Classes</b></div>
                            <div style={styles.listItemYellow}>
                                <div style={{fontWeight: 'bold'}}>Grade 10A</div>
                                <div style={styles.subTextDark}>42 Students • English</div>
                            </div>
                            <div style={styles.listItemYellow}>
                                <div style={{fontWeight: 'bold'}}>Grade 10B</div>
                                <div style={styles.subTextDark}>38 Students • Sinhala</div>
                            </div>
                            <div style={styles.listItemYellow}>
                                <div style={{fontWeight: 'bold'}}>Grade 11A</div>
                                <div style={styles.subTextDark}>40 Students • English</div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div style={styles.whiteCard}>
                            <div style={styles.cardHeader}><b>Quick Actions</b></div>
                            <button onClick={() => navigate("/AddMarks")} style={styles.actionBtnBlue}>
                                <Upload size={18}/> Upload Marks
                            </button>
                            <button style={styles.actionBtnYellow}>
                                <Folder size={18}/> Upload Materials
                            </button>
                            <button style={styles.actionBtnGrey}>
                                <BarChart3 size={18}/> View Reports
                            </button>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Overview */}
                    <div style={{...styles.whiteCard, marginTop: '20px', width: '100%'}}>
                        <div style={styles.cardHeader}><b>Overview</b></div>
                        <div style={styles.overviewGrid}>
                            <div style={styles.statBoxBlue}>
                                <h1 style={{color: '#1E40AF', margin: 0, fontSize: '2.5rem'}}>5</h1>
                                <p style={styles.subTextDark}>Total Classes</p>
                            </div>
                            <div style={styles.statBoxYellow}>
                                <h1 style={{color: '#F59E0B', margin: 0, fontSize: '2.5rem'}}>120</h1>
                                <p style={styles.subTextDark}>Total Students</p>
                            </div>
                            <div style={styles.statBoxGreen}>
                                <h1 style={{color: '#10B981', margin: 0, fontSize: '2.5rem'}}>24</h1>
                                <p style={styles.subTextDark}>Materials Uploaded</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const styles = {
    container: { display: "flex", height: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#F8FAFC" },
    sidebar: { width: "280px", backgroundColor: "#1E40AF", color: "white", padding: "30px 0", display: "flex", flexDirection: "column" },
    logoSection: { padding: "0 25px", marginBottom: "40px" },
    schoolName: { fontSize: "1.3rem", margin: "5px 0 0 0", fontWeight: "600" },
    subText: { fontSize: "0.8rem", opacity: 0.8 },
    subTextDark: { fontSize: "0.8rem", color: "#64748B" },
    navList: { listStyle: "none", padding: 0, margin: 0 },
    navItem: {
        display: "flex",
        alignItems: "center",
        height: "56px",
        cursor: "pointer",
        transition: "0.3s ease",
        marginBottom: "8px"
    },
    navContent: { display: "flex", alignItems: "center", paddingLeft: "25px" },
    mainContent: { flex: 1, overflowY: "auto" },
    header: { backgroundColor: "white", padding: "18px 35px", borderBottom: "1px solid #E2E8F0", display: 'flex', justifyContent: 'flex-end' },
    contentBody: { padding: "35px" },
    dashboardTitle: { fontSize: "1.6rem", color: "#1E293B", marginBottom: "25px", fontWeight: "700" },

    topGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "25px" },
    whiteCard: { backgroundColor: "white", padding: "25px", borderRadius: "20px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#1E293B', fontSize: '1.1rem' },

    listItemBlue: { backgroundColor: "#EFF6FF", padding: "14px", borderRadius: "14px", marginBottom: "12px" },
    listItemYellow: { backgroundColor: "#FEFCE8", padding: "14px", borderRadius: "14px", marginBottom: "12px" },

    actionBtnBlue: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#1E40AF', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', marginBottom: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' },
    actionBtnYellow: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#FBBF24', color: '#1E40AF', border: 'none', padding: '14px', borderRadius: '12px', marginBottom: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' },
    actionBtnGrey: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', padding: '14px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' },

    overviewGrid: { display: "flex", gap: "25px" },
    statBoxBlue: { flex: 1, backgroundColor: '#EFF6FF', padding: '25px', borderRadius: '16px', textAlign: 'center' },
    statBoxYellow: { flex: 1, backgroundColor: '#FEFCE8', padding: '25px', borderRadius: '16px', textAlign: 'center' },
    statBoxGreen: { flex: 1, backgroundColor: '#F0FDF4', padding: '25px', borderRadius: '16px', textAlign: 'center' },
};

export default TeacherDashboard;