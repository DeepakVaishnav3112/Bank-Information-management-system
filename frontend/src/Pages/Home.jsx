import axios from "axios";
import React, { useEffect, useState } from "react";
import AddBankAccount from "../Components/AddBankAccount";
import ShowUserBankAccount from "../Components/ShowUserBanks";
import { toast } from "react-toastify";

const Home = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBankAccounts = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        setError("Token not found");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/bank`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      );
      if (response.status === 200) {
        setBankAccounts(response.data); // Set the bank accounts data
        setLoading(false);
      } else {
        setError("Failed to fetch bank accounts");
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to fetch bank accounts");
      setLoading(false);
    }
  };

  // Fetch bank accounts when the component mounts
  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const addBankAccount = (newAccount) => {
    setBankAccounts((prevAccounts) => [...prevAccounts, newAccount]);
  };

  const updateBankAccount = (updatedAccount) => {
    setBankAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account._id === updatedAccount._id ? updatedAccount : account
      )
    );
  };

  return (
    <div>
      <AddBankAccount onAdd={addBankAccount} />
      <ShowUserBankAccount
        bankAccounts={bankAccounts}
        setBankAccounts={setBankAccounts}
        loading={loading}
        error={error}
        onUpdate={updateBankAccount}
      />
    </div>
  );
};

export default Home;
