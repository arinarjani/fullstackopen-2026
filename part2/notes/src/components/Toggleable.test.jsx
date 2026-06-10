import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    screen.getByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('togglable content')
    expect(element).toBeVisible()
  })

  test('after clicking the button, children are hidden', () => {
    // register the userEvent
    const user = userEvent.setup()

    // select the show button
    const showButton = screen.getByText('show...')
    // click the show button
    user.click(showButton)

    // get the close button
    const closeButton = screen.getByText('cancel')
    // click the show button
    user.click(closeButton)

    // select the 'togglable content' element
    const element = screen.getByText('togglable content')
    // see if the 'togglable content' element is hidden
    expect(element).not.toBeVisible()
  })
})