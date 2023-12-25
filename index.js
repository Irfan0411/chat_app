const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieSession = require("cookie-session")
const helmet = require("helmet")
const path = require("path")
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
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})
global.io = io

mongoose.connect(MONGO_URL)
.then(()=>console.log("database connected"))
.catch(()=>console.log("database connection failed"))

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(cookieSession({
    name: "chat-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
}))
app.use("/files", express.static(path.join(__dirname, "files")))

app.get("/", (req, res)=> {
    res.sendFile(join(__dirname, 'index.html'))
})

app.use(router)

io.on('connection', (socket)=>{
    console.log("a user connected")
    socket.on('disconnect', ()=>{
        console.log("user disconnected")
    })

    socket.on("userId", (userId)=> {
        socket.join(userId)
        console.log('join room '+userId);
    })

    socket.on("ping", (to, from)=> {
        io.to(to).emit("ping", from)
    })

    socket.on("chat", (msg)=>{
        io.to(msg.to).emit("chat", msg)
    })
})

server.listen(PORT, ()=>console.log("server running at port "+PORT))