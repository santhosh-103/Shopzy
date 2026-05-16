import { useEffect, useState } from "react";
import API from "../services/api";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8 text-center">
        My Orders 📦
      </h1>

      <div className="flex flex-col gap-6">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-5 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold">
              Order ID:
            </h2>

            <p className="text-gray-600 break-all">
              {order._id}
            </p>

            <h3 className="text-xl font-semibold mt-4">
              Total Price: ₹ {order.totalPrice}
            </h3>

            <p className="mt-2">
              Payment: {order.paymentMethod}
            </p>

            <p className="mt-2">
              Address: {order.shippingAddress}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default OrdersPage;