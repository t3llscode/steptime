// \\\\\\\\\\ Import / Export ////////// \\

import express from 'express'

// \\\\\\\\\\ Declaration ////////// \\

const app = express()
app.use(express.json())

// define working directory
const wd = "/usr/src/app"

// Convert string to boolean and parse json
app.use((req, res, next) => {
    const authHeader = req.headers.auth;
    let authValue: boolean | undefined;

    if (typeof authHeader === 'string') {
        authValue = { 'true': true, 'false': false }[authHeader];
    } else if (Array.isArray(authHeader)) {
        authValue = { 'true': true, 'false': false }[authHeader[0]];
    }

    req.headers.auth = authValue as any; // Temporarily cast to 'any' to avoid type errors

    req.headers.userdata = JSON.parse(req.headers.userdata as string || '{}');
    req.headers.devicedata = JSON.parse(req.headers.devicedata as string || '{}');
    next();
})

// URI:     /api/rextractor/online
// Header:  auth
// Body:    -

app.use('/online', (req, res) => {
    if (req.headers.auth) {
        res.json({
            error: false,
            message: "Online!"
        })
    }
})

app.listen(8080, () => console.log(`api-rx is running`))