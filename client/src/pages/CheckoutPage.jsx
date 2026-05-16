import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function CheckoutPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // get cart items
      const { data: cartItems } = await API.get(
        "/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // create order items
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      // total price
      const totalPrice = cartItems.reduce(
        (total, item) =>
          total +
          item.product.price * item.quantity,
        0
      );

      // place order
      const { data } = await API.post(
        "/orders",
        {
          orderItems,
          totalPrice,
          shippingAddress,
          paymentMethod,
          name,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      navigate("/orders");

    } catch (error) {
      console.log(error);

      toast.error("Order Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Checkout 🛍️
        </h1>

        <form
          onSubmit={placeOrderHandler}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Enter Full Name"
            className="border p-4 rounded-xl outline-none"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Enter Phone Number"
            className="border p-4 rounded-xl outline-none"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Enter Shipping Address"
            className="border p-4 rounded-xl outline-none h-32"
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
            required
          />

          <select
            className="border p-4 rounded-xl outline-none"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          >

            <option value="COD">
              Cash On Delivery
            </option>

            <option value="ONLINE">
              Online Payment
            </option>

            <option value="UPI">
              UPI Payment
            </option>

          </select>

          <button className="bg-black text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition duration-300">

            Place Order

          </button>

        </form>

      </div>

    </div>
  );
}

export default CheckoutPage;