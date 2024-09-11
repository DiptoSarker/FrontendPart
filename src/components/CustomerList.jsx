import { useState, useEffect } from "react";
import { fetchCustomers, deleteCustomer } from "../api"; // Implement these in your API file
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState(""); // Add search state
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await fetchCustomers(token);
        setCustomers(response.data);
      } catch (err) {
        console.error("Fetching customers error:", err);
      }
    };

    getCustomers();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id, token);
      setCustomers(customers.filter((customer) => customer._id !== id));
      toast.success("Deleted Successfully..!!");
    } catch (err) {
      console.error("Deleting customer error:", err);
    }
  };

  // Filter customers based on the search term
  const filteredCustomers = customers.filter((customer) =>
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Customers List
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Handle search input
            placeholder="Search by email"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <Link
            to="/add-customer"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Add Customer
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Customers List */}
        <ul className="space-y-4">
          {filteredCustomers.map((customer) => (
            <li
              key={customer._id}
              className="bg-white p-6 shadow-md rounded-lg"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold">
                  {customer.firstName} {customer.lastName}
                </h3>
                <p className="text-gray-600">
                  <strong>Prefix:</strong> {customer.prefix || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Suffix:</strong> {customer.suffix || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {customer.email}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {customer.phone || "N/A"}
                </p>
              </div>
              <div className="flex justify-between">
                <Link
                  to={`/edit-customer/${customer._id}`}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomersList;
