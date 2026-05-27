import express from 'express'
import { requestCounterMiddleware } from './monitoring/requestCount.js';
import client from "prom-client"
const app = express();

app.use(express.json());
app.use(requestCounterMiddleware)

app.use((_req: any, _res: any, next: any) => {
    console.log("middleware entrypoint ")

    let started = Date.now();
    next()
    console.log("middleware existing point ")

    let ended = Date.now();

    let timetake = ended - started

    console.log(`timetake ${timetake} ms`)
})

app.get("/user", (req, res) => {
    let user = {
        name: 'imtiyaz',
        age: 20
    }
    res.json(user)
})

app.get('/', (_req: any, _res: any) => {
    _res.json({
        message: 'all is well'
    })
})

app.get("/metrics", async (req, res) => {
    const matrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);

    res.end(matrics)
})

app.listen(3000, () => {
    console.log("server started on port 3000")
})