import express from 'express'
const app = express();

app.use(express.json())

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

app.listen(3000, () => {
    console.log("server started on port 3000")
})