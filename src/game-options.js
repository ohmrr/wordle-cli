const guesses = require('./constants/guesses.json');
const answers = require('./constants/answers.json');

module.exports = {
  type: 'text',
  name: 'word',
  message: 'Enter a 5 letter word!',
  validate: (word) =>
    word.length !== 5 || (!guesses.includes(word) && !answers.includes(word))
      ? 'Please enter a 5 letter word!'
      : true,
};
