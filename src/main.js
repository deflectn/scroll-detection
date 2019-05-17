const sections = document.getElementsByClassName('section')
const scrollContainer = document.getElementById('scroll-container')
const elevator = document.getElementById('elevator')

let index = 0
let lastTime = Date.now() // Windows & Linux
let smoothBlocker = { // macOS
	lastTime: Date.now(),
	enabled: false
}

window.addEventListener('wheel', e => {
	let time = Date.now()
	if ((time - lastTime) > 400 && !smoothBlocker.enabled) { // TODO for smooth scroll higher value
		lastTime = time
		if (e.deltaY < 0 && index > 0) index--
		if (e.deltaY > 0 && index < (sections.length - 1)) index++
		setSection()
    }
	smoothBlocker.enabled = ((time - smoothBlocker.lastTime) > 9) 
    smoothBlocker.enabled && (smoothBlocker.lastTime = time)
	console.log(smoothBlocker.enabled)
})

elevator.max = sections.length - 1
elevator.min = 0
elevator.step = 1
elevator.oninput = (e) => {
	index = e.target.value
	setSection()
}

function setSection() {
	scrollContainer.style.cssText = `transform: translate(0px, -${index * 100}vh)`
	elevator.value = index
}