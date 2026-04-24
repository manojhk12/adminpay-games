import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type UserStatus = { #active; #blocked };

  public type UserProfile = {
    id : Common.UserId;
    var walletBalance : Nat;
    var status : UserStatus;
    createdAt : Common.Timestamp;
  };

  public type UserProfilePublic = {
    id : Common.UserId;
    walletBalance : Nat;
    status : UserStatus;
    createdAt : Common.Timestamp;
  };
};
