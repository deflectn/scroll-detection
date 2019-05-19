const sections = document.getElementsByClassName('section');
const scrollContainer = document.getElementById('scroll-container');
const scrollElement = document.getElementById('scroll-element');

let index = 0;
let lastTime = Date.now();
let smoothScrollBlocker = { 
    lastTime: Date.now(),
    lastDelta: 0,
    enabled: false
};

// TODO rewrite for component usage not whole site
scrollContainer.addEventListener('wheel', e => {

    let time = Date.now();

    // !smoothBlocker.enabled && console.log(smoothBlocker.enabled, 
    //     (time - smoothBlocker.lastTime), 
    //     Math.abs(e.deltaY), 
    //     Math.abs(smoothBlocker.lastDelta - e.deltaY))

	if ((time - lastTime) > 350 && !smoothScrollBlocker.enabled) {
        lastTime = time;
        if (e.deltaY < 0 && index > 0) index--;
        if (e.deltaY > 0 && index < (sections.length - 1)) index++;
        
        setSection() // desired onscroll event

    }
    
    smoothScrollBlocker.enabled = (
        (time - smoothScrollBlocker.lastTime) < 349 && 
        Math.abs(smoothScrollBlocker.lastDelta - e.deltaY) < 40 && 
        e.deltaMode == 0
        )
    smoothScrollBlocker.lastTime = time;
    smoothScrollBlocker.lastDelta = e.deltaY;
	
});


// preview stuff

const elevator = document.getElementById('elevator');
elevator.max = sections.length - 1;
elevator.min = 0;
elevator.step = 1;
elevator.oninput = (e) => {
	index = e.target.value;
	setSection();
}

function setSection() {
    let moveBy = parseFloat(window.getComputedStyle(scrollContainer).getPropertyValue("height")); // for elements on site not full page
    
	scrollElement.style.cssText = `transform: translate(0px, ${0 - (index * moveBy)}px)`;
	elevator.value = index;
}

let touchStartY = 0;
let touchEndY = 0;

scrollContainer.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].screenY;
});

scrollContainer.addEventListener('touchmove', e => {
    e.stopPropagation()
    e.preventDefault()
    touchEndY = e.touches[0].screenY;
});

scrollContainer.addEventListener('touchend', e => {
    let delta = touchStartY - touchEndY
    if (delta < 0 && index > 0) index--;
    if (delta > 0 && index < (sections.length - 1)) index++;
    setSection();
});