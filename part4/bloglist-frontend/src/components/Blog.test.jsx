import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.jsx'

// create test blog
const blog = {
  title: 'I am learning how to test React apps',
  author: {
    name: 'arin arjani'
  },
  url: 'www.arin_is_learning.com',
  likes: 1
}

test('5.13: check <Blog /> component renders title and author', () => {
  
  render(<Blog blog={ blog } />)
  
  // screen.debug()
  
  // select the title
  const title = screen.getByText('I am learning how to test React apps')
  // select the author (I put 'author: <author_name>' as the element's text, so searching for 'arin arjani' will not work, hence the regex)
  const author = screen.getByText(/arin arjani/i)
  
  // get url
  const url = screen.getByText(/www.arin_is_learning.com/i)
  // get likes
  const likes = screen.getByText('likes: 1')
  
  // make sure url and likes is not visible by default
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
  
  // make sure title and author are rendered to the page
  expect(title).toBeDefined()
  expect(author).toBeDefined()
})


test('5.14: check <Blog /> renders url and likes when \'show\' button is clicked', async () => {
  // userEvent setup (recommended to do this before the component is rendered)
  const user = userEvent.setup()

  render(<Blog blog={ blog } />)

  
  // get button
  const button = screen.getByText('view')
  // get url
  const url = screen.getByText(/www.arin_is_learning.com/i)
  // get likes
  const likes = screen.getByText('likes: 1')
  
  // click the button
  await user.click(button)
  
  // screen.debug()

  // verify that url and likes are now visible
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})

test('5.15: check <Blog /> component\'s like button works', async () => {
  // userEvent setup (recommended to do this before the component is rendered)
  const user = userEvent.setup()

  // create a mock function
  const handleLikes = vi.fn()

  render(<Blog blog={ blog } handleIncreaseLikes={ handleLikes } />)

  // grab likes
  const likes = screen.getByText(/likes: [0-9]/i)
  // grab likes button
  const likesButton = screen.getByText('like')

  // click likes button twice
  await user.click(likesButton)
  await user.click(likesButton)

  // see what is being returned when I click the button
  // console.log(handleLikes.mock.calls)

  // verify that handleLikes function was clicked twice
  expect(handleLikes.mock.calls).toHaveLength(2)
})


