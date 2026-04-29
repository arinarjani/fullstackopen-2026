//const db_connent_link = `mongodb+srv://arin:<insert_password>@udemy-web-dev-yelpcamp.zztje.mongodb.net/?appName=udemy-web-dev-yelpcamp`

// const mongoose = require('mongoose');
// const uri = "mongodb+srv://arin:<insert_password>@udemy-web-dev-yelpcamp.zztje.mongodb.net/?appName=udemy-web-dev-yelpcamp"

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     console.log('this is running...')
//     await mongoose.disconnect();
//     console.log('mongoose is disconnected')
//   }
// }
// run().catch(console.dir);


const mongoose = require('mongoose')
const uri = "mongodb+srv://arin:<insert_password>@udemy-web-dev-yelpcamp.zztje.mongodb.net/noteApp?appName=udemy-web-dev-yelpcamp"

async function main() {
    await mongoose.connect(uri)
    console.log('connection opened')

    // do all the mongoose stuff you want

    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema)

    const note = new Note({
      content: 'HTML is easy',
      important: true,
    })

    try {
        // await note.save()
        // console.log('note saved')
        const findAllNotes = await Note.find({})
        findAllNotes.forEach(note => {
          console.log(note)
        })
    } catch (err) {
        console.log(`note was note saved due to err: ${err}`)
    }

    // close the connection
    mongoose.connection.close()
    console.log('connection closed')
}

main().catch(err => console.log('error happened during connection:', err))



// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })