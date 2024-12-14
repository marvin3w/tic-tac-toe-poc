import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render Tic Tac Toe title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tic Tac Toe');
  });

  it('should initialize with empty board', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.board).toEqual(Array(9).fill(''));
  });

  it('should start with player X', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentPlayer).toBe('X');
  });

  it('should make move and switch players', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.makeMove(0);
    expect(app.board[0]).toBe('X');
    expect(app.currentPlayer).toBe('O');
  });

  it('should detect winner', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.board = ['X', 'X', 'X', '', '', '', '', '', ''];
    expect(app.checkWinner()).toBeTruthy();
  });

  it('should detect draw', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
    expect(app.board.every(cell => cell !== '')).toBeTruthy();
  });

  it('should reset game', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.makeMove(0);
    app.resetGame();
    expect(app.board).toEqual(Array(9).fill(''));
    expect(app.currentPlayer).toBe('X');
    expect(app.winner).toBeNull();
  });
});
