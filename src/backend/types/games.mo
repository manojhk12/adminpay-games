import Common "common";

module {
  public type BetId = Nat;

  public type GameType = {
    #coinFlip;
    #diceRoll;
    #roulette;
  };

  public type GameResult = {
    #heads;
    #tails;
    #dice : Nat;
    #red;
    #black;
  };

  public type BetRecord = {
    id : BetId;
    userId : Common.UserId;
    gameType : GameType;
    betAmount : Nat;
    playerChoice : GameResult;
    outcome : GameResult;
    payout : Nat;
    isWin : Bool;
    timestamp : Common.Timestamp;
  };

  public type BetRecordPublic = {
    id : BetId;
    userId : Common.UserId;
    gameType : GameType;
    betAmount : Nat;
    playerChoice : GameResult;
    outcome : GameResult;
    payout : Nat;
    isWin : Bool;
    timestamp : Common.Timestamp;
  };
};
