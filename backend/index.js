const mongoDb = require('./db')
const express = require('express')
const cors = require('cors');

const app = express()
mongoDb()
const PORT = 5000
// React ka port aur node ka port alg rkhna 

app.use(cors());
app.use(express.json())
app.use('/api', require('./Routes/CreateUser'))

app.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`)
})