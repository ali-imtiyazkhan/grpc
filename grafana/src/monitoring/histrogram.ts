import client from "prom-client"
import type { NextFunction, Request, Response } from "express";

const requestHistrogram = new client.Histogram({
    name: "request_histrogram",
    help: "total request histrogram",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 5, 15, 50, 100, 500, 1000, 2000, 5000, 10000]
});

export function requestHistrogramMiddleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {

        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(`Request Took ${duration} ms`);

        requestHistrogram.observe({
            method: req.method,
            route: req.url,
            code: res.statusCode?.toString()
        }, duration);
    });

    next()
}