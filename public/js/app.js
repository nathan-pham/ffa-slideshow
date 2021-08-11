import {preload} from "./utils/preload.js"
import {shuffle} from "./utils/shuffle.js"

import Sketch from "./classes/Sketch.js"
import Plane from "./classes/objects/Plane.js"

const sketch = new Sketch({container: "#webgl__container"})

sketch.add(new Plane())
sketch.render()

let speed = 0, position = 0, rounded = 0
let block = document.getElementById("block")

let grid = document.getElementById("grid")
let gridItems = [...grid.querySelectorAll("div")]

gridItems.forEach((element) => {
    element.dataset.distance = 0
})

window.addEventListener("wheel", e => {
    speed += e.deltaY * 0.0003
})

const render = () => {
    position += speed
    speed *= 0.8

    gridItems.forEach((element, i) => {
        element.dataset.distance = Math.min(Math.abs(position - i), 1)
        element.dataset.distance = 1 - element.dataset.distance ** 2
        element.style.transform = `scale(${1 + 0.4 * element.dataset.distance})`
    })

    rounded = Math.round(position)
    let diff = rounded - position
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015

    // block.style.transform = `translateY(${position * 100 + 50}px)`
    grid.style.transform = `translateY(${-position * 100 + 50}px)`

    window.requestAnimationFrame(render)
}

render()

// const main = (async () => {
//     const images = shuffle(await preload())
// })()