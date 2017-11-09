'use strict'

const currentState = {
    resetState: function() {

        this.questionNum = 0;
        this.playerAnswers = [];
        this.correct = 0;
        this.wrong = 0;
    },
    updateScore: function() {

        this.correct = this.wrong = 0;

        this.playerAnswers.forEach((playerAnswer, i) => {

            if (QUESTIONS[i].answers[playerAnswer].isCorrect) {
                this.correct++;
            } else {
                this.wrong++;
            }

        }, this);
    }
}


const loseState = Object.create(currentState);
loseState.resetState = function() {

    this.questionNum = 0;
    this.playerAnswers = [0, 0, 0, 0, 0];
    this.correct = 0;
    this.wrong = 0;
}

const winState = Object.create(currentState);
winState.resetState = function() {

    this.questionNum = 0;
    this.playerAnswers = [2, 1, 2, 3, 2];
    this.correct = 0;
    this.wrong = 0;
}


function _getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function _generateAnswer(a) {
    return `
                <div
                    style="position: absolute;"
                    >
                    <figure 
                        class="answer"
                        style="
                            left: ${a.offset.left}px; 
                            top: ${a.offset.top}px;"
                        >
                        <label 
                            for="question" 
                            class="js-label-${a.position}"
                            >
                            ${a.value}
                        </label>
                        <input 
                            type="radio" 
                            name="question" 
                            id="answer-${a.ID}" 
                            class="js-input-${a.position}"
                            value="${a.ID}"
                            >
                    </figure>
                </div>              
            `;
}

function _generateObstruction(left, top, imageUrl, alt = '', classes = '') {
    return `
            <div
                style="position: absolute;"
                >
                <figure 
                    class="obstruction"
                    style="
                        left: ${left}px; 
                        top: ${top}px;"
                        >
                    <img
                        src="${imageUrl}" 
                        alt="${alt}"
                        title="${alt}" 
                        class="obstruct-img ${classes}"
                        >
                </figure>
            </div>
            `;
}

function _renderForm(c, index) {

    const q = QUESTIONS[index];

    const a = q.answers;

    const formElements = [];

    a.forEach((answer, i) => {
        // statements
        formElements.push(_generateAnswer(answer));
        // these obstructions will sit on top of answers
        // they are the only obstructions to have alt text
        formElements.push(
            _generateObstruction(
                answer.offset.left - 15,
                answer.offset.top - 15,
                q.image.url, 
                q.image.alt,
                'answer-obstruction'));
    });


    for (let i = 0, x = q.obstacleNum; i < x; i++) {
        // these obstructions will have blank alt
        // which is the standard way to indicate 
        // presentation elements in ARIA
        formElements.push(
            _generateObstruction(
                _getRandomRange(5, 760),
                _getRandomRange(5, 350),
                q.image.url));
    }


    $('#main-app').html($(`
            
            <form 
                method="post"
                id="main-form"
                >
                <fieldset>
                    <legend>
                        ${q.title}
                    </legend>
                    <h1>
                        ${q.text}
                    </h1>
        <!-- The following element is the frame for thee draggable area -->
                    <div id="drag-zone-frame"
                        >
        <!-- The following element bounds the draggable background element -->
                        <div
                            id="drag-zone-parent"
                            >
        <!-- The following element IS the draggable background element. 
            It is also the parent for all the smaller draggable elements. -->
                            <section 
                                id="drag-zone"
                                >
                                ${formElements.join('')}    
                            </section>
                        </div>
                    </div>
                </fieldset>
                <nav role="navigation">
                    <span class="nav-element">Correct: ${c.correct}</span>
                    <span class="nav-element">Wrong: ${c.wrong}</span>
                    <input class="nav-element prev-button nav-button" role="button" type="button" value="Prev">
                    <input class="nav-element next-button nav-button" role="button" type="submit" value="Next">
                </nav>
            </form>
        `));


    $("#drag-zone").draggable({ containment: "#drag-zone-parent", scroll: false });
    $(".obstruction").draggable({ containment: "#drag-zone", scroll: false });

    $('.answer-obstruction').tooltip();

    return true;
}

function _returnWinScreenContent(c) {


    if (QUESTIONS.length === c.correct) {
        return `
                <fieldset>
                    <legend>
                        Nice
                    </legend>
                    <h1>
                        Congratulations!
                    </h1>
                    <div 
                        id="drag-zone-frame"
                        class="win-condition"
                        >
                        <div class="win-subgroup">
                            <img
                                class="grail" 
                                src="http://res.cloudinary.com/execool/image/upload/c_scale,h_200/v1510143883/quiz/high-quality-income-stocks-the-holy-grail-for-investors_yqlmqp.png" 
                                alt="Its the Holy Grail! You now have eternal life I guess. Don't drop it down a ravine." 
                                class="obstruct-img"
                                >
                            <p>
                                You Win!<br>
                                Here it is!</p>
                        </div>
                    </div>
                </fieldset>
                `;
    } else {

        let wrongAnswers = [];

        QUESTIONS.forEach((question, index) => {
            if (!question.answers[c.playerAnswers[index]].isCorrect) {
                wrongAnswers.push(question.title + ',');
            }
        });

        console.log(wrongAnswers);

        if (wrongAnswers.length > 1) wrongAnswers.splice(wrongAnswers.length - 1, 0, 'and');

        return `
                <fieldset>
                    <legend>
                        Too bad!
                    </legend>
                    <h1>
                        You turned into a skeleton!
                    </h1>
                    <div 
                        id="drag-zone-frame"
                        class="win-condition"
                        >
                        <div class="win-subgroup">
                            <img
                                class="grail" 
                                src="http://res.cloudinary.com/execool/image/upload/v1510200475/quiz/holy_grail_skeleton.jpg" 
                                alt="You turned into a skeleton because you made the wrong choice. Sorry!"
                                title="You turned into a skeleton because you made the wrong choice. Sorry!"
                                class="obstruct-img"
                                >
                            <p>
                                You Lose...<br>
                                You got ${wrongAnswers.join(' ').slice(0, -1)} wrong.</p>
                        </div>
                    </div>
                </fieldset>
                `;
    }
}

function _generateWinScreen(c) {


    $('#main-app').html($(`
            
            <form 
                method="post"
                id="main-form"
                >
                ${_returnWinScreenContent(c)}
                <nav role="navigation">
                    <span class="nav-element">Correct: ${c.correct}</span>
                    <span class="nav-element">Wrong: ${c.wrong}</span>
                    <input class="nav-element prev-button" role="button" type="button" value="" disabled>
                    <input class="nav-element nav-button reset" role="button" type="submit" value="Reset?">
                </nav>
            </form>
        `));

    $('.grail').draggable().tooltip();
    $('.reset').click(function(event) {
        event.preventDefault();

        loadInitialState(c);
    });
}

function loadInitialState(c) {

    c.resetState();

    _renderForm(c, 0);

}

function handleNav(c) {

    $('#main-app').on('click', '.prev-button', () => {
        if (c.questionNum > 0) {
            c.questionNum--;
            _renderForm(c, c.questionNum);
        }
    });

    $('#main-app').on('click', '.next-button', (event) => {
        event.preventDefault();

        c.playerAnswers[c.questionNum] = $('input[name="question"]:checked').val();

        if (c.questionNum < c.playerAnswers.length &&
            c.playerAnswers[c.questionNum]
        ) {
            c.updateScore();
            c.questionNum++;

            if (QUESTIONS.length === c.playerAnswers.length) {
                _generateWinScreen(c);
            } else {
                _renderForm(c, c.questionNum);
            }
        }

    });
}

function handleQuiz() {

    const state = winState;

    loadInitialState(state);

    handleNav(state);

    return 0;
}


// jQuery
$.getScript('questions.js', handleQuiz);