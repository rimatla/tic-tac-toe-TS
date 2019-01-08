import React, { Component } from 'react'
import './App.css'

type ONGOING_GAME = -1
const ONGOING_GAME = -1

const Player = {
  None: 0,
  One: 1,
  Two: 2,
}
interface IState {
  board: number[]
  nextPlayerTurn: number
  gameIsWon: number | ONGOING_GAME
}
class App extends Component<{}, IState> {
  public state: IState = {
    board: [
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
    ],
    gameIsWon: ONGOING_GAME,
    nextPlayerTurn: Player.One,
  }

  public checkIfGameIsOver = (board: number[] | any) => {
    // every time someone makes a move, check if the game is over

    // horizontally
    if (board[0] === board[1] && board[1] === board[2] && board[2] !== Player.None) {
      // return winner
      return board[0]
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== Player.None) {
      return board[3]
    } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== Player.None) {
      return board[6]
    }

    // vertically
    else if (board[0] === board[3] && board[3] === board[6] && board[6] !== Player.None) {
      return board[0]
    } else if (board[1] === board[4] && board[4] === board[7] && board[7] !== Player.None) {
      return board[1]
    } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== Player.None) {
      return board[2]
    }

    // diagonally
    else if (board[0] === board[4] && board[4] === board[8] && board[8] !== Player.None) {
      return board[0]
    } else if (board[2] === board[4] && board[4] === board[6] && board[6] !== Player.None) {
      return board[2]
    }

    // check for a drawed game
    for (const player of board) {
      if (player === Player.None) {
        return ONGOING_GAME
      }
    }
    return Player.None
  }

  // function takes an index and returns a new function
  public createOnClickHandler = (index: number) => () => {
    const { board, nextPlayerTurn, gameIsWon } = this.state
    const newBoard = board.slice()
    newBoard[index] = nextPlayerTurn

    const gameOver = this.checkIfGameIsOver(newBoard)

    // prevent player from overwriting with a secondary click
    // if game is won, return it
    if (gameIsWon !== ONGOING_GAME || board[index] !== Player.None) {
      return
    }

    this.setState({ board: newBoard, nextPlayerTurn: 3 - nextPlayerTurn, gameIsWon: gameOver })
    return
  }

  public renderCell = (index: number) => {
    const { board } = this.state
    return (
      <div
        className="cell"
        key={index}
        onClick={this.createOnClickHandler(index)}
        data-player={board[index]}
      />
    )
  }

  public renderBoard = () => {
    const { board } = this.state
    return <div className="board-container">{board.map((value, key) => this.renderCell(key))}</div>
  }

  public renderStatus = () => {
    const { gameIsWon } = this.state
    const winningText = gameIsWon !== Player.None ? `Player ${gameIsWon} won!` : `The game is draw!`
    return (
      <div>
        <span>Player 1 is purple</span>
        <span>Player 2 is yellow</span>
        <span>{gameIsWon === ONGOING_GAME ? `game is on going` : winningText}</span>
      </div>
    )
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4> React TicTacToe Using TypeScript</h4>
        </header>
        {this.renderBoard()}
        {this.renderStatus()}
      </div>
    )
  }
}

export default App
