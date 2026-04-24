import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Common "types/common";
import UserTypes "types/users";
import TxTypes "types/transactions";
import SettingsTypes "types/settings";
import GameTypes "types/games";
import SettingsLib "lib/settings";
import UsersMixin "mixins/users-api";
import TransactionsMixin "mixins/transactions-api";
import SettingsMixin "mixins/settings-api";
import DashboardMixin "mixins/dashboard-api";
import GamesMixin "mixins/games-api";

actor {
  // ── Authorization ────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Object Storage ───────────────────────────────────────────────────────
  include MixinObjectStorage();

  // ── State ────────────────────────────────────────────────────────────────
  let users = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let transactions = Map.empty<Common.TransactionId, TxTypes.Transaction>();
  let nextTxId = { var id : Nat = 0 };
  let adminSettings = SettingsLib.defaultSettings();
  let bets = Map.empty<GameTypes.BetId, GameTypes.BetRecord>();
  let betCounter = { var id : Nat = 0 };

  // ── Mixins ───────────────────────────────────────────────────────────────
  include UsersMixin(accessControlState, users);
  include TransactionsMixin(accessControlState, users, transactions, nextTxId, adminSettings);
  include SettingsMixin(accessControlState, adminSettings);
  include DashboardMixin(accessControlState, users, transactions);
  include GamesMixin(accessControlState, users, bets, betCounter);

  // ── Admin initialization ─────────────────────────────────────────────────
  /// Promote the caller to admin. Only works if no admin exists yet (first call).
  public shared ({ caller }) func initializeAdmin() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous caller cannot be admin");
    };
    AccessControl.assignRole(accessControlState, caller, caller, #admin);
  };
};
