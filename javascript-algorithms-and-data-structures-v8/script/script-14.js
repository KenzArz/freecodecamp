const userInput = document.getElementById("user-input");
const check = document.getElementById("check");
const resultsDiv = document.getElementById("results-div");

const checkPhoneNumber = ({ number }) => {
	if (!number) return alert("Please provide a phone number");

	const country =
		/^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?([0-9]{3})[\s-]?([0-9]{4})$/;

	const isValid = country.test(number);
	const style = isValid ? "valid" : "invalid";
	const message = `${style.replace(/([vi])/, (_match, str) =>
		str.toUpperCase()
	)}`;
	resultsDiv.innerHTML += `<p class="${style}">${message} US number: <strong>${number}</strong></p>`;
};

check.addEventListener("submit", e => {
	e.preventDefault();
	const formData = new FormData(e.target);
	checkPhoneNumber(Object.fromEntries(formData));
});

check.addEventListener("reset", () => {
	resultsDiv.innerHTML = "";
});
