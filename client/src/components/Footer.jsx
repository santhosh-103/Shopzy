import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white mt-10 py-8">

      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-yellow-400">
            Shopzy 🛍️
          </h1>

          <p className="mt-2 text-gray-400">
            Ecommerce Platform
          </p>

        </div>

        <div className="flex gap-6 mt-5 md:mt-0">

          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            Products
          </Link>

          <Link
            to="/contact"
            className="hover:text-yellow-400 transition"
          >
            Contact
          </Link>

        </div>

      </div>

      <div className="text-center text-gray-500 mt-6">

        © 2026 Shopzy. All rights reserved.

      </div>

    </footer>
  );
}

export default Footer;