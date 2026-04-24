import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import TxTypes "../types/transactions";
import SettingsTypes "../types/settings";
import TxLib "../lib/transactions";
import UserLib "../lib/users";
import SettingsLib "../lib/settings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Common.UserId, UserTypes.UserProfile>,
  transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
  nextTxId : { var id : Nat },
  adminSettings : SettingsTypes.AdminSettings,
) {
  /// Request a deposit (user must provide payment proof blob)
  public shared ({ caller }) func requestDeposit(
    amount : Nat,
    paymentProof : Storage.ExternalBlob,
  ) : async Common.Result<Common.TransactionId, Text> {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to request a deposit");
    };
    let settings = SettingsLib.getSettings(adminSettings);
    if (amount < settings.minDepositAmount) {
      return #err("Amount is below minimum deposit: " # settings.minDepositAmount.toText());
    };
    // Check for active pending deposit
    let pending = TxLib.getPendingByType(transactions, #deposit);
    let hasPending = pending.filter(func(tx : TxTypes.TransactionPublic) : Bool {
      Principal.equal(tx.userId, caller)
    });
    if (hasPending.size() > 0) {
      return #err("You already have a pending deposit request");
    };
    // Auto-register caller if needed
    ignore UserLib.registerUser(users, caller);
    let txId = TxLib.createDeposit(transactions, nextTxId, caller, amount, paymentProof);
    #ok(txId);
  };

  /// Request a withdrawal
  public shared ({ caller }) func requestWithdrawal(
    amount : Nat,
    upiId : Text,
    bankDetails : ?Text,
  ) : async Common.Result<Common.TransactionId, Text> {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to request a withdrawal");
    };
    let settings = SettingsLib.getSettings(adminSettings);
    if (amount < settings.minWithdrawAmount) {
      return #err("Amount is below minimum withdrawal: " # settings.minWithdrawAmount.toText());
    };
    // Check wallet balance
    switch (UserLib.getProfile(users, caller)) {
      case null { return #err("User profile not found") };
      case (?profile) {
        if (profile.walletBalance < amount) {
          return #err("Insufficient wallet balance");
        };
      };
    };
    // Debit wallet before creating withdrawal (reserve funds)
    switch (UserLib.debitWallet(users, caller, amount)) {
      case (#err(e)) { return #err(e) };
      case (#ok(_)) {};
    };
    let txId = TxLib.createWithdrawal(transactions, nextTxId, caller, amount, upiId, bankDetails);
    #ok(txId);
  };

  /// Get the calling user's transactions
  public query ({ caller }) func getMyTransactions() : async [TxTypes.TransactionPublic] {
    TxLib.getTransactionsByUser(transactions, caller);
  };

  // ── Admin: transaction management ───────────────────────────────────────

  /// Get all pending deposit requests (admin only)
  public query ({ caller }) func getPendingDeposits() : async [TxTypes.TransactionPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    TxLib.getPendingByType(transactions, #deposit);
  };

  /// Get all pending withdrawal requests (admin only)
  public query ({ caller }) func getPendingWithdrawals() : async [TxTypes.TransactionPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    TxLib.getPendingByType(transactions, #withdraw);
  };

  /// Get all transactions (admin only)
  public query ({ caller }) func getAllTransactions() : async [TxTypes.TransactionPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    TxLib.getAllTransactions(transactions);
  };

  /// Approve a deposit — credits wallet (admin only)
  public shared ({ caller }) func approveDeposit(
    txId : Common.TransactionId,
    note : ?Text,
  ) : async Common.Result<(), Text> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    switch (TxLib.approveTransaction(transactions, txId, note)) {
      case (#err(e)) { #err(e) };
      case (#ok(tx)) {
        UserLib.creditWallet(users, tx.userId, tx.amount);
        #ok(());
      };
    };
  };

  /// Reject a deposit (admin only)
  public shared ({ caller }) func rejectDeposit(
    txId : Common.TransactionId,
    note : Text,
  ) : async Common.Result<(), Text> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    switch (TxLib.rejectTransaction(transactions, txId, note)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) { #ok(()) };
    };
  };

  /// Approve a withdrawal — marks as paid (admin only)
  public shared ({ caller }) func approveWithdrawal(
    txId : Common.TransactionId,
    note : ?Text,
  ) : async Common.Result<(), Text> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    switch (TxLib.approveTransaction(transactions, txId, note)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) { #ok(()) };
    };
  };

  /// Reject a withdrawal — returns amount to wallet (admin only)
  public shared ({ caller }) func rejectWithdrawal(
    txId : Common.TransactionId,
    note : Text,
  ) : async Common.Result<(), Text> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    switch (TxLib.rejectTransaction(transactions, txId, note)) {
      case (#err(e)) { #err(e) };
      case (#ok(tx)) {
        // Return funds to wallet for rejected withdrawal
        UserLib.creditWallet(users, tx.userId, tx.amount);
        #ok(());
      };
    };
  };
};
