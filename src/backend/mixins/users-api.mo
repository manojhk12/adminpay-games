import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Common.UserId, UserTypes.UserProfile>,
) {
  /// Register or return the calling user's profile (auto-upsert)
  public shared ({ caller }) func registerUser() : async UserTypes.UserProfilePublic {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous caller cannot register");
    };
    UserLib.registerUser(users, caller);
  };

  /// Get the calling user's profile
  public query ({ caller }) func getMyProfile() : async ?UserTypes.UserProfilePublic {
    UserLib.getProfile(users, caller);
  };

  /// Get the calling user's wallet balance
  public query ({ caller }) func getMyWalletBalance() : async Nat {
    switch (UserLib.getProfile(users, caller)) {
      case (?p) { p.walletBalance };
      case null { 0 };
    };
  };

  // ── Admin: user management ──────────────────────────────────────────────

  /// Get all users (admin only)
  public query ({ caller }) func getAllUsers() : async [UserTypes.UserProfilePublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    UserLib.getAllUsers(users);
  };

  /// Get a specific user by principal (admin only)
  public query ({ caller }) func getUser(userId : Common.UserId) : async ?UserTypes.UserProfilePublic {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    UserLib.getProfile(users, userId);
  };

  /// Block a user (admin only)
  public shared ({ caller }) func blockUser(userId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    UserLib.blockUser(users, userId);
  };

  /// Unblock a user (admin only)
  public shared ({ caller }) func unblockUser(userId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    UserLib.unblockUser(users, userId);
  };
};
