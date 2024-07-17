// Classe à évaluer

import { TennisGame } from './TennisGame';

// Class representing the tennis game
export class TennisGame2 implements TennisGame {
  // Player 1 and player 2
  private player1: Player;
  private player2: Player;

  // Point names
  private readonly love: string = 'Love';
  private readonly fifteen: string = 'Fifteen';
  private readonly thirty: string = 'Thirty';
  private readonly forty: string = 'Forty';

  // Constructor initializing players with their respective names
  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  // Method to get the current score of the game
  getScore(): string {
    if (this.isEqualScore()) {
      return this.getEqualScore();
    } else if (this.isAdvantageOrWinScore()) {
      return this.getAdvantageOrWinScore();
    } else {
      return `${this.getScoreDescription(this.player1.points)}-${this.getScoreDescription(this.player2.points)}`;
    }
  }

  // Checks if both players' scores are equal and less than 4
  private isEqualScore(): boolean {
    return this.player1.points === this.player2.points && this.player1.points < 4;
  }

  // Checks if one of the players has a score of 4 or more
  private isAdvantageOrWinScore(): boolean {
    return this.player1.points >= 4 || this.player2.points >= 4;
  }

  // Returns the score in case of equality
  private getEqualScore(): string {
    if (this.player1.points < 3) {
      return `${this.getScoreDescription(this.player1.points)}-All`;
    } else {
      return 'Deuce';
    }
  }

  // Returns the score in case of advantage or win
  private getAdvantageOrWinScore(): string {
    const scoreDifference: number = Math.abs(this.player1.points - this.player2.points);
    if (scoreDifference === 1) {
      return `Advantage ${this.getLeadingPlayer().name}`;
    } else {
      return `Win for ${this.getLeadingPlayer().name}`;
    }
  }

  // Returns the description of a given score
  private getScoreDescription(score: number): string {
    switch (score) {
      case 0: return this.love;
      case 1: return this.fifteen;
      case 2: return this.thirty;
      case 3: return this.forty;
      default: return '';
    }
  }

  // Method overload to assign a point to a player
  wonPoint(player: Player): void;
  wonPoint(playerName: string): void;
  wonPoint(arg: Player | string): void {
    if (typeof arg === 'string') {
      this.wonPointByName(arg);
    } else {
      arg.points++;
    }
  }

  // Assigns a point to a player based on their name
  private wonPointByName(playerName: string): void {
    if (playerName === this.player1.name) {
      this.player1.points++;
    } else if (playerName === this.player2.name) {
      this.player2.points++;
    } else {
      throw new Error('Invalid player name');
    }
  }

  // Returns the player with the highest score
  private getLeadingPlayer(): Player {
    return this.player1.points > this.player2.points ? this.player1 : this.player2;
  }
}
