import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const keyword = query.get("search");

  // fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        keyword
          ? `/products/search/product?keyword=${keyword}`
          : "/products"
      );

      setProducts(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // add to cart
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/cart",
        {
          product: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added To Cart");
    } catch (error) {
      toast.error("Please Login");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  // loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold animate-pulse">
          Loading Products...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8 text-center">
        Shopzy 🛍️
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {products.length === 0 ? (

          <div className="col-span-3 text-center mt-10">

            <h1 className="text-3xl font-bold text-red-500">
              No Products Found 😢
            </h1>

          </div>

        ) : (

          products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
            >

              <div className="bg-white rounded-2xl shadow-lg p-5 hover:scale-105 hover:shadow-2xl transition duration-300">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-contain rounded-xl bg-white p-2 hover:scale-105 transition duration-300"
                />

                <h2 className="text-2xl font-semibold mt-4">
                  {product.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {product.description}
                </p>

                <h3 className="text-xl font-bold mt-3">
                  ₹ {product.price}
                </h3>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product._id);
                  }}
                  className="mt-4 bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 hover:scale-105 transition duration-300"
                >
                  Add To Cart
                </button>

              </div>

            </Link>
          ))

        )}

      </div>

    </div>
  );
}

export default HomePage;