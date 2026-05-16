import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");

    setToken(null);

    navigate("/login");
  };

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/?search=${keyword}`);
    }
  };

  return (
    <nav className="bg-black text-white px-8 py-4 shadow-lg relative">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-yellow-400">
          Shopzy 🛍️
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={searchHandler}
          className="hidden md:flex items-center gap-2 bg-white px-2 py-2 rounded-2xl"
        >

          <input
            type="text"
            placeholder="Search products..."
            className="w-64 px-3 py-2 rounded-xl text-black outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition">
            Search
          </button>

        </form>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        {/* Nav Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-6 text-lg items-center absolute md:static top-20 left-0 bg-black w-full md:w-auto p-5 md:p-0`}
        >

          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="hover:text-yellow-400 transition"
          >
            Cart
          </Link>

          <Link
            to="/orders"
            className="hover:text-yellow-400 transition"
          >
            Orders
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-yellow-400 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logoutHandler}
              className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;