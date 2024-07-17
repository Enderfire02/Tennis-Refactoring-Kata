// Classe à évaluer

import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { TennisGame2 } from './TennisGame2';

// Function to retrieve all scores from the JSON file
function getAllScores(): Array<[number, number, string]> {
  const testCases = path.resolve(__dirname, 'scores.json');
  const scoreData = fs.readFileSync(testCases).toString();
  const scores = JSON.parse(scoreData);
  return scores;
}

// Function to check the game score
function checkScore(game: TennisGame2, player1Score: number, player2Score: number, expectedScore: string): void {
  const highestScore: number = Math.max(player1Score, player2Score);
  for (let i = 0; i < highestScore; i++) {
    if (i < player1Score) {
      game.wonPoint('player1');
    }
    if (i < player2Score) {
      game.wonPoint('player2');
    }
  }
  expect(game.getScore()).to.equal(expectedScore);
}

// Retrieve all scores from the JSON file
const scores: Array<[number, number, string]> = getAllScores();

describe('TennisGame2 Golden Master Tests', function () {
  scores.forEach(([player1Score, player2Score, expectedScore]) => {
    it(`scores ${player1Score}:${player2Score} as ${expectedScore}`, function () {
      const game = new TennisGame2('player1', 'player2');
      checkScore(game, player1Score, player2Score, expectedScore);
    });
  });
});
