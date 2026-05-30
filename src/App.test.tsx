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
})
