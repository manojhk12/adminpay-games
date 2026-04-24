import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Common "../types/common";
import GameTypes "../types/games";

module {
  /// Resolve a coin flip: seed % 2 == 0 → heads, else tails.
  /// Returns (outcome, isWin) given a playerChoice.
  public func resolveCoinFlip(seed : Nat, playerChoice : GameTypes.GameResult) : (GameTypes.GameResult, Bool) {
    let outcome : GameTypes.GameResult = if (seed % 2 == 0) #heads else #tails;
    let isWin = switch (playerChoice, outcome) {
      case (#heads, #heads) true;
      case (#tails, #tails) true;
      case _ false;
    };
    (outcome, isWin);
  };

  /// Resolve a dice roll: seed % 6 + 1 gives 1-6.
  /// Player wins if outcome equals target (1-6).
  public func resolveDiceRoll(seed : Nat, target : Nat) : (GameTypes.GameResult, Bool) {
    let roll = seed % 6 + 1;
    let outcome : GameTypes.GameResult = #dice(roll);
    let isWin = roll == target;
    (outcome, isWin);
  };

  /// Resolve roulette: seed % 2 == 0 → red, else black.
  /// Caller checks isWin by comparing playerChoice with outcome.
  public func resolveRoulette(seed : Nat, playerChoice : GameTypes.GameResult) : (GameTypes.GameResult, Bool) {
    let outcome : GameTypes.GameResult = if (seed % 2 == 0) #red else #black;
    let isWin = switch (playerChoice, outcome) {
      case (#red, #red) true;
      case (#black, #black) true;
      case _ false;
    };
    (outcome, isWin);
  };

  /// Fixed house odds payout calculation.
  /// coinFlip win = betAmount*2, diceRoll win = betAmount*6, roulette win = betAmount*2, loss = 0.
  public func calculatePayout(gameType : GameTypes.GameType, betAmount : Nat, isWin : Bool) : Nat {
    if (not isWin) return 0;
    switch (gameType) {
      case (#coinFlip) betAmount * 2;
      case (#diceRoll) betAmount * 6;
      case (#roulette) betAmount * 2;
    };
  };

  /// Store a new bet record in the bets map.
  public func createBet(
    bets : Map.Map<GameTypes.BetId, GameTypes.BetRecord>,
    counter : { var id : Nat },
    userId : Common.UserId,
    gameType : GameTypes.GameType,
    betAmount : Nat,
    playerChoice : GameTypes.GameResult,
    outcome : GameTypes.GameResult,
    payout : Nat,
    isWin : Bool,
    timestamp : Common.Timestamp,
  ) : GameTypes.BetRecord {
    let id = counter.id;
    counter.id += 1;
    let bet : GameTypes.BetRecord = {
      id;
      userId;
      gameType;
      betAmount;
      playerChoice;
      outcome;
      payout;
      isWin;
      timestamp;
    };
    bets.add(id, bet);
    bet;
  };

  /// Return all bets for a given user.
  public func getUserBets(
    bets : Map.Map<GameTypes.BetId, GameTypes.BetRecord>,
    userId : Common.UserId,
  ) : [GameTypes.BetRecord] {
    bets.values().filter(func(b) { Principal.equal(b.userId, userId) }).toArray();
  };

  /// Return all bets (admin view).
  public func getAllBets(
    bets : Map.Map<GameTypes.BetId, GameTypes.BetRecord>,
  ) : [GameTypes.BetRecord] {
    bets.values().toArray();
  };

  /// Convert internal BetRecord to public BetRecordPublic (identical fields, immutable).
  public func toPublic(bet : GameTypes.BetRecord) : GameTypes.BetRecordPublic {
    {
      id = bet.id;
      userId = bet.userId;
      gameType = bet.gameType;
      betAmount = bet.betAmount;
      playerChoice = bet.playerChoice;
      outcome = bet.outcome;
      payout = bet.payout;
      isWin = bet.isWin;
      timestamp = bet.timestamp;
    };
  };
};
