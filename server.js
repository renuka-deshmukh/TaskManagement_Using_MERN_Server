const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const connectDB = require('./config/db')
const app = express()
const port = 3000



app.use(express.json())
app.use(cors())

connectDB()
// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/user', userRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))