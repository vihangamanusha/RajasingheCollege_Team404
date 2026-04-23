import { AlertCircle, Home } from "lucide-react";

export function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-6xl text-[#1e40af] mb-4">404</h1>
        <h2 className="text-2xl text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleGoHome}
          className="flex items-center gap-2 px-6 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md mx-auto"
        >
          <Home className="w-5 h-5" />
          Go to Login
        </button>
      </div>
    </div>
  );
}
