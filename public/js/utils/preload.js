import gsap from "https://esm.sh/gsap"

// preload images in /images directory
export const preload = async () => {
    const filenames = await fetch("/images").then(res => res.json())

    // select prelader element
    const preloaderElement = document.querySelector(".preloader")
    const preloaderProgress = preloaderElement.querySelector(".preloader__progress__bar")

    const imagePromises = []
    let loaded = 0

    // create image promises
    for(const filename of filenames) {
        const image = new Image()

        imagePromises.push(new Promise((resolve, reject) => {
            image.onload = () => {
                console.log("Loaded image: " + filename)
                
                // update preloader progress
                loaded++
                const percent = (loaded / filenames.length) * 100
                preloaderProgress.style.width = `${percent}%`

                resolve(image)
            }

            image.onerror = () => {
                console.log("Failed to load image: " + filename)
                reject(image)
            }
            
            image.src = filename
            image.alt = "FFA image: " + filename
        }))
    }

    const imageValues = await Promise.all(imagePromises)

    // fade out preloader element
    gsap.to(preloaderElement, {
        autoAlpha: 0
    })

    return imageValues
}