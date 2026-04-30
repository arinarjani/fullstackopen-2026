// getting-started.js
const mongoose = require('mongoose')
const uri = `mongodb+srv://arin:${process.argv[2]}@udemy-web-dev-yelpcamp.zztje.mongodb.net/phonebookApp?appName=udemy-web-dev-yelpcamp`

// console.log(process.argv[2] === 'hjk')

if (process.argv.length < 3) {
    console.log('please give either the password (if you want to see all the data), or the combination of the password and the name and number of the contact')
    process.exit(1)
}

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(uri)
    console.log('connection to db is open')

    // do all mongoDB stuff here
    //create a schema
    const phonebookSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    // create a model
    const Phonebook = mongoose.model('phonebook', phonebookSchema)

    if (process.argv.length === 3) {
        try {
            const contacts = await Phonebook.find({})
            console.log('Phonebook:')
            contacts.forEach(contact => {
                console.log(contact.name, contact.number)
            })
        } catch(err) {
            console.log(err)
        }
    } else {
        // create a phonebook entry based on the model
        const contact = new Phonebook({
            name: process.argv[3],
            number: process.argv[4]
        })

        // save to db
        try {
            await contact.save()
            console.log(`added ${process.argv[3]} number ${process.argv[4]} to phoneboooook`)
        } catch(err) {
            console.log(err)
        }
    }

    // close db
    mongoose.connection.close()
    console.log('connection to db closed')
}