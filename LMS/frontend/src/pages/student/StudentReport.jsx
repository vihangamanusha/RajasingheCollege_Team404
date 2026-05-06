import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getReport } from "../../api/studentApi";
import Card from "../../components/ui/Card";

function StudentReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReport("STD001")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h1>Report</h1>

      <div style={grid}>
        {reports.map(r => (
          <Card key={r.reportId}>
            <h3>{r.term}</h3>
            <p>Total: {r.totalMarks}</p>
            <p>Average: {r.average}</p>
            <p>Rank: {r.rankPosition}</p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

export default StudentReport;