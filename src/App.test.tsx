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
