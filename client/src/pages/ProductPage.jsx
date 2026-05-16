import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // fetch single product
  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  // add to cart
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

      alert("Added To Cart");
    } catch (error) {
      alert("Please Login");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <h1 className="text-center mt-10 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-4xl flex gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-[400px] h-[400px] object-cover rounded-2xl"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            {product.description}
          </p>

          <h2 className="text-3xl font-bold mt-5">
            ₹ {product.price}
          </h2>

          <p className="mt-4 text-lg">
            Category: {product.category}
          </p>

          <p className="mt-2 text-lg">
            Stock: {product.stock}
          </p>

          <button
            onClick={addToCart}
            className="mt-8 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
          >
            Add To Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductPage;