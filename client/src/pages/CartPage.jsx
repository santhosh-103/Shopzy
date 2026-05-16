import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Item
  const removeFromCart = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Item Removed");

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Total Price
  const totalPrice = cartItems
    .filter((item) => item.product)
    .reduce(
      (acc, item) =>
        acc + item.product.price * item.quantity,
      0
    );

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        My Cart 🛒
      </h1>

      {cartItems.filter((item) => item.product).length === 0 ? (

        <h1 className="text-2xl text-center">
          Cart is Empty 😢
        </h1>

      ) : (

        <div className="grid gap-6">

          {cartItems
            .filter((item) => item.product)
            .map((item) => (

              <div
                key={item._id}
                className="bg-white p-5 rounded-2xl shadow-lg flex justify-between items-center"
              >

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.product?.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    ₹ {item.product?.price}
                  </p>

                  <p className="mt-2">
                    Quantity: {item.quantity}
                  </p>

                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                >
                  Remove
                </button>

              </div>

            ))}

          <div className="bg-black text-white p-5 rounded-2xl text-center text-2xl font-bold">

            Total: ₹ {totalPrice}

          </div>

        </div>

      )}

    </div>
  );
}

export default CartPage;