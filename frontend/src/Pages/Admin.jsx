import React, { useEffect, useRef, useState } from "react";
import Title from "../Components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import AccountInfo from "../Components/AccountInfo";

const Admin = () => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]); // State for filtered accounts
  const [showInfo, setShowInfo] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input

  const maskAccountNumber = (accountNumber) => {
    if (accountNumber.length < 4) return accountNumber;
    const firstTwo = accountNumber.slice(0, 2);
    const lastTwo = accountNumber.slice(-2);
    const middle = "*".repeat(accountNumber.length - 4);
    return `${firstTwo}${middle}${lastTwo}`;
  };

  const maskIFSCCode = (ifscCode) => {
    if (ifscCode.length < 4) return ifscCode;
    const firstTwo = ifscCode.slice(0, 2);
    const lastTwo = ifscCode.slice(-2);
    const middle = "*".repeat(ifscCode.length - 4);
    return `${firstTwo}${middle}${lastTwo}`;
  };

  useEffect(() => {
    const fetchAllBankAccounts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/banks`,
          {
            headers: {
              token: token,
            },
          }
        );

        if (response.status === 200) {
          setAllAccounts(response.data);
          setFilteredAccounts(response.data); // Initially set the filtered accounts to the full data
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bank accounts:", error.message);
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBankAccounts();
  }, []);

  // Filter accounts when search query changes
  useEffect(() => {
    const filtered = allAccounts.filter((account) => {
      return (
        account.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.accountHolderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.accountNumber.includes(searchQuery) ||
        account.ifscCode.includes(searchQuery)
      );
    });
    setFilteredAccounts(filtered);
  }, [searchQuery, allAccounts]);

  const infoRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="component-container show-user-banks relative">
        <Title title="Admin Page" />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by bank name, user name, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Set the search query
          className="search-input"
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div>
            {filteredAccounts.length === 0 ? (
              <p>No bank accounts found.</p>
            ) : (
              <ul className="banks-list-container">
                {filteredAccounts.map((account) => (
                  <li
                    onClick={() => {
                      setShowInfo(true);
                      setSelectedAccount(account);
                    }}
                    key={account._id}
                    className="bank-account-item"
                  >
                    <div className="flex account-card-row">
                      <p className="bankName">{account.bankName}</p>
                    </div>

                    <div className="flex account-card-row">
                      <p className="account-no">
                        A/C No. {maskAccountNumber(account.accountNumber)}
                      </p>
                      <p className="ifsc">
                        IFSC: {maskIFSCCode(account.ifscCode)}
                      </p>
                    </div>

                    <div className="flex account-card-row">
                      <p className="holder-name">{account.accountHolderName}</p>
                      <p className="branch-name">
                        Branch: {account.branchName}
                      </p>
                    </div>

                    <div className="flex account-card-row divider">
                      <p className="tag">Username : </p>
                      <p className="username">{account.user.username}</p>
                    </div>

                    <div className="flex account-card-row">
                      <p className="tag">User Email : </p>
                      <p className="user-email">{account.user.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {showInfo && (
        <div ref={infoRef}>
          <AccountInfo selectedAccount={selectedAccount} showInfo={showInfo} />
        </div>
      )}
    </>
  );
};

export default Admin;
