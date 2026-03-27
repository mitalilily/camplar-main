const fs = require('fs')
const http = require('http')
const path = require('path')

const PORT = Number(process.env.PORT || 3000)
const buildDir = path.join(__dirname, 'build')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const sendFile = (res, filePath) => {
  const ext = path.extname(filePath).toLowerCase()
  const type = contentTypes[ext] || 'application/octet-stream'

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Not found')
      return
    }

    res.writeHead(200, { 'Content-Type': type })
    res.end(data)
  })
}

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent((req.url || '/').split('?')[0])
  const normalizedPath = requestPath === '/' ? '/index.html' : requestPath
  const safePath = path.normalize(normalizedPath).replace(/^(\.\.[/\\])+/, '')
  const filePath = path.join(buildDir, safePath)

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      sendFile(res, filePath)
      return
    }

    sendFile(res, path.join(buildDir, 'index.html'))
  })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Camplar admin build server running at http://127.0.0.1:${PORT}`)
})
