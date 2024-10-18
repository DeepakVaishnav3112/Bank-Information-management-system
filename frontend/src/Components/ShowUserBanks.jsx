import React from 'react';
import './Styles/ShowUserBanks.css';
import Title from './Title';
import EditAccount from './EditAccount';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShowUserBankAccount = ({ bankAccounts, loading, error, setBankAccounts }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editAccountId, setEditAccountId] = useState(null);

  const maskAccountNumber = (accountNumber) => {
    if (accountNumber.length < 4) return accountNumber; // Handle cases where accountNumber is less than 4
    const firstTwo = accountNumber.slice(0, 2);
    const lastTwo = accountNumber.slice(-2);
    const middle = '*'.repeat(accountNumber.length - 4);
    return `${firstTwo}${middle}${lastTwo}`;
  };

  const maskIFSCCode = (ifscCode) => {
    if (ifscCode.length < 4) return ifscCode; // Handle cases where ifscCode is less than 4
    const firstTwo = ifscCode.slice(0, 2);
    const lastTwo = ifscCode.slice(-2);
    const middle = '*'.repeat(ifscCode.length - 4);
    return `${firstTwo}${middle}${lastTwo}`;
  };

  // Remove Account Function
  const removeAccount = async (accountId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/bank/${accountId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      );

      // If successful, filter out the deleted account from the state
      if (response.status === 200) {
        setBankAccounts((prevAccounts) => prevAccounts.filter((account) => account._id !== accountId));
        toast.success('Account removed successfully', {
          position: "bottom-right"
        });
      }
    } catch (error) {
      setError('Failed to remove account');
      toast.error('Failed to remove account', {
        position: "bottom-right"
      });
    }
  };

  const updateBankAccount = (updatedAccount) => {
    setBankAccounts((prevAccounts) =>
      prevAccounts.map((account) => (account._id === updatedAccount._id ? updatedAccount : account))
    );
  };

  const modalRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsEdit(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="component-container show-user-banks relative">
        <Title title={'Your Bank Accounts'} />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div>
            {bankAccounts.length === 0 ? (
              <p>No bank accounts found.</p>
            ) : (
              <ul className="banks-list-container">
                {bankAccounts.map((account) => (
                  <li key={account._id} className="bank-account-item">
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

                    <div className="flex account-card-row account-actions">
                      <span
                        onClick={() => {
                          setEditAccountId(account._id);
                          setIsEdit(true);
                        }}
                        className="material-symbols-outlined"
                        style={{ color: 'blue', cursor: 'pointer' }}
                      >
                        edit
                      </span>
                      <span
                        onClick={() => removeAccount(account._id)}
                        className="material-symbols-outlined"
                        style={{ color: 'red', cursor: 'pointer' }}
                      >
                        delete
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {isEdit && (
        <div ref={modalRef}>
          <EditAccount
            editAccountId={editAccountId}
            setIsEdit={setIsEdit}
            onUpdate={updateBankAccount} // Pass the update callback
          />
        </div>
      )}
    </>
  );
};

export default ShowUserBankAccount;
