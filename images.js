const fs = require("fs")

module.exports = async () => {
    const path = __dirname + "/public/images"

    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) return reject(err)
            resolve(files)
        })
    })
}