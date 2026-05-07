import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../../components/student/StudentSidebar';

const StudentLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar />
      <main style={{ flex: 1, marginLeft: '260px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        <header style={{ padding: '1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888', fontStyle: 'italic' }}>Rajasinghe Central College</span>
          <div style={{ fontWeight: 'bold' }}>John Doe (Student)</div>
        </header>
        <div style={{ padding: '2rem' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;