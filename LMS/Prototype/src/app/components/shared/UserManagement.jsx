import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useState } from "react";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole] = useState(
    new URLSearchParams(window.location.search).get("from") === "admin"
      ? "admin"
      : "technical-officer",
  );

  const allUsers = [
    {
      id: 1,
      name: "Kamal Perera",
      role: "Student",
      grade: "Grade 10A",
      email: "kamal@school.lk",
    },
    {
      id: 2,
      name: "Nimal Silva",
      role: "Teacher",
      grade: "Mathematics Dept.",
      email: "nimal@school.lk",
    },
    {
      id: 3,
      name: "Saman Kumara",
      role: "Student",
      grade: "Grade 11B",
      email: "saman@school.lk",
    },
    {
      id: 4,
      name: "Amara Dias",
      role: "Teacher",
      grade: "Science Dept.",
      email: "amara@school.lk",
    },
    {
      id: 5,
      name: "Ravi Fernando",
      role: "Student",
      grade: "Grade 9C",
      email: "ravi@school.lk",
    },
    {
      id: 6,
      name: "Sunil Bandara",
      role: "Technical Officer",
      grade: "IT Department",
      email: "sunil@school.lk",
    },
  ];

  const users = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddUser = () => {
    alert(
      "Add User form will open here. This feature allows you to add new students, teachers, or staff members.",
    );
  };

  const handleEditUser = (user) => {
    alert(
      `Edit user: ${user.name}\nRole: ${user.role}\nGrade/Dept: ${user.grade}`,
    );
  };

  const handleDeleteUser = (user) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      alert(`User ${user.name} has been deleted successfully.`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role={userRole} />
      <div className="flex-1">
        <TopNavbar
          userName={userRole === "admin" ? "Admin User" : "Technical Officer"}
          role={userRole === "admin" ? "Administrator" : "Technical Officer"}
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-800">User Management</h2>
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add New User
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md mb-6 p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by name, role, or grade..."
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">
                    Grade/Department
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.role === "Student"
                            ? "bg-blue-100 text-blue-700"
                            : user.role === "Teacher"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.grade}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-[#1e40af] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
