import React, { useState } from "react";
import axios from "axios";
import Title from "./Title";
import { toast } from "react-toastify";

const AddBankAccount = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } =
      formData;

    if (
      !ifscCode ||
      !branchName ||
      !bankName ||
      !accountNumber ||
      !accountHolderName
    ) {
      setErrorMessage("All fields are required.");
      toast.error(errorMessage, {
        position: "bottom-right"
      });
      return false;
    }

    if (accountNumber.length < 10 || accountNumber.length > 18) {
      setErrorMessage("Account number must be between 10 and 18 digits.");
      toast.error(errorMessage, {
        position: "bottom-right"
      });
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true); // Start loading

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage(
          "You are not logged in. Please log in to add a bank account."
        );
        setLoading(false);
        toast.error(errorMessage);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/bank/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setSuccessMessage("Bank account added successfully!");
        toast.success("Bank Account Added Successfully!", {
          position: "bottom-right"
        });

        // Notify parent of the new account
        onAdd(response.data); // Pass the new account to the parent

        // Reset form
        setFormData({
          ifscCode: "",
          branchName: "",
          bankName: "",
          accountNumber: "",
          accountHolderName: "",
        });
      } else {
        setErrorMessage("Failed to add bank account.");
        toast.error(errorMessage, {
          position: "bottom-right"
        });
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the bank account.");
      console.error("Error:", error);
      toast.error(errorMessage, {
        position: "bottom-right"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container component-container">
      <Title title="Add Bank Account" />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          placeholder="IFSC Code"
          required
        />
        <input
          type="text"
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          placeholder="Branch Name"
          required
        />
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
          required
        />
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
          required
        />
        <input
          type="text"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}
          placeholder="Account Holder Name"
          required
        />

        <button className="btn-1" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Bank"}
        </button>
      </form>
    </div>
  );
};

export default AddBankAccount;
