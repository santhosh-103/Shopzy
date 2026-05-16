import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // Fetch Product
  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add To Cart
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/cart",
        {
          product: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added To Cart 🛒");
    } catch (error) {
      toast.error("Please Login");
    }
  };

  // Buy Now
  const handleBuyNow = () => {
    toast.success("Order Placed Successfully 🎉");
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold animate-pulse">
          Loading Product...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">

      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-4xl w-full grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-contain rounded-2xl bg-white"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            {product.description}
          </p>

          <h2 className="text-3xl font-bold mt-6">
            ₹ {product.price}
          </h2>

          <p className="mt-4 text-lg">
            Stock: {product.stock}
          </p>

          <div className="flex gap-5 mt-8">

            <button
              onClick={addToCart}
              className="bg-black text-white px-6 py-3 rounded-2xl text-lg font-bold hover:bg-gray-800 transition duration-300"
            >
              Add To Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:bg-green-700 transition duration-300"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductPage;