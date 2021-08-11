const express = require("express")
const images = require("./images")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + "/public"))

app.get("/images", async (req, res) => {
    const filenames = (await images()).map(filename => `/images/${filename}`)
    res.json(filenames)
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`)
})