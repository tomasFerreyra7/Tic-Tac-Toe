import { Square } from "./Square"

// eslint-disable-next-line react/prop-types
export function WinnerModal({ winner, reset }) {
    if (winner === null) return null

    const winnerText = winner === false ? 'Draw' : 'The winner is:'

    return (
        <section className='winner'>
            <div className='text'>
                <h2>
                    {winnerText}
                </h2>

                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                    <button onClick={reset}>Reset</button>
                </footer>
            </div>
        </section>
    )
}