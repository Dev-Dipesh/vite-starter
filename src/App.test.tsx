import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import App from './App'

describe('App counter', () => {
  it('increments and resets the count', () => {
    render(<App />)

    const counterButton = screen.getByRole('button', { name: /^Count is/i })
    const resetButton = screen.getByRole('button', { name: /^Reset count$/i })

    expect(counterButton).toHaveTextContent('Count is 0')

    fireEvent.click(counterButton)
    expect(counterButton).toHaveTextContent('Count is 1')

    fireEvent.click(resetButton)
    expect(counterButton).toHaveTextContent('Count is 0')
  })
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
