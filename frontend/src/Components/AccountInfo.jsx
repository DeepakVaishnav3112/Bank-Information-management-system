import React from "react";
import Title from "./Title";

const AccountInfo = ({ selectedAccount, showInfo }) => {
  return (
    <div className="component-container user-bank-info">
      <div className="info-container">
        <Title title="Account Info" />
        <div className="bank-info">
          <div className="info-row">
            <p className="tag">Bank: </p>
            <p className="info">{selectedAccount.bankName}</p>
          </div>

          <div className="info-row">
            <p className="tag">Account No.: </p>
            <p className="info">{selectedAccount.accountNumber}</p>
          </div>

          <div className="info-row">
            <p className="tag">IFSC Code: </p>
            <p className="info">{selectedAccount.ifscCode}</p>
          </div>

          <div className="info-row">
            <p className="tag">Account Holder Name:</p>
            <p className="info">{selectedAccount.accountHolderName}</p>
          </div>

          <div className="info-row">
            <p className="tag">Branch:</p>
            <p className="info">{selectedAccount.branchName}</p>
          </div>
        </div>

        <div className="user-info">
          <div className="info-row">
            <p className="tag">Username:</p>
            <p className="info">{selectedAccount.user.username}</p>
          </div>
          <div className="info-row">
            <p className="tag">User's Email:</p>
            <p className="info">{selectedAccount.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
