import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type TransactionType = { #deposit; #withdraw };

  public type TransactionStatus = { #pending; #approved; #rejected };

  public type WithdrawalDestination = {
    upiId : Text;
    bankDetails : ?Text;
  };

  public type Transaction = {
    id : Common.TransactionId;
    userId : Common.UserId;
    transactionType : TransactionType;
    amount : Nat;
    var paymentProof : ?Storage.ExternalBlob;
    var status : TransactionStatus;
    var adminNote : ?Text;
    withdrawalDestination : ?WithdrawalDestination;
    createdAt : Common.Timestamp;
  };

  public type DashboardStats = {
    totalUsers : Nat;
    totalPendingDeposits : Nat;
    totalPendingWithdrawals : Nat;
    totalApprovedDepositAmount : Nat;
    totalApprovedWithdrawalAmount : Nat;
  };

  public type TransactionPublic = {
    id : Common.TransactionId;
    userId : Common.UserId;
    transactionType : TransactionType;
    amount : Nat;
    paymentProof : ?Storage.ExternalBlob;
    status : TransactionStatus;
    adminNote : ?Text;
    withdrawalDestination : ?WithdrawalDestination;
    createdAt : Common.Timestamp;
  };
};
