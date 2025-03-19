/**
 * Creates the application opening lock animation screen and title screen
 * (Created with guidance from ChatGPT)
 * @returns null
 */
function loadScreen() {

    // List of image paths used for the opening lock animation on the opening screen
    const images = [
        "../images/1.png",
        "../images/2.png",
        "../images/3.png",
        "../images/4.png",
        "../images/5.png"
    ];

    // Keep track of the current image of the animation
    let index = 0;
    // 1 for forward, -1 for reverse
    let direction = 1;

    // Selects the image element to use for animation
    let imgElement = document.getElementById("lockImage");

    // Fail safe for if image element is not included
    if (!imgElement) {
        console.error("Element with ID 'lockImage' not found.");
        return;
    }

    // Creates the lock animation and ends it after one full loop
    let interval = setInterval(() => {
        index += direction;
        
        // Checks for the need of a reverse animation direction
        if (index >= images.length - 1 || index <= 0) {

            // Ends the animation once the reverse cycle is finished
            if ( direction < 0) {
                clearInterval(interval);
            }

            // Reverse direction of animation
            direction *= -1; 
        }
        
        imgElement.src = images[index];
    }, 500); // Change image every 500ms
}
    // Start animation as soon as the page loads
window.onload = loadScreen;