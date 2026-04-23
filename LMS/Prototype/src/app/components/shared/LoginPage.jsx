import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    if (password.length < 4) {
      alert("Invalid password");
      return;
    }

    if (username.toLowerCase().includes("admin")) {
      navigate("/admin");
    } else if (username.toLowerCase().includes("technical")) {
      navigate("/technical-officer");
    } else if (username.toLowerCase().includes("teacher")) {
      navigate("/teacher");
    } else if (username.toLowerCase().includes("student")) {
      navigate("/student");
    } else {
      alert(
        "Invalid username. Try: admin, technical, teacher, or student",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-[#1e40af] rounded-2xl flex items-center justify-center mb-4 shadow-lg overflow-hidden">
            {/* Replace 'school-logo.jpeg' with your actual logo filename */}
            <img
              src="/src/assets/school-logo.png"
              alt="School Logo"
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                // Fallback to icon if logo not found
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove(
                  "hidden",
                );
              }}
            />
            <GraduationCap className="w-12 h-12 text-[#fbbf24] hidden" />
          </div>
          <h1 className="text-2xl text-[#1e40af] mb-1">
            Rajasinghe LMS
          </h1>
          <p className="text-gray-600">
            Rajasinha Central College
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1e40af] text-white py-3 rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Forgot password? Contact administrator
        </p>
      </div>
    </div>
  );
}
