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

app.get("/user", (_req: any, res: any) => {
    let user = {
        name: 'imtiyaz',
        age: 20
    }
    res.status(200).json(user)
})

app.get('/', (_req: any, _res: any) => {
    _res.status(200).json({
        message: 'all is well'
    })
})

app.get("/error", (_req: any, res: any) => {
    res.status(500).json({
        message: "something went wrong"
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