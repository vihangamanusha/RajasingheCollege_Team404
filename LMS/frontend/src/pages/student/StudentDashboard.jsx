import Layout from "../../components/layout/Layout";
import Card from "../../components/ui/Card";

function StudentDashboard() {
  return (
    <Layout>
      <h1>Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px"
      }}>
        <Card>Marks Overview</Card>
        <Card>Reports</Card>
        <Card>Study Materials</Card>
      </div>
    </Layout>
  );
}

export default StudentDashboard;