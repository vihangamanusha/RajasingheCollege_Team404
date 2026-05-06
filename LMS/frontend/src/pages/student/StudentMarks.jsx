import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getMarks } from "../../api/studentApi";
import Card from "../../components/ui/Card";

function StudentMarks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    getMarks("STD001")
      .then(res => setMarks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h1>Marks</h1>

      <Card>
        <table style={table}>
          <thead>
            <tr>
              <th>Term</th>
              <th>Marks</th>
            </tr>
          </thead>

          <tbody>
            {marks.map(m => (
              <tr key={m.markId}>
                <td>{m.term}</td>
                <td>{m.assignmentMark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Layout>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

export default StudentMarks;