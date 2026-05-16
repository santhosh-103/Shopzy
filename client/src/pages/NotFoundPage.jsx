import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

      <h1 className="text-7xl font-bold text-red-500">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found 😢
      </h2>

      <Link
        to="/"
        className="mt-8 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
      >
        Go Home
      </Link>

    </div>
  );
}

export default NotFoundPage;