/**
 * Creates the application opening lock animation screen and title screen
 * (Created with guidance from ChatGPT)
 * Returns as a promise to make following functions wait for it's completion
 * @returns {Promise} loading aniamtion
 */
async function loadScreen() {

    return new Promise(resolve => {

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
        let imgElement = $("#lockImage");

        // Fail safe for if image element is not included
        if (!imgElement) {
            console.error("Element with ID 'lockImage' not found.");
            return;
        }

        // Creates the lock animation and ends it after one full loop
        let interval1 = setInterval(() => {
            index += direction;
            
            // Checks for the need of a reverse animation direction
            if (index >= images.length - 1 || index <= 0) {

                // Ends the animation once the reverse cycle is finished
                if ( direction < 0) {

                    // Fades out the animation image
                    imgElement.fadeOut(3000);

                    // Fades in the title screen after the animation has faded out
                    setTimeout(() => {
                        $("#openingScreen").html("<h1 id = 'openingTitle'> Locked In </h1>");
                        $("#openingTitle").fadeIn(3000);
                    }, 3000);

                    // Fades out tittle screen after 3 seconds
                    setTimeout(() => {$("#openingTitle").fadeOut(3000);}, 6000);

                    //Ends the animation
                    clearInterval(interval1);

                    setTimeout(resolve, 9000);
                }

                // Reverse direction of animation
                direction *= -1; 
            }
            
            //Updates to the current image for the animation cycle
            imgElement.attr("src", images[index]);

        }, 500); // Change image every 500ms

    }); 

}


/**
 * Returns the user's chosen name from window input and stores it in a JSON user data file.
 * Returns as a promise to make consequensive actions and functions await it's completion
 * @returns {Promise} User's name as a string
 */
async function userName() {

    // Retrieves the user's name
    let name = await window.electronAPI.getName();

    // Recieves user input for the user's name if not already save on file
    if (name == null) {
        $("#openingScreen").hide();
        $('#getUserName').fadeIn(2000);
        $('#username').click();
    }
    

}


window.onload = async function() {


    // Start animation as soon as the page loads
    let next = await loadScreen();

    let name = await userName();



        


};