import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl text-[#002147] mb-4">404</h1>
          <div className="w-32 h-1 bg-[#FFD700] mx-auto mb-8"></div>
        </div>
        <h2 className="text-4xl text-[#002147] mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-700 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
          Please check the URL or navigate back to our homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#002147] text-white rounded-lg hover:bg-[#003366] transition-all duration-300 shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#002147] border-2 border-[#002147] rounded-lg hover:bg-[#002147] hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
