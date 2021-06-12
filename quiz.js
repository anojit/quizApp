// // const questionNumber = document.querySelector(".question-number");
// // const questionText = document.querySelector(".question-text");
// // let optionContainer;

const questionContainer = document.querySelector(".question-container");
const answersIndicatorContainer = document.querySelector(".answer-indicator");
// const homeBox = document.querySelector(".home-box");
// const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const totalNumberOfQuestions = document.querySelector(".total-number-of-questions");
const prv = document.querySelector("#previous");
const submit = document.querySelector('#submit');
const nxt = document.querySelector("#next");

let questionCounter = 0;
let displayQuestion = 0;
let currentQuestionObj;
let availableQuestion = [];
let availableOptionsArr = [];
let correctAnswer = 0;
let attempt = 0;

// /////////////////////////////////////////////////////////////////////////////////////

function setAvailableQuestions(){
    const totalQuestion = quizDB.length;
    let i;

    i = 0;
    while( i < totalQuestion )
    {
        availableQuestion.push(quizDB[i]);
        // console.log(availableQuestion[i]);
        i += 1;
    }
}

// /////////////////////////////////////////////////////////////////////////////////////
// let eachQuestion;
// function createElementForEachQuestion(){
//     eachQuestion = document.createElement("div");
//     let questionName = ("question-" + (questionCounter + 1));
//     eachQuestion.id =  ( questionName );
//     eachQuestion.className =  ( questionName + " eachQuestion" + " hide" );
//     questionContainer.appendChild(eachQuestion);
// }

function getNewQuestion(){

    if( questionCounter === (quizDB.length - 1) )
    {
        buttonStatus( 'next', true );
    }
    let randomIndex = ( Math.floor( Math.random() * availableQuestion.length ) );
    const questionIndex = randomIndex;

    // createElementForEachQuestion();
    const eachQuestion = document.createElement("div");
    let qId = ("qId-" + availableQuestion[questionIndex].number);
    eachQuestion.id =  ( qId );
    let questionName = ("question-" + (questionCounter + 1));
    eachQuestion.className =  ( questionName + " eachQuestion" + " hide" );
    questionContainer.appendChild(eachQuestion);
    ////////////////////////////////////////////

    // questionNumber.innerHTML = ("Question " + (questionCounter + 1) + " of " + quizDB.length);

    const questionNumber = document.createElement("div");
    questionNumber.className =  "question-number";
    eachQuestion.appendChild(questionNumber);

    questionNumber.innerHTML = ("Question " + (questionCounter + 1) + " of " + quizDB.length);
    /////////////////////////////////////////////

    const questionText = document.createElement("div");
    questionText.className =  "question-text";
    eachQuestion.appendChild(questionText);

    const currentQuestionObj = availableQuestion[questionIndex];
//  console.log(currentQuestionObj, questionIndex);
    questionText.innerHTML = currentQuestionObj.question;
    /////////////////////////////////////////////

    availableQuestion.splice(questionIndex, 1);

    const optionLength = currentQuestionObj.options.length;

    let i;
    i = 0;
    while( i < optionLength )
    {
        availableOptionsArr.push(currentQuestionObj.options[i]);
        // console.log(availableOptionsArr);
        i += 1;
    }

    // document.getElementById('option-id').innerHTML = "";

    const optionContainer = document.createElement("div");
    optionContainer.className =  "option-container";
    eachQuestion.appendChild(optionContainer);


    let animationDelay = 0.2;

    i = 0;
    while( i < optionLength )
    {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        optionDiv.style.animationDelay = (animationDelay + 's');

        randomIndex = ( Math.floor( Math.random() * availableOptionsArr.length ) );
        const optionIndex = randomIndex;
// console.log(optionIndex);
        const option = document.createElement("INPUT");
        option.setAttribute( "type", "radio" );
        option.setAttribute( "name", "question" + (questionCounter + 1) + "option" );
        option.id = (qId + "option" + (i + 1));


        optionDiv.appendChild(option);

        // console.log(quizDB);
        // console.log(availableOptionsArr);

        const optionText = availableOptionsArr[optionIndex];
        const optionTextDiv = document.createElement("span");
        optionTextDiv.className = "option-text";
        optionTextDiv.innerHTML = optionText;

        optionDiv.append(optionTextDiv);

        const index2 = availableOptionsArr.indexOf(optionText);
        availableOptionsArr.splice(index2, 1);

        optionContainer.appendChild(optionDiv);

        animationDelay += 0.2;

        i += 1;
    }

    questionCounter += 1;
    displayQuestion += 1;

    if( (questionCounter > 0) && (questionCounter == quizDB.length) )
    {
        buttonStatus( 'submit', false );
    }
}
// /////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////////

function hideByClassName( className ){
    document.querySelector("." + className).classList.add("hide");
}

function showByClassName( className ){
    document.querySelector("." + className).classList.remove("hide");
}

function startQuiz(){
    hideByClassName( "home-box" );
    showByClassName( "quiz-box" );

    buttonStatus( 'submit', true );

    setAvailableQuestions();
    getNewQuestion();

    buttonStatus( 'previous', true );
    // document.getElementById('previous').disabled = true;
    // prv.classList.add("disabled");

    const questionName = "question-" + questionCounter;
    showByClassName(questionName);

}
// /////////////////////////////////////////////////////////////////////////////////////

onload = function(){
    totalNumberOfQuestions.innerHTML = quizDB.length;
}
// /////////////////////////////////////////////////////////////////////////////////////

// function quizOver(){
//     quizBox.classList.add("hide");
//     resultBox.classList.remove("hide");

//     quizResult();
// }
// /////////////////////////////////////////////////////////////////////////////////////

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quizDB.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
    resultBox.querySelector(".total-wrong").innerHTML = (attempt - correctAnswer);
    const percentage = parseFloat(correctAnswer / quizDB.length) * 100;
    resultBox.querySelector(".percentage").innerHTML = (percentage.toFixed(2) + "%");
    resultBox.querySelector(".total-score").innerHTML = (correctAnswer + "/" + quizDB.length);
}
// /////////////////////////////////////////////////////////////////////////////////////

function resetQuiz(){
    document.getElementById("question-container").innerHTML = "";


    questionCounter = 0;
    displayQuestion = 0;
    correctAnswer = 0;
    attempt = 0;

    buttonStatus( 'next', false );
    buttonStatus( 'submit', true );
    // buttonStatus( 'submit', true );
}
// /////////////////////////////////////////////////////////////////////////////////////

function tryAgain(){
    resetQuiz();

    hideByClassName('result-box');
    startQuiz();
}
// /////////////////////////////////////////////////////////////////////////////////////

function goToHome(){
    resetQuiz();

    hideByClassName('result-box');
    showByClassName('home-box');
}
// /////////////////////////////////////////////////////////////////////////////////////

function buttonStatus( buttonId, status ){
    document.getElementById(buttonId).disabled = status;

    if( status == true )
    {
        document.querySelector("#"+buttonId).classList.add("disabled");
    }
    else
    {
        document.querySelector("#"+buttonId).classList.remove("disabled");
    }
}

next.addEventListener( 'click', () => {
    if( displayQuestion < questionCounter )
    {
        let questionName = "question-" + displayQuestion;
        hideByClassName(questionName);

        displayQuestion += 1;

        questionName = "question-" + displayQuestion;
        showByClassName(questionName);

        if( displayQuestion === quizDB.length )
        {
            buttonStatus( 'next', true );
        }

        if( displayQuestion == 2 )
        {
            buttonStatus( 'previous', false );
            // document.getElementById('previous').disabled = false;
            // prv.classList.remove("disabled");
        }
    }
    else if( questionCounter < quizDB.length )
    {
        let questionName = "question-" + questionCounter;
        hideByClassName(questionName);
        getNewQuestion();
        questionName = "question-" + questionCounter;
        showByClassName(questionName);

        if( questionCounter == 2 )
        {
            buttonStatus( 'previous', false );
            // document.getElementById('previous').disabled = false;
            // prv.classList.remove("disabled");
        }
    }

} );
/////////////////////////////////////////////////////////////////////////////////////

previous.addEventListener( 'click', () => {
    if( (displayQuestion > 1) )
    {
        if( displayQuestion == (quizDB.length) )
        {
            buttonStatus( 'next', false );
            // document.getElementById('next').disabled = false;
            // nxt.classList.remove("disabled");
        }

        let questionName = "question-" + displayQuestion;
        hideByClassName(questionName);

        displayQuestion -= 1;

        questionName = "question-" + displayQuestion;
        showByClassName(questionName);

    }
    if( (displayQuestion == 1) )
    {
        buttonStatus( 'previous', true );
        // document.getElementById('previous').disabled = true;
        // prv.classList.add("disabled");
    }
} );
// /////////////////////////////////////////////////////////////////////////////////////

function getResult(){
    let i, eachObj, j;

    i = 0;
    while( i < quizDB.length )
    {
        eachObj = quizDB[i];

        j = 0;
        while( j < eachObj.options.length )
        {
            const inputElementId = document.getElementById('qId-' + i + 'option' + (j + 1));
            if( inputElementId.checked )
            {
                if(inputElementId.nextSibling.textContent === eachObj.options[eachObj.answer])
                {
                    console.log(`correct [${i}][${j}]`);

                    correctAnswer += 1;
                }

                attempt += 1;

                break;
            }

            j += 1;
        }


        i += 1;
    }

    console.log(correctAnswer, attempt);

    quizResult();
}


submit.addEventListener( 'click', () => {

    hideByClassName("quiz-box");
    showByClassName("result-box");


    getResult();
} );
