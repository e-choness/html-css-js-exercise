const name = "Jon";
const age = 35;
const message = `My name is ${name} and my age is ${age}.`;

console.log(message);
console.log(`message length is: ${message.length}.`);
console.log(message.split(" "));

// Arrays
const number = new Array(1, 2, 3, 4, 5);
console.log(number);

const pets = ["Cat", "Dog", "Hamster"];
console.log(pets);

pets[3] = "Goldfish";
console.log(pets);

pets.push("Songbird");
console.log(pets);

const last_pet = pets.pop();
console.log(last_pet);
console.log(pets);

console.log(Array.isArray(pets));
console.log(Array.isArray(last_pet));
console.log(pets.indexOf(last_pet));
console.log(pets.includes(last_pet));

// objects
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  hobbies: ["Game", "Coding"],
  address: {
    street: "0451 Mountain Rd",
    city: "Mars City",
    state: "MS",
  },
};

console.log(person);
person.email = "jdoe@gamil.com";
console.log(person);
console.log(person.email);

const mailList = [
  {
    id: 1,
    address: "123 St",
    isSent: true,
  },
  {
    id: 2,
    address: "246 St",
    isSent: true,
  },
  {
    id: 3,
    address: "789 St",
    isSent: false,
  },
];

console.log(mailList);

const todoJSON = JSON.stringify(mailList);
console.log(todoJSON);

// for loop
mailList.forEach((element) => {
  console.log(`Mail address: ${element.address}`);
});

// filter and mapping
const mailSentAddresses = mailList
  .filter(function (mailList) {
    return mailList.isSent === true;
  })
  .map(function (mailList) {
    return mailList.address;
  });

console.log(mailSentAddresses);

// conditionals
const x = "10";
if (x === 10) {
  console.log("x is 10.");
} else {
  console.log("x is not 10 or the data type is not the same.");
}

const color = x > 10 ? "red" : "green";
console.log(color);

switch (x) {
  case 10:
    console.log("x is 10.");
    break;
  case "10":
    console.log("x is string 10.");
    break;
  default:
    console.log("x is neither 10 or string 10.");
};

// functions
function addNums(n1, n2){
    console.log(`The sum of ${n1} and ${n2} is ${n1+n2}.`);
}

addNums(1,34);

const addNumsLambda = (n1 = 1, n2 = 2) => n1 + n2;
console.log(addNumsLambda(2,3));

// Object-Oriented Programming
// This is constructor function
function Person(firstName, lastName, dateOfBirth){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = new Date(dateOfBirth);
}

Person.prototype.GetBirthYear = function(){
    return this.dateOfBirth.getFullYear();
}

Person.prototype.GetFullName = function(){
    return `${this.firstName} ${this.lastName}`;
}

const person1 = new Person("Jon", "Gill", "02-08-1988");
const person2 = new Person("Juan", "Montee", "07-09-1970");

console.log(person1.GetFullName(), person1.GetBirthYear());

class MailInfo{
    constructor(userId, address, email){
        this.userId = userId;
        this.address = address;
        this.email = email;
    }

    getAddressAndEmaail(){
        return `The address of ${this.userId} is ${this.address} and the email is ${this.email}`;
    }
}

const mailInfo = new MailInfo(1, "708 Saint Johnson Rd", "jgill@gmail.com");

console.log(mailInfo.getAddressAndEmaail());