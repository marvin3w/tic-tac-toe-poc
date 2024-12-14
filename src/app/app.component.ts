import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Tic Tac Toe</h1>
      <div id="statusArea">Next player: <span [class.x]="currentPlayer === 'X'" [class.o]="currentPlayer === 'O'">{{ currentPlayer }}</span></div>
      <div id="winnerArea" *ngIf="winner">
        {{ winner === 'Draw' ? 'Game Drawn!' : 'Winner: ' }}<span [class.x]="winner === 'X'" [class.o]="winner === 'O'">{{ winner }}</span>
      </div>

      <div class="board">
        <div
          *ngFor="let cell of board; let i = index"
          class="square"
          [class.x]="cell === 'X'"
          [class.o]="cell === 'O'"
          (click)="makeMove(i)"
        >
          {{ cell }}
        </div>
      </div>

      <button (click)="resetGame()">Reset</button>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: Arial, sans-serif;
        text-align: center;
      }

      /* Estilo do título */
      h1 {
        font-size: 36px;
        color: #333;
        margin-bottom: 10px;
      }

      /* Área de status */
      #statusArea, #winnerArea {
        margin-bottom: 25px;
        font-size: 18px;
      }

      /* Diferentes cores para X e O */
      .x {
        color: #ff5722; /* Laranja para X */
      }
      .o {
        color: #2196f3; /* Azul para O */
      }

      /* Estilo do botão */
      button {
        margin-top: 30px;
        padding: 10px 15px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
      }

      button:hover {
        background-color: #0056b3;
      }

      /* Tabuleiro em estilo grid */
      .board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
      }

      /* Quadrados do tabuleiro */
      .square {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: bold;
        width: 70px;
        height: 65px;
        cursor: pointer;
        box-sizing: border-box;
        background-color: white;
        border: 3px solid #5b5b5b;
      }

      /* Remove bordas externas */
      .square:nth-child(3n) {
        border-right: none;
      }
      .square:nth-child(-n + 3) {
        border-top: none;
      }
      .square:nth-child(n + 7) {
        border-bottom: none;
      }
      .square:nth-child(3n + 1) {
        border-left: none;
      }

      /* Realce ao passar o mouse */
      .square:hover {
        background-color: #f9f9f9;
      }
    `,
  ],
})
export class AppComponent {
  board: string[] = []; // Representação do tabuleiro como array linear
  currentPlayer: string = 'X'; // Jogador atual
  winner: string | null = null; // Armazena o vencedor ou 'Draw'

  constructor() {
    this.resetGame();
  }

  /**
   * Reinicia o jogo, limpando o tabuleiro e resetando o estado.
   */
  resetGame(): void {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
  }

  /**
   * Registra o movimento do jogador, verifica vitória ou empate.
   * @param index Índice da célula clicada.
   */
  makeMove(index: number): void {
    if (!this.board[index] && !this.winner) {
      // Marca a célula com o símbolo do jogador atual
      this.board[index] = this.currentPlayer;

      // Verifica se há um vencedor ou empate
      if (this.checkWinner()) {
        this.winner = this.currentPlayer; // Define o vencedor
      } else if (this.board.every((cell) => cell !== '')) {
        this.winner = 'Draw'; // Define empate
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // Alterna o jogador
      }
    }
  }

  /**
   * Verifica se há uma combinação vencedora no tabuleiro.
   * @returns Retorna `true` se houver um vencedor.
   */
  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Verifica todas as combinações vencedoras
    return winningCombinations.some(
      ([a, b, c]) =>
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[b] === this.board[c]
    );
  }
}
