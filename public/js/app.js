import gsap from "https://esm.sh/gsap"

import {preload} from "./utils/preload.js"
import {shuffle} from "./utils/shuffle.js"
import {sleep} from "./utils/sleep.js"

const main = (async () => {
    const grid = document.querySelector(".masonry")
    const deck = shuffle(await preload())

    while(true) {
        const image = deck[Math.floor(Math.random() * deck.length)]
        const clone = image.cloneNode(true)

        grid.appendChild(clone)

        gsap.fromTo(clone, {opacity: 0}, {opacity: 1, duration: 0.5, ease: "easeOut"})

        await sleep(2000)

        gsap.to(clone, {opacity: 0, duration: 0.5, ease: "easeOut", onComplete: () => {clone.remove()}})
        
        await sleep(500)
    }
})()