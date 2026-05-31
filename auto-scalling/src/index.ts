import express from 'express'
import cluster from 'cluster'

import os from 'os'

if(cluster.isPrimary){
    const numCores = os.cpus().length;
    console.log(`Primary process started ${process.pid}`)

    for(let i = 0; i < numCores; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker,code,signal) =>{
        console.log(`Worker died ${worker.process.pid}, ${code}`)
        cluster.fork();
    })
}else {
    console.log(`Worker process started ${process.pid}`)
    const app = express()
    const port = process.env.PORT || 3000
    
    app.get('/', (req, res) => {
        res.send(`Hello from worker ${process.pid}`)
    })

    app.get("/api/:id",(req,res)=>{
        let i= 0;
        while(i < 1e9) i++;
        res.send(`Job ${req.params.id} completed on worker ${process.pid}`)
    })

    app.listen(port, () => {
        console.log(`Worker process started ${process.pid}`)
    })
}
