const prompts = require('prompts');
const chalk = require('chalk');
const words = require('./constants/words.json');
let answer = '';

const inputOptions = {
  type: 'text',
  name: 'word',
  message: 'Enter a 5 letter word!',
  validate: (word) =>
    word.length !== 5 || !words.includes(word)
      ? 'Please enter a valid 5 letter word!'
      : true,
};

async function startGame() {
  answer = words[Math.floor(Math.random() * words.length)].toUpperCase();

  wordle(0);
}

async function wordle(tries) {
  if (tries >= 5) {
    return console.log(chalk.red(`Sorry! The answer was ${answer}.`));
  }

  const input = await prompts(inputOptions);
  const guess = input.word.toUpperCase();

  if (guess === answer) {
    return console.log(chalk.green(`You got it! The answer was ${answer}.`));
  } else {
    tries++;
    check(guess);
    wordle(tries);
  }
}

async function check(guess) {
  for (let i = 0; i < guess.length; i++) {
    if (answer[i] === guess[i]) {
      process.stdout.write(' ');
      process.stdout.write(chalk.bgGreen.white.bold(` ${guess[i]} `));
      process.stdout.write(' ');
      continue;
    }

    if (answer.includes(guess[i])) {
      process.stdout.write(' ');
      process.stdout.write(chalk.bgYellow.white.bold(` ${guess[i]} `));
      process.stdout.write(' ');
      continue;
    }

    process.stdout.write(' ');
    process.stdout.write(chalk.bgGray.white.bold(` ${guess[i]} `));
    process.stdout.write(' ');
  }

  console.log('\n');
}

startGame();
