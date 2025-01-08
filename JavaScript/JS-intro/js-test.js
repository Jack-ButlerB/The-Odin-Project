// // export { sumOfTripleEvenNumbers, array1 };

// const array1 = [1, 2, 3, 4, 6];

// function sumOfTripleEvenNumbers(array) {
//   let sum = 0;
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] % 2 === 0) {
//       const tripleEvens = array[i] * 3;

//       sum += tripleEvens;
//     }
//   }
//   return sum;
// }
// console.log(sumOfTripleEvenNumbers(array1));
// const header = document.getElementById("h1");
// header.innerHTML = sumOfTripleEvenNumbers(array1);

// const player1 = {
//   name: "Jack",
//   marker: "X",
// };

// const player2 = {
//   name: "Hannah",
//   marker: "O",
// };

// function playerName(player) {
//   return player.name;
// }
// console.log(playerName(player2));

// function Player(name, marker) {
//   this.name = name;
//   this.marker = marker;
//   this.sayName = function () {
//     console.log(this.name);
//   };
// }

// const player3 = new Player("Janet", "Y");

// player3.sayName();

// function Book(title, author, nOfPages, beenRead) {
//   this.title = title;
//   this.author = author;
//   this.nOfPages = nOfPages + " pages";
//   this.beenRead = beenRead;
//   this.info = function () {
//     return (
//       this.title +
//       " by " +
//       this.author +
//       ", " +
//       this.nOfPages +
//       ", " +
//       this.beenRead
//     );
//   };
// }

// const theHobbit = new Book("The Hobbit", "J.R.R.Tolkien", 295, "not read yet");

// console.log(theHobbit.info());

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(`Hello, I'm ${this.name}!`);
};

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

// Don't do this!
// Use Object.setPrototypeOf(Player.prototype, Person.prototype)
Object.setPrototypeOf(Player.prototype, Person.prototype);
Player.prototype.sayName = function () {
  console.log("Mutation to the max!");
};

function Enemy(name) {
  this.name = name;
  this.marker = "^";
}

// Not again!
// Use Object.setPrototypeOf(Enemy.prototype, Person.prototype)
Object.setPrototypeOf(Enemy.prototype, Person.prototype);
Enemy.prototype.sayName = function () {
  console.log("HAHAHAHAHAHA");
};

const carl = new Player("carl", "X");
carl.sayName();
const badCarl = new Enemy("Bad Carl", "Y");
badCarl.sayName();
const carlNotPlaying = new Person("Normal Carl");
carlNotPlaying.sayName();

let counter = {
  count: 0,
  next: function () {
    return ++this.count;
  },
};

const header = document.getElementById("h1");
header.innerHTML = counter.next();
