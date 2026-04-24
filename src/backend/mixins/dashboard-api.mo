import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import TxTypes "../types/transactions";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Common.UserId, UserTypes.UserProfile>,
  transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
) {
  /// Get dashboard statistics (admin only)
  public query ({ caller }) func getDashboardStats() : async TxTypes.DashboardStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    let totalUsers = users.size();

    var totalPendingDeposits : Nat = 0;
    var totalPendingWithdrawals : Nat = 0;
    var totalApprovedDepositAmount : Nat = 0;
    var totalApprovedWithdrawalAmount : Nat = 0;

    for ((_, tx) in transactions.entries()) {
      switch (tx.transactionType, tx.status) {
        case (#deposit, #pending) { totalPendingDeposits += 1 };
        case (#withdraw, #pending) { totalPendingWithdrawals += 1 };
        case (#deposit, #approved) { totalApprovedDepositAmount += tx.amount };
        case (#withdraw, #approved) { totalApprovedWithdrawalAmount += tx.amount };
        case _ {};
      };
    };

    {
      totalUsers = totalUsers;
      totalPendingDeposits = totalPendingDeposits;
      totalPendingWithdrawals = totalPendingWithdrawals;
      totalApprovedDepositAmount = totalApprovedDepositAmount;
      totalApprovedWithdrawalAmount = totalApprovedWithdrawalAmount;
    };
  };
};
