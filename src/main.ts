import { stringify } from "querystring";
import { scrypt } from "crypto";
import { throws } from "assert";

interface Player {
  name: string;
  score: number;
}

export class Game {
  player1: Player;
  player2: Player;
  deuce_score: number = 3;

  constructor(player1Points: number, player2Points: number) {
    this.player1 = {
      name: "Player 1",
      score: player1Points,
    };
    this.player2 = {
      name: "Player 2",
      score: player2Points,
    };
  }

  decideGameWinner(): string {
    if (
      this.player1.score > this.deuce_score &&
      this.player1.score - this.player2.score >= 2
    ) {
      return this.player1.name;
    } else if (
      this.player2.score > this.deuce_score &&
      this.player2.score - this.player1.score >= 2
    ) {
      return this.player2.name;
    } else {
      return "No one is winning";
    }
  }

  isDeuce(): boolean {
    return (
      this.player1.score >= this.deuce_score &&
      this.player2.score >= this.deuce_score &&
      this.player1.score == this.player2.score
    );
  }

  isPlayer1Advantage(): boolean {
    return (
      this.player1.score >= this.deuce_score &&
      this.player2.score >= this.deuce_score &&
      this.player1.score > this.player2.score
    );
  }

  isPlayer2Advantage(): boolean {
    return (
      this.player1.score >= this.deuce_score &&
      this.player2.score >= this.deuce_score &&
      this.player2.score > this.player1.score
    );
  }

  getPlayerScore(player: Player) {
    const scoreString = ["love", "fifteen", "thirty", "forty"];
    return scoreString[player.score];
  }

  printScore(): string {
    let player1ScoreSting: string = "";
    let player2ScoreSting: string = "";
    if (this.isDeuce()) {
      return "deuce";
    } else if (this.isPlayer1Advantage()) {
      return "advantage player 1";
    } else if (this.isPlayer2Advantage()) {
      return "advantage player 2";
    } else {
      return `${this.getPlayerScore(this.player1)} - ${this.getPlayerScore(
        this.player2
      )}`;
    }
  }
}

export function updateGameScore(
  player1Points: number,
  player2Points: number
): Game {
  return new Game(player1Points, player2Points);
}

export function decideGameWinner(game: Game): string {
  return game.decideGameWinner();
}

export function printScore([player1Points, player2Points]: [
  number,
  number
]): string {
  const game = new Game(player1Points, player2Points);
  return game.printScore();
}
