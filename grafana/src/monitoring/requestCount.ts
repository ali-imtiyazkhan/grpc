import type { NextFunction, Request, Response } from "express";
import client from "prom-client"

const requestCounter = new client.Counter({
    name: "request_counter",
    help: "Total request count ",
    labelNames: ["method", "route", "status"]
});

const activeUserGauge = new client.Gauge({
    name: "active_user",
    help: "total active user",
    labelNames: ["route", "method", "status"]
});

export function requestCounterMiddleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {

        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(`Request Took ${duration} ms`);

        requestCounter.inc({
            method: req.method,
            route: req.url,
            status: res.statusCode
        });

        if (res.statusCode == 200 || res.statusCode == 201) {
            activeUserGauge.inc({
                method: req.method,
                route: req.url,
                status: res.statusCode
            });
        } else {
            activeUserGauge.dec({
                method: req.method,
                route: req.url,
                status: res.statusCode
            });
        }


    });

    next()
}