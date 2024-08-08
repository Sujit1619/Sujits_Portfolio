
// Ensure EmailJS SDK is loaded
emailjs.init("tgWVTLBJ-m6Hhsdji"); // Replace with your actual EmailJS public key
var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }
// Function to validate and send the form data
// Attach the validateAccess function to the form submission
document.getElementById("access-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    validateAccess(); // Call the validation function
});

function validateAccess(event) {
    var email = document.getElementById("email").value;
    var organisation = document.getElementById("organisation").value;
    var role = document.getElementById("role").value;
    var message = document.getElementById("message");
    
    if (email && organisation && role) {
        // Perform email validation using HTML5
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailPattern.test(email)) {
           
            // Send email using EmailJS
            emailjs.send("service_wcvwmdq", "template_5h8v9ov", {
                email: email,
                organisation: organisation,
                role: role
            })
                .then(function (response) {
                    alert("Thank you for registering! We will reach out to you soon. Click OK to explore my professional showcase");
                        window.location.href = "../indexx.html";
                    console.log("SUCCESS!", response.status, response.text);
                    localStorage.setItem('formSubmitted', 'true');
                    
                    // message.style.color = "green";
                    document.getElementById("access-form").reset();
                    
                    // Redirect to another page after successful submission
                    // window.location.href = "../indexx.html";
                }, function (error) {
                    console.log("FAILED...", error);
                    message.textContent = "Failed to send the email. Please try again later.";
                    message.style.color = "red";
                });
        } else {
            message.textContent = "Please enter a valid email address.";
            message.style.color = "red";
        }
    } else {
        message.textContent = "All fields are required.";
        message.style.color = "red";
    }
    // document.body.classList.add('blurred');
    // localStorage.setItem("email1", email)
    // localStorage.setItem("organisation1", organisation)
    // localStorage.setItem("role1", role)
}


// Animation and text morphing
const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Explore",
    "a",
    "world",
    "of",
    "innovation",
    "and",
    "expertise",
    "in",
    "my",
    "portfolio,",
    "driving",
    "transformative",
    "success."
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    // Apply blur and opacity to text elements
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

// Start the animation.
animate();

