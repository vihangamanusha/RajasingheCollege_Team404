// Define your routes here
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import TechnicalOfficerDashboard from './components/TechnicalOfficerDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminDashboard />,
  },
  {
    path: '/student',
    element: <StudentDashboard />,
  },
  {
    path: '/teacher',
    element: <TeacherDashboard />,
  },
  {
    path: '/to',
    element: <TechnicalOfficerDashboard />,
  },
]);