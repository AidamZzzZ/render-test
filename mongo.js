const mongoose = require('mongoose')

// Verifica que haya una  contrasena en la linea de comandos
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

// Se toma la contrasena de seguridad de Atlas en el indice 2
const password = process.argv[2]

// Se pasa la direccion de la base de datos y la contrasena
const url = 
    `mongodb+srv://Adrian:${password}@cluster0.qhrxb5b.mongodb.net/noteApp?retryWrites=true&w=majority`

// Permite usar claves no definidas en el esquema dentro de las consultas
mongoose.set('strictQuery', false)

// Se conecta la base de datos
mongoose.connect(url)

// Se crea un esquema
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

// Se crea un modelo con el nombre 'Note' y el esquema creado
const Note = mongoose.model('Note', noteSchema)

// Se crea un nuevo objecto nota
// const note = new Note({
//     content: 'CSS is hard',
//     important: false,
// })

// Se guarda en la base de datos 
// note.save().then(result => {
//     console.log(result)
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// Obtiene todas las notas
Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

