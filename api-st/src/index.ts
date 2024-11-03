// \\\\\\\\\\ Import / Export ////////// \\

import express from 'express'

const app = express()
app.use(express.json())

app.get('/online', (req, res) => {
    res.json({
        error: false,
        message: "Online!"
    })
})

app.listen(8080, () => console.log(`api is running`))