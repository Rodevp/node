const http = require('http')
const fs = require('fs')
const qs = require('querystring')

//instanciamos un servidor
const server = http.createServer(onRequest)

server.listen(3000, () => {

    console.log('server on port 3000')

})

function onRequest(requests, response) {

    console.log('se ha hecho una peticion')
    //err, y content (o como le coloques) es el contenido del archivo en cuestion
    if (requests.url === '/') {
        fs.readFile('index.html', (err, content) => {
        
            response.setHeader('Content-Type', 'text/html')
            response.write(content)
            response.end()
        
        })
    }

    if (requests.url === '/users') {
        
        if (requests.method === 'GET') {
            response.setHeader('Content-Type', 'text/html')
            response.write('<h1>usuarios</h1>')
            response.end()
        }

        if (requests.method === 'POST') {
            
            let data = ''

            //detectamos un evento data cuando viene
            requests.on('data', (d) => {
                data += d
            })
             
            //detectamos evento cuando termina de llegar la data
            requests.on('end', () => {
                let post = qs.parse(data)
                response.end('data recibida -> ', post)
            })    

        }

        if (requests.method === 'PUT') {
            response.setHeader('Content-Type', 'text/html')
            response.write('<h1>editando</h1>')
            response.end()
        }

        if (requests.method === 'DELETE') {
            response.setHeader('Content-Type', 'text/html')
            response.write('<h1>eliminando usuarios</h1>')
            response.end()
        }

    }

}
