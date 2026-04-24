import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useState } from "react";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  // FIXED ROLE
  const [userRole] = useState("admin");

  const allUsers = [
    { id: 1, name: "Kamal Perera", role: "Student", grade: "Grade 10A", email: "kamal@school.lk" },
    { id: 2, name: "Nimal Silva", role: "Teacher", grade: "Mathematics Dept.", email: "nimal@school.lk" },
    { id: 3, name: "Saman Kumara", role: "Student", grade: "Grade 11B", email: "saman@school.lk" },
    { id: 4, name: "Amara Dias", role: "Teacher", grade: "Science Dept.", email: "amara@school.lk" },
    { id: 5, name: "Ravi Fernando", role: "Student", grade: "Grade 9C", email: "ravi@school.lk" },
    { id: 6, name: "Sunil Bandara", role: "Technical Officer", grade: "IT Department", email: "sunil@school.lk" },
  ];

  const users = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    alert("Add User form will open here.");
  };

  const handleEditUser = (user) => {
    alert(`Edit user: ${user.name}`);
  };

  const handleDeleteUser = (user) => {
    if (confirm(`Delete ${user.name}?`)) {
      alert("Deleted successfully.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role={userRole} />

      <div className="flex-1">
        <TopNavbar
          userName="Admin User"
          role="Administrator"
        />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-800">User Management</h2>

            <button className="flex items-center gap-2 px-4 py-2 bg-[#1e40af] text-white rounded-lg">
              <Plus className="w-5 h-5" />
              Add New User
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md mb-6 p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Grade</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.grade}</td>
                    <td className="px-6 py-4">{user.email}</td>

                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEditUser(user)}>
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>

                      <button onClick={() => handleDeleteUser(user)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
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