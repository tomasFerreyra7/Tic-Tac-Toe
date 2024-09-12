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


function App() {
  const reset = Array(9).fill(null) // Funcion para resetear el tablero

  const [board, setBoard] = useState(reset); // Estado inicial del tablero

  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = (index) => {
    if (board[index]) return // Si el tablero tiene algo no poner nada

    // Funcion para cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Funcion para mostrar la ficha en el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
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
