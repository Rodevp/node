const express = require('express')
const app = express()
const userRouter = require('./routes/users.routes.js')

const PORT = 3000

//settings
//configuraciones de variables de nuestro servidor
app.set('foo', 'bar') 

//middleware
//funciones que se ejecutan "antes de"
const myMiddleware = (req, res, next) => {
    console.log('ejecutando middleware')
    next() //función que da paso a la siguiente
}

app.use(myMiddleware)

//endpoinds
app.get('/', (req, res) => {
    res.send('Bienvenidos')
})

app.use('/users', userRouter)


app.listen(PORT, () => {
    console.log( 'setting', app.get('foo') )
    console.log( 'server on port -> ', PORT )
})