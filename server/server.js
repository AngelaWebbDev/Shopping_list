const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json(), express.urlencoded({extended:true}))

require('./config/mongoose.config')
require('./routes/items.routes')(app)

app.listen(port, () => console.log(`Listening on port ${port}`))