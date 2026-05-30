import type { CSSProperties } from 'react'
import { useMemo } from 'react'

const PIECE_COUNT = 36
const COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#a78bfa', '#f472b6']

type Piece = {
  id: string
  left: number
  delay: number
  duration: number
  rotation: number
  color: string
}

function buildPieces(seed: number): Piece[] {
  return Array.from({ length: PIECE_COUNT }, (_, index) => ({
    id: `${seed}-${index}`,
    left: Math.random() * 100,
    delay: Math.random() * 0.9,
    duration: 1.6 + Math.random() * 0.8,
    rotation: Math.random() * 360,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
}

export type ConfettiBurstProps = {
  seed: number
}

export default function ConfettiBurst({ seed }: ConfettiBurstProps) {
  const pieces = useMemo(() => buildPieces(seed), [seed])

  return (
    <div className="confetti-shell" data-testid="confetti-shell" aria-hidden="true">
      {pieces.map((piece) => {
        const style = {
          left: `${piece.left}%`,
          animationDelay: `${piece.delay}s`,
          animationDuration: `${piece.duration}s`,
          backgroundColor: piece.color,
          '--rotation': `${piece.rotation}deg`,
        } as CSSProperties & { '--rotation': string }

        return <span key={piece.id} className="confetti-piece" style={style} />
      })}
    </div>
  )
}
