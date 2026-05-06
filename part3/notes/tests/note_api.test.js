const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Note = require('../modules/note.js')
const helper = require('./test_helper.js')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    // delete all the notes in the db
  await Note.deleteMany({})

  // created notes in the db with helper.initialNotes
    await Note.insertMany(helper.initialNotes)

//   let noteObject = new Note(helper.initialNotes[0])
//   await noteObject.save()

//   noteObject = new Note(helper.initialNotes[1])
//   await noteObject.save()
})

// start with an empty db
// Note.deleteMany({}).then(response => console.log(`deleted ${response.body === undefined ? 0 : response.body} notes from the db`))

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 2 notes in the db', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(r => r.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('adding a note without content is not added to db', async () => {
    // create a note without content
    const newNote = {
        important: true
    }

    // POST the note the db
    await api.post('/api/notes').send(newNote).expect(400)

    // get all notes in db
    const notesAtEnd = await helper.notesInDb()

    // make sure the total notes in db hasn't changed in number
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const allNotes = await helper.notesInDb()
    const noteToView = allNotes[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
    // get all notes
    const notesAtStart = await helper.notesInDb()
    // note to be deleted
    const noteToBeDeleted = notesAtStart[0]

    // delete the note from the db
    await api.delete(`/api/notes/${noteToBeDeleted.id}`).expect(204)

    // get all notes in db after delete
    const notesAtEnd = await helper.notesInDb()

    // create an array of all ids in notesAtEnd
    const ids = notesAtEnd.map(n => n.id)

    // see if the deleted note id is in ids
    // returns !false => true
    assert(!ids.includes(noteToBeDeleted.id))

    // make sure the length of the db has changed -1
    assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1)

    
})

after(async () => {
  await mongoose.connection.close()
})