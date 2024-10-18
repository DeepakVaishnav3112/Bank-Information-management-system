import React, { useState } from "react";
import axios from "axios";
import Title from "./Title";
import { toast } from "react-toastify";

const EditAccount = ({ editAccountId, setIsEdit, onUpdate }) => {
  const [formData, setFormData] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const newFormData = {};
      for (const key in formData) {
        if (formData[key]) {
          newFormData[key] = formData[key];
        }
      }

      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage(
          "You are not logged in. Please log in to add a bank account."
        );
        setLoading(false);
        toast.error(errorMessage, {
          position: "bottom-right",
        });
        return;
      }

      // Send the request with the token in the headers
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/bank/${editAccountId}`,
        newFormData, // Send only filled fields
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setSuccessMessage("Bank account updated successfully!");
        toast.success("Bank account updated successfully!", {
          position: "bottom-right",
        });
        // Notify parent of the updated account
        onUpdate(response.data); // Pass the updated account to the parent
      } else {
        setErrorMessage("Failed to update bank account.");
        toast.error("Failed to update bank account.", {
          position: "bottom-right",
        });
      }

      setFormData({
        ifscCode: "",
        branchName: "",
        bankName: "",
        accountNumber: "",
        accountHolderName: "",
      });

      setIsEdit(false);

    } catch (error) {
      setErrorMessage("An error occurred while updating the bank account.");
      console.error("Error:", error);
      toast.error(errorMessage, {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container component-container edit-account">
      <Title title="Edit Bank Account" />

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          placeholder="IFSC Code"
        />
        <input
          type="text"
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          placeholder="Branch Name"
        />
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
        />
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
        />
        <input
          type="text"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}
          placeholder="Account Holder Name"
        />

        <button className="btn-1" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Bank"}
        </button>
      </form>
    </div>
  );
};

export default EditAccount;
