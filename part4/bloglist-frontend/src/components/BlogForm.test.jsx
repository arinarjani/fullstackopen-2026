import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('5.16: check <Blog /> component\'s new blog form works', async () => {
  // userEvent setup (recommended to do this before the component is rendered)
  const user = userEvent.setup()

  // create a mock function
  const addBlog = vi.fn()

  render(<BlogForm createBlog={ addBlog } />)

  // select the submit button
  const button = screen.getByText('add')
  // select inputs for title, author, url, likes
  // I used AI to write the function, because if there are multiple inputs of 'textbox', it gets confusion to find them by name; who knew
  const title = screen.getByRole('textbox', { name: (content, element) => element.getAttribute('name') === 'title' })
  const author = screen.getByRole('textbox', { name: (content, element) => element.getAttribute('name') === 'author' })
  const url = screen.getByRole('textbox', { name: (content, element) => element.getAttribute('name') === 'url' })
  const likes = screen.getByRole('spinbutton', { name: (content, element) => element.getAttribute('name') === 'likes' })

  // write data for title, author, url, likes
  await user.type(title, 'my first tests on my own')
  await user.type(author, 'eric sparrow')
  await user.type(url, 'nowhere.com')
  await user.type(likes, '5')

  // click the submit form button
  await user.click(button)

  // see what is return to the mock function
  // console.log(addBlog.mock.calls)

  // see if the mock function is called correctly
  expect(addBlog.mock.calls).toHaveLength(1)

  // see if the data provided by the form submit contains: title, author, url, likes
  expect(addBlog.mock.calls[0][0].title).toBe('my first tests on my own')
  expect(addBlog.mock.calls[0][0].author).toBe('eric sparrow')
  expect(addBlog.mock.calls[0][0].url).toBe('nowhere.com')
  expect(addBlog.mock.calls[0][0].likes).toBe('5')
})