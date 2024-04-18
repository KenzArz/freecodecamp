const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

const palindromeCheck = () => {
  if (textInput.value === "") return alert("Please input a value");

  const str = textInput.value.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
  const isPalindrome = str.split("").reverse().join("") === str;
  const palindrome = `<strong>${textInput.value}</strong> ${
    isPalindrome ? "is" : "is not"
  } a Palindrome`;

  result.innerHTML = `<p id="result-text">${palindrome}</p>`;
  textInput.value = "";
};

checkButton.addEventListener("click", palindromeCheck);
textInput.addEventListener("keydown", (e) =>
  e.key === "Enter" ? palindromeCheck() : ""
);
