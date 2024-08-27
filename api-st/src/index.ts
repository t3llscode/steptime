// \\\\\\\\\\ Import / Export ////////// \\

import express from 'express'

import { prismaRoutes } from './t3_modules/prismaRoutes'

const app = express()
app.use(express.json())

app.get('/online', (req, res) => {
    res.json({
        error: false,
        message: "Online!"
    })
})

app.use(prismaRoutes)

app.listen(8080, () => console.log(`api-st is running`))