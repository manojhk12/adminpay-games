import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import Common "../types/common";
import TxTypes "../types/transactions";

module {
  public func createDeposit(
    transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
    nextId : { var id : Nat },
    userId : Common.UserId,
    amount : Nat,
    paymentProof : Storage.ExternalBlob,
  ) : Common.TransactionId {
    let txId = nextId.id;
    nextId.id += 1;
    let tx : TxTypes.Transaction = {
      id = txId;
      userId = userId;
      transactionType = #deposit;
      amount = amount;
      var paymentProof = ?paymentProof;
      var status = #pending;
      var adminNote = null;
      withdrawalDestination = null;
      createdAt = Time.now();
    };
    transactions.add(txId, tx);
    txId;
  };

  public func createWithdrawal(
    transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
    nextId : { var id : Nat },
    userId : Common.UserId,
    amount : Nat,
    upiId : Text,
    bankDetails : ?Text,
  ) : Common.TransactionId {
    let txId = nextId.id;
    nextId.id += 1;
    let tx : TxTypes.Transaction = {
      id = txId;
      userId = userId;
      transactionType = #withdraw;
      amount = amount;
      var paymentProof = null;
      var status = #pending;
      var adminNote = null;
      withdrawalDestination = ?{ upiId = upiId; bankDetails = bankDetails };
      createdAt = Time.now();
    };
    transactions.add(txId, tx);
    txId;
  };

  public func getTransaction(
    transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
    txId : Common.TransactionId,
  ) : ?TxTypes.TransactionPublic {
    switch (transactions.get(txId)) {
      case (?tx) { ?toPublic(tx) };
      case null { null };
    };
  };

  public func getTransactionsByUser(
    transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
    userId : Common.UserId,
  ) : [TxTypes.TransactionPublic] {
    let iter = transactions.values();
    let filtered = iter.filter(func(tx : TxTypes.Transaction) : Bool {
      Principal.equal(tx.userId, userId)
    });
    let mapped = filtered.map(toPublic);
    mapped.toArray();
  };

  public func getAllTransactions(
    transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
  ) : [TxTypes.TransactionPublic] {
    let iter = transactions.values();
    let mapped = iter.map(toPublic);
    mapped.toArray();
  };

  public func getPendingByType(
    transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
    txType : TxTypes.TransactionType,
  ) : [TxTypes.TransactionPublic] {
    let iter = transactions.values();
    let filtered = iter.filter(func(tx : TxTypes.Transaction) : Bool {
      tx.status == #pending and tx.transactionType == txType
    });
    let mapped = filtered.map(toPublic);
    mapped.toArray();
  };

  public func approveTransaction(
    transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
    txId : Common.TransactionId,
    note : ?Text,
  ) : Common.Result<TxTypes.TransactionPublic, Text> {
    switch (transactions.get(txId)) {
      case (?tx) {
        if (tx.status != #pending) {
          return #err("Transaction is not pending");
        };
        tx.status := #approved;
        tx.adminNote := note;
        #ok(toPublic(tx));
      };
      case null { #err("Transaction not found") };
    };
  };

  public func rejectTransaction(
    transactions : Map.Map<Common.TransactionId, TxTypes.Transaction>,
    txId : Common.TransactionId,
    note : Text,
  ) : Common.Result<TxTypes.TransactionPublic, Text> {
    switch (transactions.get(txId)) {
      case (?tx) {
        if (tx.status != #pending) {
          return #err("Transaction is not pending");
        };
        tx.status := #rejected;
        tx.adminNote := ?note;
        #ok(toPublic(tx));
      };
      case null { #err("Transaction not found") };
    };
  };

  public func toPublic(tx : TxTypes.Transaction) : TxTypes.TransactionPublic {
    {
      id = tx.id;
      userId = tx.userId;
      transactionType = tx.transactionType;
      amount = tx.amount;
      paymentProof = tx.paymentProof;
      status = tx.status;
      adminNote = tx.adminNote;
      withdrawalDestination = tx.withdrawalDestination;
      createdAt = tx.createdAt;
    };
  };
};
