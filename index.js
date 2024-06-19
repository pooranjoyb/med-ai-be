import express from 'express'
import bp from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.js"
import twilioRoutes from "./routes/twilio.js"
import geminiRoutes from "./routes/gemini.js"
import Connection from './config/connection.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello from server')
})

//route
app.use('/api/gemini', geminiRoutes);
app.use('/api/twilio', twilioRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    Connection();
})