
import {preload} from "./utils/preload.js"
import {shuffle} from "./utils/shuffle.js"

const main = async () => {
    const images = shuffle(await preload())
    
}

main()