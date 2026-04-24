import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Common "../types/common";
import UserTypes "../types/users";

module {
  public func registerUser(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Principal,
  ) : UserTypes.UserProfilePublic {
    switch (users.get(caller)) {
      case (?existing) { toPublic(existing) };
      case null {
        let profile : UserTypes.UserProfile = {
          id = caller;
          var walletBalance = 0;
          var status = #active;
          createdAt = Time.now();
        };
        users.add(caller, profile);
        toPublic(profile);
      };
    };
  };

  public func getProfile(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
  ) : ?UserTypes.UserProfilePublic {
    switch (users.get(userId)) {
      case (?profile) { ?toPublic(profile) };
      case null { null };
    };
  };

  public func getAllUsers(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
  ) : [UserTypes.UserProfilePublic] {
    let iter = users.values();
    let mapped = iter.map(toPublic);
    mapped.toArray();
  };

  public func blockUser(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
  ) : () {
    switch (users.get(userId)) {
      case (?profile) { profile.status := #blocked };
      case null { Runtime.trap("User not found") };
    };
  };

  public func unblockUser(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
  ) : () {
    switch (users.get(userId)) {
      case (?profile) { profile.status := #active };
      case null { Runtime.trap("User not found") };
    };
  };

  public func creditWallet(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
    amount : Nat,
  ) : () {
    switch (users.get(userId)) {
      case (?profile) { profile.walletBalance += amount };
      case null { Runtime.trap("User not found") };
    };
  };

  public func debitWallet(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
    amount : Nat,
  ) : Common.Result<(), Text> {
    switch (users.get(userId)) {
      case (?profile) {
        if (profile.walletBalance < amount) {
          #err("Insufficient wallet balance");
        } else {
          profile.walletBalance -= amount;
          #ok(());
        };
      };
      case null { #err("User not found") };
    };
  };

  public func toPublic(profile : UserTypes.UserProfile) : UserTypes.UserProfilePublic {
    {
      id = profile.id;
      walletBalance = profile.walletBalance;
      status = profile.status;
      createdAt = profile.createdAt;
    };
  };
};
