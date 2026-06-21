import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import App from './App'

const MAX_WAIT_MS = 5000

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

test('allows configuring the multiplier to change how much each click adds', async () => {
  const user = userEvent.setup()
  render(<App />)

  const counterButton = screen.getByRole('button', { name: /count is/i })
  const multiplierInput = screen.getByLabelText(/multiplier/i)

  await user.click(counterButton)
  expect(counterButton).toHaveTextContent('Count is 1')

  await user.clear(multiplierInput)
  await user.type(multiplierInput, '3')

  await user.click(counterButton)
  expect(counterButton).toHaveTextContent('Count is 4')

  await user.click(counterButton)
  expect(counterButton).toHaveTextContent('Count is 7')
})



test('triggers confetti when multiplier crosses a milestone and reset hides it', async () => {
  const user = userEvent.setup()
  render(<App />)

  const counterButton = screen.getByRole('button', { name: /count is/i })
  const multiplierInput = screen.getByLabelText(/multiplier/i)
  const resetButton = screen.getByRole('button', { name: /reset count/i })

  for (let i = 0; i < 8; i += 1) {
    await user.click(counterButton)
  }

  expect(counterButton).toHaveTextContent('Count is 8')

  await user.clear(multiplierInput)
  await user.type(multiplierInput, '3')

  await user.click(counterButton)
  expect(await screen.findByTestId('confetti-shell')).toBeInTheDocument()

  await user.click(resetButton)
  expect(counterButton).toHaveTextContent('Count is 0')

  await waitFor(
    () => {
      expect(screen.queryByTestId('confetti-shell')).not.toBeInTheDocument()
    },
    { timeout: MAX_WAIT_MS }
  )
})

