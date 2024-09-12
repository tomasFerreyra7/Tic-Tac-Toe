import { useState } from 'react'
import './App.css'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants/constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import confetti from 'canvas-confetti'


function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // Estado inicial del tablero

  const [turn, setTurn] = useState(TURNS.X)

  // Estado para saber el ganador
  const [winner, setWinner] = useState(null) // null => no hay ganador, false => empate 

  // Funcion para resetear el tablero
  const reset = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
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

    // Funcion para saber si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  // Funcion para el boton reset

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={reset}>Reset game</button>
      <section className='game'>
        {
          board.map((square, index) => {
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
      <WinnerModal reset={reset} winner={winner} />
    </main>
  )
}

export default App
