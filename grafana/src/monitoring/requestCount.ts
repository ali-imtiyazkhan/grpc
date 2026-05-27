export function requestCount(req: any, res: any, next: any) {

    let count: number = 0;
    if (req.url == "/user") {
        count = count + 1

        console.log("Request count is : ", count)
    }
    next()
}