
/* Welcome message for Baked by B */

/* Show the welcome message only on the Home page */

window.addEventListener("load", function() {

    if (
        window.location.pathname.endsWith("/index.html") ||
        window.location.pathname.endsWith("/")
    ) {
        alert("Welcome to Baked by K! We are happy to have you here.");
    }

});


/* Validate the custom order form */
document.addEventListener("DOMContentLoaded", function () {

    const orderForm = document.getElementById("orderForm");

    // Only run this code on the page with the order form
    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            const phone = orderForm.elements["phone"].value.trim();
            const eventDate = orderForm.elements["eventDate"].value;
            const message = document.getElementById("formMessage");

            // Clear the previous message
            message.textContent = "";
            message.style.color = "red";

            // Check that the phone number contains 10 digits
            if (!/^\d{10}$/.test(phone)) {
                event.preventDefault();
                message.textContent =
                    "Please enter a valid 10-digit phone number.";
                return;
            }

            // Check that the event date is not in the past
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (eventDate && new Date(eventDate + "T00:00:00") < today) {
                event.preventDefault();
                message.textContent =
                    "Please choose today or a future event date.";
                return;
            }

            // Show booking request confirmation
event.preventDefault();
message.style.color = "green";
message.textContent =
    "Thank you for choosing Baked by K! Your booking request has been received. We will contact you soon to confirm your order.";

        });
    }
});


// Product search feature
document.addEventListener("DOMContentLoaded", function () {

    const searchBox = document.getElementById("productSearch");

    // Only run this feature on the products page
    if (searchBox) {

        const categories = [
            document.getElementById("birthdayCakes"),
            document.getElementById("cupcakes"),
            document.getElementById("cookies"),
            document.getElementById("otherDesserts")
        ];

        const message = document.getElementById("searchMessage");

        searchBox.addEventListener("input", function () {

            const searchText = searchBox.value.toLowerCase().trim();
            let found = false;

            categories.forEach(function (heading) {

                const section = heading.parentElement;
                let showSection = searchText === "" ||
                    heading.textContent.toLowerCase().includes(searchText);

                // Include the matching section's description and images
                let nextElement = heading.nextElementSibling;

                while (nextElement && nextElement.tagName !== "H2") {
                    if (showSection) {
                        nextElement.style.display = "";
                    } else {
                        nextElement.style.display = "none";
                    }
                    nextElement = nextElement.nextElementSibling;
                }

                heading.style.display = showSection ? "" : "none";

                if (showSection) {
                    found = true;
                }
            });

            if (searchText === "") {
                message.textContent = "";
            } else if (found) {
                message.textContent = "Matching products are shown below.";
            } else {
                message.textContent = "No matching products found. Try cakes, cupcakes, cookies or desserts.";
            }
        });
    }
});


// Show or hide weekly offers
document.addEventListener("DOMContentLoaded", function () {

    const offersButton = document.getElementById("offersButton");
    const weeklyOffers = document.getElementById("weeklyOffers");

    if (offersButton && weeklyOffers) {

        offersButton.addEventListener("click", function () {

            if (weeklyOffers.style.display === "none") {
                weeklyOffers.style.display = "block";
                offersButton.textContent = "🎀 Hide Weekly Offers";
            } else {
                weeklyOffers.style.display = "none";
                offersButton.textContent = "🧁 Show Weekly Offers";
            }

        });
    }
});


/* Validate the contact form */
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    // Only run this code on the contact page
    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            const phone = document.getElementById("contactPhone").value.trim();
            const message = document.getElementById("contactFormMessage");

            // Clear the previous message
            message.textContent = "";
            message.style.color = "red";

            // Check that the phone number contains 10 digits
            const phoneDigits = phone.replace(/\D/g, "");

            if (phoneDigits.length !== 10) {
                event.preventDefault();
                message.textContent =
                    "Please enter a valid phone number with 10 digits.";
                return;
            }

        
        
// Prepare an email with the customer's details
event.preventDefault();

const name = document.getElementById("contactName").value.trim();
const email = document.getElementById("contactEmail").value.trim();
const customerMessage = document.getElementById("contactMessage").value.trim();

const subject = encodeURIComponent("Message from Baked by K website");
const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\nPhone: " + phone +
    "\n\nMessage:\n" + customerMessage
);

// Open the customer's email app with the details filled in
window.location.href =
    "mailto:bakedbyK@gmail.com?subject=" + subject + "&body=" + body;
    
        });
    }
});

/* Calculate the estimated preparation time for custom orders */
document.addEventListener("DOMContentLoaded", function () {

    const orderForm = document.getElementById("orderForm");
    const eventDateInput = document.querySelector(
        '#orderForm input[name="eventDate"]'
    );
    const etaMessage = document.getElementById("etaMessage");

    // Only run this feature on the custom orders page
    if (orderForm && eventDateInput && etaMessage) {

        eventDateInput.addEventListener("change", function () {

            if (!eventDateInput.value) {
                etaMessage.textContent = "";
                return;
            }

            const eventDate = new Date(
                eventDateInput.value + "T00:00:00"
            );

            const earliestOrderDate = new Date(eventDate);
            earliestOrderDate.setDate(
                earliestOrderDate.getDate() - 7
            );

            const latestOrderDate = new Date(eventDate);
            latestOrderDate.setDate(
                latestOrderDate.getDate() - 5
            );

            etaMessage.style.color = "brown";
            etaMessage.textContent =
                "Preparation reminder: Please place your order between " +
                earliestOrderDate.toLocaleDateString() +
                " and " +
                latestOrderDate.toLocaleDateString() +
                ". This is a suggested ordering period, not a confirmed collection or delivery time.";
        });
    }
});


/* Baked by K Chatbot */

document.addEventListener("DOMContentLoaded", function () {

    const chatButton = document.getElementById("chatButton");
    const chatWindow = document.getElementById("chatWindow");
    const closeChat = document.getElementById("closeChat");
    const chatMessages = document.getElementById("chatMessages");
    const chatQuestions = document.querySelectorAll(".chatQuestion");

    // Open the chatbot
    if (chatButton && chatWindow) {

        chatButton.addEventListener("click", function () {
            chatWindow.style.display = "block";
            chatButton.style.display = "none";
        });

        // Close the chatbot
        closeChat.addEventListener("click", function () {
            chatWindow.style.display = "none";
            chatButton.style.display = "block";
        });

        // Answer customer questions
        chatQuestions.forEach(function (question) {

            question.addEventListener("click", function () {

                const selectedQuestion = question.textContent;
                let answer = "";

                if (selectedQuestion === "What cakes do you offer?") {
                    answer = "We offer birthday cakes, cupcakes, cookies and other delicious desserts!";
                }

                else if (selectedQuestion === "How do I place an order?") {
                    answer = "Visit our Custom Orders page and complete the order form. We will contact you soon!";
                }

                else if (selectedQuestion === "How much do your cakes cost?") {
                    answer = "Our prices depend on the cake size, design and decorations. Please contact us for a quote.";
                }

                else if (selectedQuestion === "How far in advance should I order?") {
                    answer = "We recommend placing your order 5 to 7 days before your event.";
                }

                chatMessages.innerHTML +=
                    "<p><strong>You:</strong> " + selectedQuestion + "</p>";

                chatMessages.innerHTML +=
                    "<p><strong>Baked by K:</strong> " + answer + "</p>";

            });

        });
    }

});

/* Product Image Gallery Lightbox */

document.addEventListener("DOMContentLoaded", function () {

const productImages = document.querySelectorAll(
    ".products-page img, .offers-page img, main img"
); 

    const imageLightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    // Only run this feature on the products page
    if (imageLightbox && lightboxImage && closeLightbox) {

        // Open enlarged image when a product picture is clicked
        productImages.forEach(function (image) {

            image.style.cursor = "pointer";

            image.addEventListener("click", function () {

                imageLightbox.style.display = "flex";
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

            });

        });

        // Close the enlarged image
        closeLightbox.addEventListener("click", function () {
            imageLightbox.style.display = "none";
        });

        // Close when clicking outside the image
        imageLightbox.addEventListener("click", function (event) {

            if (event.target === imageLightbox) {
                imageLightbox.style.display = "none";
            }

        });

    }

});