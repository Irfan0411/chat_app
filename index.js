const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieSession = require("cookie-session")
const dotenv = require("dotenv")
const { join } = require("path")
const { createServer } = require("http")
const { Server } = require("socket.io")
const router = require("./router")

// ENV
dotenv.config()
const MONGO_URL = process.env.MONGODB
const PORT = process.env.PORT

// SERVER
const app = express()
const server = createServer(app)
const io = new Server(server)

mongoose.connect(MONGO_URL)
.then(()=>console.log("database connected"))
.catch(()=>console.log("database connection failed"))

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieSession({
    name: "chat-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
}))

app.get("/", (req, res)=> {
    res.sendFile(join(__dirname, 'index.html'))
})

app.use(router)

// io.on('connection', (socket)=>{
//     console.log("a user connected")
//     socket.on('disconnect', ()=>{
//         console.log("user disconnected")
//     })
//     socket.on('chat message', (msg)=>{
//         io.emit("chat message", msg)
//     })
// })

server.listen(PORT, ()=>console.log("server running at port "+PORT))