import { WINNER_COMBOS } from '../constants/constants.js'

// Funcion para determinar el ganador
export const checkWinner = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
            return boardToCheck[a]
        }
    }

    // Si no hay ganador 
    return null
}

// Funcion para saber si termino el juego
export const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square !== null)
}