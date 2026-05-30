import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import ConfettiBurst from './ConfettiBurst'
import './App.css'

const CONFETTI_DURATION_MS = 2600
const GAME_TARGET_CLICKS = 10
const GAME_MAX_SCORE = 10
const GAME_DISPLAY_CAP = GAME_MAX_SCORE - 0.1
const GAME_STORAGE_KEY = 'game-mode-best-score'

const formatScore = (value: number) => (Number.isFinite(value) ? value.toFixed(1) : '0.0')

declare global {
  interface Window {
    __gameModeNow?: number
  }
}

const getGameModeNow = () => {
  if (typeof window !== 'undefined' && typeof window.__gameModeNow === 'number') {
    const value = window.__gameModeNow
    delete window.__gameModeNow
    return value
  }

  return performance.now()
}

function App() {
  const [count, setCount] = useState(0)
  const [confettiSeed, setConfettiSeed] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const confettiTimerRef = useRef<number | null>(null)

  const [gameClicks, setGameClicks] = useState(0)
  const [gameStartTime, setGameStartTime] = useState<number | null>(null)
  const [currentRunSpeed, setCurrentRunSpeed] = useState(0)
  const [sessionBestSpeed, setSessionBestSpeed] = useState(0)
  const [bestEverSpeed, setBestEverSpeed] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.localStorage?.getItem !== 'function') {
      return
    }

    const storedValue = window.localStorage.getItem(GAME_STORAGE_KEY)
    const parsed = Number.parseFloat(storedValue ?? '')

    if (Number.isFinite(parsed)) {
      setBestEverSpeed(parsed)
    }
  }, [])

  const handleGameModeClick = () => {
    const now = getGameModeNow()
    const startingNewRun = gameComplete || gameClicks >= GAME_TARGET_CLICKS
    const nextClicks = startingNewRun ? 1 : gameClicks + 1
    const startTime = startingNewRun ? now : gameStartTime ?? now
    const elapsedSeconds = (now - startTime) / 1000
    const rawSpeed = elapsedSeconds > 0 ? nextClicks / elapsedSeconds : 0
    const runCompleteNow = nextClicks >= GAME_TARGET_CLICKS

    setGameStartTime(startTime)
    setGameClicks(nextClicks)
    setGameComplete(runCompleteNow)

    if (runCompleteNow) {
      const roundedSpeed = Number(rawSpeed.toFixed(2))
      setCurrentRunSpeed(roundedSpeed)
      setSessionBestSpeed((prev) => Math.max(prev, roundedSpeed))

      if (roundedSpeed > bestEverSpeed) {
        setBestEverSpeed(roundedSpeed)

        if (typeof window !== 'undefined' && typeof window.localStorage?.setItem === 'function') {
          window.localStorage.setItem(GAME_STORAGE_KEY, roundedSpeed.toString())
        }
      }

      return
    }

    if (startingNewRun) {
      setCurrentRunSpeed(0)
      return
    }

    setCurrentRunSpeed(rawSpeed)
  }

  const progressValue = Math.min(gameClicks, GAME_TARGET_CLICKS)
  const progressLabel = `Clicks ${progressValue}/${GAME_TARGET_CLICKS}`
  const displayScore = gameComplete ? GAME_MAX_SCORE : Math.min(currentRunSpeed, GAME_DISPLAY_CAP)
  const instructions = gameComplete
    ? 'Speed locked at 10 — tap again to chase a new run.'
    : 'Tap the button quickly to build a live click-speed score.'

  const resetCount = () => {
    setCount(0)
    setShowConfetti(false)

    if (confettiTimerRef.current) {
      clearTimeout(confettiTimerRef.current)
      confettiTimerRef.current = null
    }
  }

  useEffect(() => {
    const isMilestone = count > 0 && count % 10 === 0

    if (!isMilestone) {
      return
    }

    if (confettiTimerRef.current) {
      clearTimeout(confettiTimerRef.current)
    }

    setShowConfetti(true)
    setConfettiSeed((seed) => seed + 1)

    confettiTimerRef.current = window.setTimeout(() => {
      setShowConfetti(false)
      confettiTimerRef.current = null
    }, CONFETTI_DURATION_MS)
  }, [count])

  useEffect(() => {
    return () => {
      if (confettiTimerRef.current) {
        clearTimeout(confettiTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      {showConfetti && <ConfettiBurst seed={confettiSeed} />}

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <div className="counter-actions">
          <div className="counter-controls">
            <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
              Count is {count}
            </button>
            <button type="button" className="reset" onClick={resetCount}>
              Reset count
            </button>
          </div>

          <div className="game-panel">
            <div className="game-panel__score-row">
              <p>Click speed score</p>
              <strong data-testid="game-score" aria-live="polite">
                {formatScore(displayScore)}
              </strong>
            </div>
            <p className="game-panel__progress" aria-label={progressLabel}>
              {progressLabel}
            </p>
            <p className="game-panel__instructions">{instructions}</p>
            <button type="button" className="game-panel__button" onClick={handleGameModeClick}>
              Game mode
            </button>
            <div className="game-panel__stats">
              <div className="game-panel__stat">
                <span>Current run</span>
                <strong data-testid="game-current-score">{formatScore(currentRunSpeed)}</strong>
              </div>
              <div className="game-panel__stat">
                <span>Session best</span>
                <strong data-testid="game-session-score">{formatScore(sessionBestSpeed)}</strong>
              </div>
              <div className="game-panel__stat">
                <span>Best ever</span>
                <strong data-testid="game-best-score">{formatScore(bestEverSpeed)}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
