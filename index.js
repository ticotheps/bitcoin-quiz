// This global variable represents the index of the current quiz
// question being displayed to the user.
let viewedQuestionNum = 0;

// This global variable represents the number of questions the
// the user has answered correctly thus far.
let scoreCorrect = 0;

// This global variable represents the number of questions the
// the user has answered incorrectly thus far.
let scoreIncorrect = 0;

// This global variable holds an array of objects, containing
// the quiz's questions, the possible answer choices for each
// question, and the correct answer for each question.
let bitcoinQuiz = [
  {
    question: `What is Bitcoin?`,
    choices: [
      `A highly-centralized, peer-to-peer digital crypto-currency`,
      `A highly-decentralized, peer-to-peer digital crypto-currency`,
      `A highly-centralized, government-controlled crypto-currency`,
      `A highly-decentralized, video game-based crypto-currency`,
      `None of the above`,
    ],
    correct: 1,
  },
  {
    question: `Who is the alleged, pseudonymous inventor of Bitcoin, first proposing the electronic payment system back in 2008?`,
    choices: [
      `Wei Dai`,
      `Dr. Craig S. Wright`,
      `Nick Szabo`,
      `Satoshi Nakamoto`,
      `All of the above`,
    ],
    correct: 3,
  },
  {
    question: `When was the Bitcoin open-source software first released?`,
    choices: [`2008`, `2009`, `2010`, `2011`, `None of the above`],
    correct: 1,
  },
  {
    question: `What is the total number of Bitcoins that can be created and/or exist?`,
    choices: [
      `21 million`,
      `84 million`,
      `168 million`,
      `There is no limit on how many Bitcoins can exist or be created`,
      `None of the above`,
    ],
    correct: 0,
  },
  {
    question: `Who is permitted to contribute to Bitcoin’s open-source software?`,
    choices: [
      `Only government-contracted computer engineers`,
      `Only senior-level software developers`,
      `Bitcoin-Engineering Certification holders`,
      `Anyone with an internet-connected device can contribute`,
      `All of the above`,
    ],
    correct: 4,
  },
  {
    question: `How is Bitcoin currently being used?`,
    choices: [
      `Means of exchange - i.e. Small and large retailers, such as www.overstock.com, have begun accepting Bitcoin as a form of payment for goods and services.`,
      `Store of value - i.e. Some individuals feel more comfortable storing their wealth on Bitcoin’s immutable public ledger versus in bank accounts, where centralized authorities cannot block access or demand fees.`,
      `Remittance - i.e. Immigrants who travel to other countries for work prefer to use Bitcoin as a fast, efficient, and inexpensive way to transfer money back to relatives in their home country.`,
      `Speculation - i.e. People often purchase Bitcoin on cryptocurrency exchanges, such as Coinbase, at low prices and sell it at higher prices to make a profit.`,
      `All of the above`,
    ],
    correct: 4,
  },
  {
    question: `Which of the following is the proper name for the smallest division of a Bitcoin (one-hundred millionth of a Bitcoin)?`,
    choices: [
      `a “milliBit”`,
      `a “Satoshi”`,
      `a “deciBit”`,
      `a “centiBit”`,
      `All of the above`,
    ],
    correct: 1,
  },
  {
    question: `Which of the following is the widely-accepted abbreviation for Bitcoin on digital currency exchanges today?`,
    choices: [`BCN`, `BCH`, `BTC`, `XBT`, `BTC & XBT`],
    correct: 4,
  },
  {
    question: `Bitcoin is well-known for its high-volatility. Which of the following were Bitcoin’s prices on 01/01/17 & on 12/31/17, respectively?`,
    choices: [
      `$1,004.12  &  $19,351.20`,
      `$1,004.12  &  $14,122.30`,
      `$1,004.12  &  $21,193.25`,
      `$1,004.12  &  $2,524.24`,
      `None of the above`,
    ],
    correct: 1,
  },
  {
    question: `What is an example of a cold storage wallet for Bitcoin?`,
    choices: [
      `GDAX’s online, cloud-based wallet app, accessed from a desktop computer`,
      `Ledger’s Nano S, cryptocurrency hardware wallet`,
      `Ethos’ universal cryptocurrency wallet app, accessed on a mobile device`,
      `All of the above`,
      `None of the above`,
    ],
    correct: 1,
  },
];

// This event listener confirms when our web page has
// successfully completed it's initial rendering.
$(document).ready(function() {
  console.log('The page has completed its inital load.');

  // This hides all children elements in the <main> that are not
  // of the class 'intial-load'.
  $('main > :not(.initial-load)').hide();

  // This listens for any clicks on the 'Start Quiz' button,
  // which will trigger the startQuiz() function.
  $('.start-page').on('click', '.quiz-start', function(event) {
    console.log("The 'Start Quiz' button was clicked!");
    startQuiz();
  });

  // This listens for any clicks on the 'Watch Video' button
  // and allows the user to view a YouTube video on 'How Bitcoin Works
  // in 5 minutes'.
  $('.start-page').on('click', '.watch-video', function(event) {
    console.log("The 'Learn About Bitcoin' button was clicked!");

    // This opens the 'What is Bitcoin?' video in the user's
    // browser window, within a new tab.
    window.open('https://www.youtube.com/watch?v=gi_AbgkCYfc');
  });

  // This listens for any clicks on the "Submit" button,
  // which will trigger a series of callback functions to display
  // some feedback for the user regarding their answer choice.
  $('form.quiz').on('click', 'button[type=submit]', function(event) {
    console.log("The 'Submit' button was clicked!");

    // This prevents the default submission behavior of the form.
    event.preventDefault();

    // This conditional statement requires that a radio button be
    // selected before allowing the user to proceed to the next question.
    if ($('input[name="answer-choices"]:checked').length) {
      console.log(`The user HAS selected a radio button!`);

      checkAnswer();
    } else {
      console.log(`NO radio button has been selected!`);

      // This alerts the user to make an answer selection in order to
      // proceed to the next question.
      alert(
        'WHOOPS! You must select an answer before proceeding to the next question.'
      );
    }
  });

  // This listens for any clicks on the 'Next Question' button,
  // which will dislay the next question with its corresponding
  // answer choices, while also updating the question # and the
  // the user's current score.
  $('.feedback-page-correct, .feedback-page-incorrect').on(
    'click',
    '.next-button',
    function(event) {
      console.log("The 'Next Question' button was clicked!");

      // This adds 1 to the question # being viewed, indicating
      // to the user that the next question has been reached.
      viewedQuestionNum++;

      $('.feedback-page-correct').hide();
      $('.feedback-page-incorrect').hide();

      console.log(bitcoinQuiz.length);
      console.log(viewedQuestionNum);

      // This tells the browser to display quiz questions and
      // answers until there are no more questions to be displayed,
      // in which the scoreSummary() function is to be initiated.
      if (viewedQuestionNum < bitcoinQuiz.length) {
        displayQandA();
      } else {
        scoreSummary();
      }
    }
  );
});

// This function displays the question-page which includes: text indicating
// which question the user is currently viewing, the user's current score,
// and a series of multiple choice questions with their respective answer choices.
function startQuiz() {
  console.log('The startQuiz() function has been initiated.');

  $('.start-page').hide();
  $('.question-page').show();

  displayQandA();
  updateViewedQuestionNumber();
  updateScore();
}

// This function verifies the correctness of the user's answer
// selection.
function checkAnswer() {
  // This references the index of the user's answer selection (from the
  // array of the possible answer choices in the global variable 'bitcoinQuiz').
  const userAnswer = $('input[name="answer-choices"]:checked')
    .val()
    .toString();
  const correctAnswer = bitcoinQuiz[viewedQuestionNum].correct.toString();
  console.log(userAnswer);
  console.log(correctAnswer);

  if (userAnswer === correctAnswer) {
    console.log('The user has selected the CORRECT answer.');
    // This adds 1 to the # of questions that the user has answered
    // correctly.
    scoreCorrect++;

    $('.question-page').hide();
    $('.feedback-page-correct').show();
  } else {
    console.log('The user has selected the wrong answer.');
    // This adds 1 to the # of questions that the user has answered
    // incorrectly.
    scoreIncorrect++;

    $('.question-page').hide();
    $('.feedback-page-incorrect').show();

    // These two work together to display the correct answer to the
    // the user upon selecting the wrong answer choice.
    $('p.solution').html('');
    $('p.solution').append(
      'The correct answer was: ' +
        bitcoinQuiz[viewedQuestionNum].choices[
          bitcoinQuiz[viewedQuestionNum].correct
        ] +
        '.'
    );
  }
  // This updates the user's score after the user has made yet another
  // answer choice.
  updateScore();
}

// This function displays the current quiz question and its
// respective answer choices.
function displayQandA() {
  console.log('The displayQandA() function has been initiated.');
  $('.question-page').show();
  updateViewedQuestionNumber();

  $('p.quiz-question').html(bitcoinQuiz[viewedQuestionNum].question);

  // This removes all of the answer choices for the previously-
  // displayed question.
  $('p.choice').remove();

  // This displays all of the possible answer choices for the current
  // question. It will continue to display them until the user has
  // reached the end of the quiz.
  for (i = 0; i < bitcoinQuiz[viewedQuestionNum].choices.length; i++) {
    $('.multiple-choices').append(`<p class="choice">
      <input type="radio" role="radio" aria-checked="false" name="answer-choices" id="answer-choice-${i}" value="${i}">
      <label for="answer-choice-${i}">${
      bitcoinQuiz[viewedQuestionNum].choices[i]
    }</label>
      </p>`);
  }

  // This automatically puts focus on the first answer choice when
  // a new question is displayed to assist keyboard users.
  $('input[value="0"]').focus();
}

// This function updates the user on which question is currently being
// viewed.
function updateViewedQuestionNumber() {
  console.log('The updateViewedQuestionNumber() function has been initiated.');

  $('legend.viewed-question-number').html(
    `Quiz Question #` + (viewedQuestionNum + 1) + ` of ` + bitcoinQuiz.length
  );
}

// This function updates the user's current score, indicating number of
// questions answered correctly versus incorrectly.
function updateScore() {
  console.log('The updateScore() function has been initiated.');

  $('p.current-score').html(
    `Your Score: ` +
      ` Correct = ` +
      scoreCorrect +
      ` ; Incorrect = ` +
      scoreIncorrect
  );
}

// This function is the last page displayed to the user, showing a
// summary of the user's performance on the quiz. The user also has
// the option of retaking the quiz by clicking the provided button.
function scoreSummary() {
  console.log('The scoreSummary() function has been initiated.');

  $('p.score-summary').html(
    `You got ` +
      scoreCorrect +
      ` out of ` +
      bitcoinQuiz.length +
      ` total questions correct.`
  );

  // If the user scores 0-6 questions correctly, this score summary page
  // is displayed.
  if (scoreCorrect >= 0 && scoreCorrect <= bitcoinQuiz.length - 4) {
    console.log('Better luck next time, Newbie.');
    $('.final-page-summary').show();
    $('.final-page-average').hide();
    $('.final-page-pro').hide();
  }
  // If the user scores 7-9 questions correctly, this score summary page
  // is displayed.
  if (
    scoreCorrect >= bitcoinQuiz.length - 3 &&
    scoreCorrect <= bitcoinQuiz.length - 1
  ) {
    console.log('CLOSE, but no cigar! Try again!');
    $('.final-page-summary').show();
    $('.final-page-newbie').hide();
    $('.final-page-pro').hide();
  }
  // If the user scores ALL questions correctly, this score summary page
  // is displayed.
  if (scoreCorrect == bitcoinQuiz.length) {
    console.log('PERFECT score! Well done!');
    $('.final-page-summary').show();
    $('.final-page-newbie').hide();
    $('.final-page-average').hide();
  }

  // This listens for any clicks on the "Restart Quiz" button, allowing the
  // user to take the quiz again with the score and the question # values being
  // reset to 0.
  $('.restart-quiz').on('click', function(event) {
    viewedQuestionNum = 0;
    scoreCorrect = 0;
    scoreIncorrect = 0;
    $('.final-page-newbie').hide();
    $('.final-page-average').hide();
    $('.final-page-pro').hide();
    startQuiz();
  });
}
