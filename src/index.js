const prompts = require('prompts');
const chalk = require('chalk');
const words = require('./constants/words.json');

const gamePrompt = {
  type: 'text',
  name: 'word',
  message: 'Enter a 5 letter word to guess:',
  validate: word => word.length != 5 ? 'Please enter a 5 letter word.' : true
}

function main() {
  const wordle = words[Math.floor(Math.random() * words.length)];
  const guess = prompts(gamePrompt);


}

function check(guess) {

}