import { config } from "dotenv"
config()
import express, { Application, Request, Response } from "express"
import * as Sentry from "@sentry/node";

const app: Application = express()

const PORT: Number = Number(process.env.PORT) || 3002;

app.use(Sentry.Handlers.requestHandler())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.raw())
app.use(require('cors')())

//connect db
import './databases/burgerus'

//successful connection
app.listen(PORT, () => {
    console.log(`Connection has been established successfully. App is listening to port ${PORT} \n 
    http://localhost:${PORT}`)
})

import index from "./routes/index"
index(app)


app.use(Sentry.Handlers.errorHandler());
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: false,
        error: 'Seems you are lost 😀'
    })
})