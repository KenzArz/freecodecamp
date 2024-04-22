const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const convertToRomanNumeral = () => {
  let numberInput = parseInt(number.value);
  const isNotPass = validate(numberInput);
  if (isNotPass)
    return (output.innerHTML = `<p id="output-text">${isNotPass}</p>`);

  const numerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let result = "";
  for (const obj in numerals) {
    while (numberInput >= numerals[obj]) {
      result += obj;
      numberInput -= numerals[obj];
    }
  }
  output.innerHTML = `<p id="output-text"><strong>${result}</strong></p>`;
  number.value = "";
};

const validate = (number) => {
  if (!/[\d]+/.test(number)) return "Please enter a valid number";
  else if (number < 1)
    return "Please enter a number greater than or equal to 1";
  else if (number >= 4000)
    return "Please enter a number less than or equal to 3999";
};

convertBtn.addEventListener("click", convertToRomanNumeral);
number.addEventListener("keydown", (e) => {
  if (e.key === "Enter") return convertToRomanNumeral();
});
