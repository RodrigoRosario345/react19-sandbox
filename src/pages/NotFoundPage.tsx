import FuzzyText from "@/components";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen text-white flex flex-col gap-4 justify-center items-center">
      <FuzzyText>404 - Page Not Found</FuzzyText>
      <p className="text-4xl sm:text-6xl pt-20">The page you are looking for does not exist.</p>
      <Link to="/" className="text-3xl flex items-center gap-2 scale-100 transition-all hover:scale-110"><FaArrowLeft /> Go to Home</Link>
    </div>
  );
}
