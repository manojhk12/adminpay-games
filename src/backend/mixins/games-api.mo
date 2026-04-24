import Int "mo:core/Int";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import GameTypes "../types/games";
import GamesLib "../lib/games";
import UsersLib "../lib/users";

mixin (
  accessControl : AccessControl.AccessControlState,
  users : Map.Map<Common.UserId, UserTypes.UserProfile>,
  bets : Map.Map<GameTypes.BetId, GameTypes.BetRecord>,
  betCounter : { var id : Nat },
) {
  /// Place a bet on a game. Deducts bet amount from wallet instantly;
  /// credits payout immediately on win (no admin approval required).
  public shared ({ caller }) func placeBet(
    gameType : GameTypes.GameType,
    betAmount : Nat,
    playerChoice : GameTypes.GameResult,
  ) : async Common.Result<GameTypes.BetRecordPublic, Text> {
    // Check caller is registered and active
    switch (users.get(caller)) {
      case null { return #err("User not registered") };
      case (?profile) {
        if (profile.status == #blocked) {
          return #err("Account is blocked");
        };
        if (betAmount == 0) {
          return #err("Bet amount must be greater than zero");
        };
        if (profile.walletBalance < betAmount) {
          return #err("Insufficient wallet balance");
        };
      };
    };

    // Debit wallet upfront
    switch (UsersLib.debitWallet(users, caller, betAmount)) {
      case (#err(e)) { return #err(e) };
      case (#ok(())) {};
    };

    // Generate deterministic-enough seed from time + principal hash + counter
    let timeNow = Time.now();
    let seed : Nat = Int.abs(timeNow) + Nat.fromNat32(caller.hash()) + betCounter.id;

    // Resolve game outcome
    let (outcome, isWin) : (GameTypes.GameResult, Bool) = switch (gameType) {
      case (#coinFlip) { GamesLib.resolveCoinFlip(seed, playerChoice) };
      case (#diceRoll) {
        // Extract target from playerChoice; default to 1 if not a dice value
        let target = switch (playerChoice) {
          case (#dice(n)) n;
          case _ 1;
        };
        GamesLib.resolveDiceRoll(seed, target);
      };
      case (#roulette) { GamesLib.resolveRoulette(seed, playerChoice) };
    };

    // Calculate payout and credit wallet if win
    let payout = GamesLib.calculatePayout(gameType, betAmount, isWin);
    if (payout > 0) {
      UsersLib.creditWallet(users, caller, payout);
    };

    // Record the bet
    let bet = GamesLib.createBet(
      bets,
      betCounter,
      caller,
      gameType,
      betAmount,
      playerChoice,
      outcome,
      payout,
      isWin,
      timeNow,
    );

    #ok(GamesLib.toPublic(bet));
  };

  /// Return the caller's bet history sorted by timestamp descending.
  public shared query ({ caller }) func getMyBets() : async [GameTypes.BetRecordPublic] {
    let userBets = GamesLib.getUserBets(bets, caller);
    let sorted = userBets.sort(func(a, b) { Int.compare(b.timestamp, a.timestamp) });
    sorted.map<GameTypes.BetRecord, GameTypes.BetRecordPublic>(GamesLib.toPublic);
  };

  /// Return all bets — admin only.
  public shared ({ caller }) func adminGetAllBets() : async [GameTypes.BetRecordPublic] {
    if (not AccessControl.isAdmin(accessControl, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let allBets = GamesLib.getAllBets(bets);
    allBets.map<GameTypes.BetRecord, GameTypes.BetRecordPublic>(GamesLib.toPublic);
  };
};
