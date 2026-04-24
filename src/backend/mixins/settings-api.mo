import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SettingsTypes "../types/settings";
import SettingsLib "../lib/settings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  settings : SettingsTypes.AdminSettings,
) {
  /// Get admin payment settings (public — users need UPI/QR info to make deposits)
  public query func getAdminSettings() : async SettingsTypes.AdminSettingsPublic {
    SettingsLib.getSettings(settings);
  };

  /// Update admin payment settings (admin only)
  public shared ({ caller }) func updateAdminSettings(args : SettingsTypes.UpdateAdminSettingsArgs) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    SettingsLib.updateSettings(settings, args);
  };
};
