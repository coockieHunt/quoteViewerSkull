function followMouse(element, options = {}) {
    const {
        invert = false,
        rotationConfig = {min: 60, max: -30, neutral: 40},
        animateSmoothly = 0.1
    } = options;


    let targetRotation = rotationConfig.neutral;

    function handleMove(y) {
        const windowHeight = window.innerHeight;
        const relativeY = y / windowHeight;

        const rotation = rotationConfig.min + (rotationConfig.max - rotationConfig.min) * relativeY;

        const rotateY = invert ? 'rotateY(180deg) ' : '';
        function lerp(start, end, t) {
            return start + (end - start) * t;
        }

        targetRotation = lerp(targetRotation, rotation, animateSmoothly);
        
        element.style.transform = `
            ${rotateY} 
            rotateZ(${targetRotation.toFixed(2)}deg)
        `;
    }

    function onMouseMove(event) {
        handleMove(event.clientY);
    }

    function onTouchMove(event) {
        if (event.touches && event.touches.length > 0) {
            handleMove(event.touches[0].clientY);
        }
    }

    function onTouchStart(event) {
        if (event.touches && event.touches.length > 0) {
            handleMove(event.touches[0].clientY);
        }
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchstart', onTouchStart);
}

export default followMouse;