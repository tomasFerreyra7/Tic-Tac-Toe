import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

// Casillero
const Square = ({ children, updateBoard, isSelected, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// Combinaciones ganadoras (no es optima)
const WINNER_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [5, 6, 7],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const reset = Array(9).fill(null) // Funcion para resetear el tablero

  const [board, setBoard] = useState(reset); // Estado inicial del tablero

  const [turn, setTurn] = useState(TURNS.X)

  // Estado para saber el ganador
  const [winner, setWinner] = useState(null) // null => no hay ganador, false => empate 

  // Funcion para determinar el ganador
  const checkWinner = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadoras
    for (const combo of WINNER_COMBO) {
      const [a, b, c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }

    // Si no hay ganador 
    return null
  }

  const updateBoard = (index) => {
    // Si el tablero tiene algo o hay un ganador no poner nada
    if (board[index] || winner) return

    // Funcion para cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Funcion para actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      setWinner(newWinner)
    }
  }

  // Funcion para el boton reset
  const buttonReset = () => {
    setBoard(reset)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section>
        <button onClick={buttonReset}>Reset</button>
      </section>
    </main>
  )
}

export default App
