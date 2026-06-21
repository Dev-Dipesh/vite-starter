import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import ConfettiBurst from './ConfettiBurst'
import './App.css'

const CONFETTI_DURATION_MS = 2600

function App() {
  const [count, setCount] = useState(0)
  const [confettiSeed, setConfettiSeed] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const confettiTimerRef = useRef<number | null>(null)
  const [multiplierInput, setMultiplierInput] = useState('1')
  const multiplier = Math.max(1, Math.floor(Number(multiplierInput)) || 1)
  const prevCountRef = useRef(0)

  useEffect(() => {
    const prevCount = prevCountRef.current
    const hasCrossedMilestone =
      count > prevCount && Math.floor(prevCount / 10) < Math.floor(count / 10)

    prevCountRef.current = count

    if (!hasCrossedMilestone) {
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

  const resetCount = () => {
    setCount(0)
    setShowConfetti(false)

    if (confettiTimerRef.current) {
      clearTimeout(confettiTimerRef.current)
      confettiTimerRef.current = null
    }
  }

  const handleMultiplierChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMultiplierInput(event.target.value)
  }

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
          <button
            type="button"
            className="counter"
            onClick={() => setCount((current) => current + multiplier)}
          >
            Count is {count}
          </button>
          <button type="button" className="reset" onClick={resetCount}>
            Reset count
          </button>
          <div className="multiplier-control">
            <label htmlFor="multiplier-input">
              Multiplier
              <span>per click</span>
            </label>
            <input
              id="multiplier-input"
              type="number"
              min={1}
              step={1}
              value={multiplierInput}
              onChange={handleMultiplierChange}
            />
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
