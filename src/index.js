const guesses = require('./constants/guesses.json');
const answers = require('./constants/answers.json');
const prompts = require('prompts');
const chalk = require('chalk');
let answer = '';

const inputOptions = {
  type: 'text',
  name: 'word',
  message: 'Enter a 5 letter word!',
  validate: (word) =>
    word.length !== 5 || (!guesses.includes(word) && !answers.includes(word))
      ? 'Please enter a 5 letter word!'
      : true,
};

async function startGame() {
  answer = answers[Math.floor(Math.random() * answers.length)].toUpperCase();
  console.clear();
  wordle(0);
}

async function wordle(tries) {
  if (tries >= 5)
    return console.log(chalk.red(`Sorry! The answer was ${answer}.`));

  const input = await prompts(inputOptions);  
  const guess = input.word.toUpperCase();

  tries++;
  check(guess);
  wordle(tries);
}

async function check(guess) {
  if (guess === answer) {
    for (let i = 0; i < guess.length; i++) {
      process.stdout.write(' ');
      process.stdout.write(chalk.bgGreen.white.bold(` ${guess[i]} `));
      process.stdout.write(' ');
    }

    process.stdout.write('\n');
    process.exit();
  }

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
