import SettingsTypes "../types/settings";

module {
  public func getSettings(settings : SettingsTypes.AdminSettings) : SettingsTypes.AdminSettingsPublic {
    {
      upiId = settings.upiId;
      qrCode = settings.qrCode;
      minDepositAmount = settings.minDepositAmount;
      minWithdrawAmount = settings.minWithdrawAmount;
    };
  };

  public func updateSettings(
    settings : SettingsTypes.AdminSettings,
    args : SettingsTypes.UpdateAdminSettingsArgs,
  ) : () {
    settings.upiId := args.upiId;
    settings.qrCode := args.qrCode;
    settings.minDepositAmount := args.minDepositAmount;
    settings.minWithdrawAmount := args.minWithdrawAmount;
  };

  public func defaultSettings() : SettingsTypes.AdminSettings {
    {
      var upiId = "admin@upi";
      var qrCode = null;
      var minDepositAmount = 100;
      var minWithdrawAmount = 100;
    };
  };
};
