import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getDocuments } from "../../api/studentApi";
import Card from "../../components/ui/Card";

function StudentMaterials() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getDocuments()
      .then(res => setDocs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h1>Study Materials</h1>

      <div style={grid}>
        {docs.map(d => (
          <Card key={d.documentId}>
            <h3>{d.title}</h3>
            <a href={d.filePath} target="_blank">
              View File
            </a>
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

export default StudentMaterials;