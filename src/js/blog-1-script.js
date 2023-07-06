// single element
const form = document.getElementsByClassName("user-info");
console.log(form);

const firstHeading = document.querySelector("h1");
console.log(firstHeading);

// multi element
// This will select all elements under container class
// Recommended to use query selector
const multiContainers = document.querySelectorAll(".container");
console.log(multiContainers);

const multiItems = document.querySelectorAll("li");
console.log(multiItems);

// firstHeading.remove();
// multiItems.lastElementChild.remove();
// multiItems[0].textContent = 'HOME SWEET HOME';

const button = document.querySelector(".button");
// console.log(button);
// button.style.background = 'red';

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const warningMessage = document.querySelector(".msg");
const userList = document.querySelector(".user-list");

// button.addEventListener('click',(e)=>{
// e.preventDefault(); // This one is to prevent click to display ephemerally
// document.querySelector('.user-info').style.background = '#96a0a0';
// document.querySelector('body').classList.add('bg-white');
// })

button.addEventListener("click", onSubmit);

function onSubmit(e) {
  // e.preventDefault();
  if (nameInput.value === "" || emailInput.value === "") {
    warningMessage.classList.add("warning");
    warningMessage.innerHTML = "Please enter a name and email";
    // message appear after 3 seconds
    setTimeout(() => warningMessage.remove(), 3000);
  } else {
    console.log(`name: ${nameInput.value} email:${emailInput.value}`);
    // console.log(userList);
    const li = document.createElement("li");
    li.appendChild(
      document.createTextNode(
        `${nameInput.value} -- ${emailInput.value}`
      )
    );

    userList.appendChild(li);
    nameInput.value = "";
    emailInput.value = "";
  }
}
