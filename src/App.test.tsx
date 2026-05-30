import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, test, expect } from 'vitest'
import App from './App'

const MAX_WAIT_MS = 5000
const GAME_TARGET_CLICKS = 10

const GAME_DISPLAY_CAP = 9.9

const createLocalStorageMock = () => {
  const store: Record<string, string> = {}

  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key])
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length
    },
  }
}

let localStorageMock = createLocalStorageMock()

beforeEach(() => {
  localStorageMock = createLocalStorageMock()
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true,
  })
})

test('renders confetti on multiples of ten and keeps it hidden otherwise', async () => {
  const user = userEvent.setup()
  render(<App />)

  const button = screen.getByRole('button', { name: /count is/i })

  for (let i = 0; i < 9; i += 1) {
    await user.click(button)
  }

  expect(screen.queryByTestId('confetti-shell')).not.toBeInTheDocument()

  await user.click(button)
  expect(await screen.findByTestId('confetti-shell')).toBeInTheDocument()

  await waitFor(
    () => {
      expect(screen.queryByTestId('confetti-shell')).not.toBeInTheDocument()
    },
    { timeout: MAX_WAIT_MS }
  )

  for (let i = 0; i < 9; i += 1) {
    await user.click(button)
  }

  expect(screen.queryByTestId('confetti-shell')).not.toBeInTheDocument()

  await user.click(button)
  expect(await screen.findByTestId('confetti-shell')).toBeInTheDocument()
})


test('reset button returns the count to zero and hides active confetti immediately', async () => {
  const user = userEvent.setup()
  render(<App />)

  const counterButton = screen.getByRole('button', { name: /count is/i })
  const resetButton = screen.getByRole('button', { name: /reset count/i })

  for (let i = 0; i < 10; i += 1) {
    await user.click(counterButton)
  }

  expect(await screen.findByTestId('confetti-shell')).toBeInTheDocument()

  await user.click(resetButton)

  expect(counterButton).toHaveTextContent('Count is 0')

  await waitFor(
    () => {
      expect(screen.queryByTestId('confetti-shell')).not.toBeInTheDocument()
    },
    { timeout: 500 }
  )
})



test('game mode measures click speed and persists the best run', async () => {
  const user = userEvent.setup()
  const clickTimes = [0, 250, 520, 880, 1310, 1790, 2330, 2880, 3450, 4050, 4680]
  const { unmount } = render(<App />)
  const gameButton = screen.getByRole('button', { name: /game mode/i })
  const scoreNodeRef = screen.getByTestId('game-score')
  const currentNode = screen.getByTestId('game-current-score')
  const sessionNode = screen.getByTestId('game-session-score')
  const bestNode = screen.getByTestId('game-best-score')

  const computeSpeed = (index: number) => {
    const start = clickTimes[0]
    const elapsedSeconds = (clickTimes[index] - start) / 1000
    return elapsedSeconds > 0 ? (index + 1) / elapsedSeconds : 0
  }

  expect(scoreNodeRef).toHaveTextContent('0.0')
  expect(currentNode).toHaveTextContent('0.0')
  expect(sessionNode).toHaveTextContent('0.0')
  expect(bestNode).toHaveTextContent('0.0')

  for (let i = 0; i < GAME_TARGET_CLICKS - 1; i += 1) {
    window.__gameModeNow = clickTimes[i]
    await user.click(gameButton)

    const rawSpeed = computeSpeed(i)
    const cappedScore = Math.min(rawSpeed, GAME_DISPLAY_CAP)

    expect(scoreNodeRef).toHaveTextContent(cappedScore.toFixed(1))
    expect(currentNode).toHaveTextContent(rawSpeed.toFixed(1))
  }

  window.__gameModeNow = clickTimes[GAME_TARGET_CLICKS - 1]
  await user.click(gameButton)
  expect(scoreNodeRef).toHaveTextContent('10.0')

  const finalSpeed = computeSpeed(GAME_TARGET_CLICKS - 1)
  const roundedSpeed = Number(finalSpeed.toFixed(2))
  const displaySpeed = roundedSpeed.toFixed(1)

  expect(currentNode).toHaveTextContent(displaySpeed)
  expect(sessionNode).toHaveTextContent(displaySpeed)
  expect(bestNode).toHaveTextContent(displaySpeed)
  expect(window.localStorage.getItem('game-mode-best-score')).toBe(roundedSpeed.toString())

  window.__gameModeNow = clickTimes[GAME_TARGET_CLICKS]
  await user.click(gameButton)
  expect(scoreNodeRef).toHaveTextContent('0.0')
  expect(currentNode).toHaveTextContent('0.0')
  expect(sessionNode).toHaveTextContent(displaySpeed)
  expect(bestNode).toHaveTextContent(displaySpeed)

  unmount()
  render(<App />)

  expect(screen.getByTestId('game-score')).toHaveTextContent('0.0')
  expect(screen.getByTestId('game-current-score')).toHaveTextContent('0.0')
  expect(screen.getByTestId('game-session-score')).toHaveTextContent('0.0')
  expect(screen.getByTestId('game-best-score')).toHaveTextContent(displaySpeed)
})

