const answers = require('./constants/answers.json');
const chalk = require('chalk');
const prompts = require('prompts');

let answer = '';
let result = '';
let tries = 0;

async function main() {
  answer = answers[Math.floor(Math.random() * answers.length)].toUpperCase();

  await wordle();
}

async function wordle() {
  if (tries > 5) {
    result += '\nWordle-CLI X/6';
    console.log(chalk.bgWhite.black.bold(` ${answer} \n`));
    console.log(result);
    return;
  }

  const input = await prompts(require('./game-options'));
  const guess = input.word.toUpperCase();

  tries++;
  check(guess);
  await wordle();
}

async function check(guess) {
  if (guess === answer) {
    for (let i = 0; i < guess.length; i++) {
      process.stdout.write(chalk.bgGreen.white.bold(` ${guess[i]} \t`));
    }

    result += `🟩🟩🟩🟩🟩\n\nWordle-CLI ${tries}/6\n`;
    console.log(result);

    process.exit();
  }

  for (let i = 0; i < guess.length; i++) {
    if (answer[i] === guess[i]) {
      process.stdout.write(chalk.bgGreen.white.bold(` ${guess[i]} \t`));
      result += '🟩';
      continue;
    }

    if (answer.includes(guess[i])) {
      process.stdout.write(chalk.bgYellow.white.bold(` ${guess[i]} \t`));
      result += '🟨';
      continue;
    }

    process.stdout.write(chalk.bgGray.white.bold(` ${guess[i]} \t`));
    result += '⬛';
  }

  result += '\n';
  console.log('\n');
}

main();
