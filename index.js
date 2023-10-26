
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())


//JSON-PARSER
app.use(express.json())

app.use(express.static('build'))

const requestLogger = (request,response,next) => {
        console.log('Method', request.method)
        console.log('Path', request.path)
        console.log('Body', request.body),
        next()
}

app.use(requestLogger)

//Json 
let notes = [
    {
        id: 1,
        content: "Html et CSS",
        important: true
    },
    {
        id: 2,
        content: "Javascript base",
        important: true
    },
    {
        id: 3,
        content: "React et Node js",
        important: true
    },
    {
        id: 4,
        content: "MongoDB database",
        important: true
    }
]
// Le Route
app.get('/', (request,response) => {
    response.end('<h1>Node JS </h1>')
})
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const noteId = Number(request.params.id)
    const note   = notes.find(not => not.id === noteId)
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const noteId = Number(request.params.id)
    const notes  = notes.filter(not => not.id !== noteId)
    response.status(200).end()
    response.json(notes)
})


//  Create generated ID
const generateId = () => {
    const maxId = notes.length > 0 ? 
    Math.random(...notes.map(note => note.id)) : 0
    return maxId + 1
}

// post , activated json-parser
app.post('/api/notes', (request, response) => {
    const body = request.body
    
    if(!body.content) {
        return response.status(400).json({
            error: 'Remplissez ce champ'
        })
    }

    const noteData = {
        id: generateId(),
        content: body.content,
        important: body.important || false
    }

    sort = notes.concat(noteData)
    response.json(sort)
})

const unkownPoint = (request,response) => {
     response.status(404).send({error: 'Not Found Page, desoler ... merci'})
}
app.use(unkownPoint)

//Create Host 
const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})