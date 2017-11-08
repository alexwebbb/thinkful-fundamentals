'use strict'

const currentState = {
    questionNum: 0,
    playerAnswers: [],
    correct: 0,
    wrong: 0,
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

function _generateObstruction(left, top, imageUrl, alt) {
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
                        class="obstruct-img"
                        >
                </figure>
            </div>
            `;
}

function _renderForm(index) {

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
                q.image.url, q.image.alt));
    });


    for (let i = 0, x = q.obstacleNum; i < x; i++) {
        // these obstructions will have blank alt
        // which is the standard way to indicate 
        // presentation elements in ARIA
        formElements.push(
            _generateObstruction(
                _getRandomRange(5, 760),
                _getRandomRange(5, 350),
                q.image.url, ''));
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
                    <span class="nav-element">Correct: ${currentState.correct}</span>
                    <span class="nav-element">Wrong: ${currentState.wrong}</span>
                    <input class="nav-element prev-button" role="button" type="button" value="Prev">
                    <input class="nav-element next-button" role="button" type="submit" value="Next">
                </nav>
            </form>
        `));

    // it is not possible to delegate plugins 
    // jquery garbage collects dead listeners
    // probably
    $("#drag-zone").draggable({ containment: "#drag-zone-parent", scroll: false });
    $(".obstruction").draggable({ containment: "#drag-zone", scroll: false });

    return true;
}

function loadInitialState() {

    _renderForm(0);


}

function handleNav(c) {

    $('#main-app').on('click', '.prev-button', () => {
        if (c.questionNum > 0) {
            c.questionNum--;
            _renderForm(c.questionNum);
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
            _renderForm(c.questionNum);
        }

    });
}

function handleQuiz() {

    loadInitialState();
    handleNav(currentState);

    return 0;
}


// jQuery
$.getScript('questions.js', handleQuiz);