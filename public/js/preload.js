import gsap from "https://esm.sh/gsap"

export const preload = async () => {
    const filenames = await fetch("/images").then(res => res.json())

    const preloaderElement = document.querySelector(".preloader")
    const preloaderProgress = preloaderElement.querySelector(".preloader__progress__bar")

    let loaded = 0

    const imagePromises = []

    for(const filename of filenames) {
        const image = new Image()

        imagePromises.push(new Promise((resolve, reject) => {
            image.onload = () => {
                console.log("Loaded image: " + filename)
                
                loaded++
                const percent = (loaded / filenames.length) * 100
                preloaderProgress.style.width = `${percent}%`

                if(percent == 100) {

                }

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

    gsap.to(preloaderElement, {
        autoAlpha: 0
    })
    
    return imageValues
}