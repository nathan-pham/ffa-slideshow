import gsap from "https://esm.sh/gsap"

import {preload} from "./utils/preload.js"
import {shuffle} from "./utils/shuffle.js"
import {sleep} from "./utils/sleep.js"

const transition = async (image) => {
    const shared = {duration: 0.6, ease: "easeOutExpo"}
    const types = ["slide-x", "scale", "opacity"]
    const type = types[Math.floor(Math.random() * types.length)]

    switch(type) {
        case "slide-x":
        case "slide-y": {
            const key = type.split('-').pop()
            const unit = key === "x" ? "vw" : "vh"

            gsap.from(image, {[key]: `-100${unit}`, opacity: 0, ...shared})
            await sleep(4000)

            gsap.to(image, {[key]: `100${unit}`, opacity: 0, onComplete: () => {image.remove()}, ...shared})
            await sleep(1000)
            break
        }

        case "scale": {
            let key = image.width > image.height ? "scaleX" : "scaleY"

            gsap.from(image, {[key]: 0, opacity: 0, ...shared})
            await sleep(4000)

            gsap.to(image, {[key]: 0, opacity: 0, onComplete: () => {image.remove()}, ...shared})
            await sleep(1000)
            break
        }

        case "opacity":
        default: {
            gsap.from(image, {opacity: 0, ...shared})
            await sleep(4000)
        
            gsap.to(image, {autoAlpha: 0, onComplete: () => {image.remove()}, ...shared})
            await sleep(1000)
            break
        }
    }
}

const main = (async () => {
    const container = document.querySelector(".image__container")
    const deck = shuffle(await preload())

    let previous = null

    while(true) {
        const image = deck[Math.floor(Math.random() * deck.length)]
        const clone = image.cloneNode(true)

        if(image == previous) {
            continue
        }

        container.appendChild(clone)

        await transition(clone)

        previous = image
    }
})()