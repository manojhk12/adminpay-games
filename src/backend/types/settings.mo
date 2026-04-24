import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type AdminSettings = {
    var upiId : Text;
    var qrCode : ?Storage.ExternalBlob;
    var minDepositAmount : Nat;
    var minWithdrawAmount : Nat;
  };

  public type AdminSettingsPublic = {
    upiId : Text;
    qrCode : ?Storage.ExternalBlob;
    minDepositAmount : Nat;
    minWithdrawAmount : Nat;
  };

  public type UpdateAdminSettingsArgs = {
    upiId : Text;
    qrCode : ?Storage.ExternalBlob;
    minDepositAmount : Nat;
    minWithdrawAmount : Nat;
  };
};
