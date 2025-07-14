// Contact Form - Logic Parsing Validation
document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("#contact-form");

	const nameInput = document.querySelector("#name");
	const emailInput = document.querySelector("#email");
	const phoneInput = document.querySelector("#phone");
	const messageInput = document.querySelector("#message");

	const nameError = document.querySelector("#name-error");
	const emailError = document.querySelector("#email-error");
	const phoneError = document.querySelector("#phone-error");
	const messageError = document.querySelector("#message-error");

	function clearErrors() {
		document.querySelectorAll(".error").forEach((error) => {
			error.classList.remove("show");
			error.textContent = "";
		});
		document.querySelectorAll(".input-error").forEach((input) => {
			input.classList.remove("input-error");
		});
	}
function showError(inputElem, errorElem, message) {
		errorElem.textContent = message;
		errorElem.classList.add("show");
		inputElem.classList.add("input-error");
	}

	form.addEventListener("submit", (event) => {
		event.preventDefault(); // Prevent form submission for validation

		clearErrors();
		let hasErrors = false;

		// Name
		const name = nameInput.value.trim();
        if (name === "") {
            showError(nameInput, nameError, "Name is required.");
            hasErrors = true;
        }
		const nameNoSpaces = name.split(" ").join(""); // No spaces
		if (name.toLowerCase() === "ironhack") {
			showError(nameInput, nameError, "You cannot be Ironhack, because I am Ironhack.");
			hasErrors = true;
		} else if (nameNoSpaces.length < 3) {
			showError(nameInput, nameError, "Name must have at least 3 characters (excluding spaces).");
			hasErrors = true;
		}

		// Email
		const email = emailInput.value.trim();
		if (email === "") {
			showError(emailInput, emailError, "Email is required.");
			hasErrors = true;
		} else if (!email.includes("@") || !email.includes(".")) {
			showError(emailInput, emailError, 'Email must include "@" and a dot (e.g., example@mail.com).');
			hasErrors = true;
		}

		// Phone
		const phone = phoneInput.value.trim().split(" ").join("");
		if (phone === "") {
			showError(phoneInput, phoneError, "Phone number is required.");
			hasErrors = true;
		} else if (
			phone.length < 9 ||
			String(Number(phone)).length !== phone.length ||
			isNaN(Number(phone))
		) {
			showError(phoneInput, phoneError, "Phone number must be at least 9 digits.");
			hasErrors = true;
		}

		// Message
		const message = messageInput.value.trim();
		if (message === "") {
			showError(messageInput, messageError, "Message is required.");
			hasErrors = true;
		} else if (message.length < 50) {
			showError(messageInput, messageError, "Message must be at least 50 characters.");
			hasErrors = true;
		} else if (message.length > 500) {
			showError(messageInput, messageError, "Message must be no longer than 500 characters.");
			hasErrors = true;
		}

		// If no errors, submit the form
		if (!hasErrors) {
			alert("Message sent successfully!");
			form.reset(); // Reset form
		} else {
			alert("Please fix the errors before submitting.");
		}
	});
});