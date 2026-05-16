import { useState } from "react";
import API from "../services/api";

function CheckoutPage() {
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[500px]">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Checkout
        </h1>

        <form
          onSubmit={placeOrderHandler}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Enter Shipping Address"
            className="border p-3 rounded-xl outline-none"
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
          />

          <select
            className="border p-3 rounded-xl outline-none"
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

          </select>

          <button className="bg-black text-white py-3 rounded-xl hover:bg-gray-800">
            Place Order
          </button>

        </form>

      </div>

    </div>
  );
}

export default CheckoutPage;