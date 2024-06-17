import express from 'express'
import bp from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})