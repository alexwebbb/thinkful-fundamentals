'use strict'

const currentState = {
    questionNum: 0,
    playerAnswers: [],
    score: function() {

        let correct = 0;

        for (let i = 0, x = this.playerAnswers.length; i < x; i++) {

            if (QUESTIONS[i].answers[this.playerAnswers[i]].isCorrect) {
                correct++;
            }
        }

        return correct;
    }
}


function _getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function _generateAnswer(a, q, i) {
    return `
                <div
                    style="position: absolute;"
                    >
                    <figure 
                        class="answer"
                        style="
                            left: ${a[i].offset.left}px; 
                            top: ${a[i].offset.top}px;"
                        >
                        <label 
                            for="question" 
                            class="js-label-${a[i].position}"
                            >
                            ${a[i].value}
                        </label>
                        <input 
                            type="radio" 
                            name="question" 
                            id="answer-${a[i].ID}" 
                            class="js-input-${a[i].position}"
                            value="${a[i].ID}"
                            >
                    </figure>
                </div>              
            `;
}

function _generateObstruction(left, top, image) {
    return  `
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
                        src="${image.url}" 
                        alt="${image.alt}" 
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

    for (let i = 0, x = a.length; i < x; i++) {

        formElements.push(_generateAnswer(a, q, i));
        // these obstructions will sit on top of answers
        formElements.push(
            _generateObstruction(
                a[i].offset.left,
                a[i].offset.top,
                q.image));
    }

    for (let j = 0, y = q.obstacleNum + a.length; j < y; j++) {

        formElements.push(
            _generateObstruction(
                _getRandomRange(5, 760),
                _getRandomRange(5, 350),
                q.image));
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
                    <div id="drag-zone-overflow"
                        >
                        <div
                            id="drag-zone-parent"
                            >
                            <section 
                                id="drag-zone"
                                >
                                ${formElements.join('')}    
                            </section>
                        </div>
                    </div>
                </fieldset>
                <nav role="navigation">
                    <span class="nav-element">Correct: ${currentState.score()}</span>
                    <span class="nav-element">Wrong: </span>
                    <span class="nav-element prev-button" role="button">Prev</span>
                    <span class="nav-element next-button" role="button">Next</span>
                </nav>
            </form>
        `));

    $("#drag-zone").draggable({ containment: "#drag-zone-parent", scroll: false });
    $(".obstruction").draggable({ containment: "#drag-zone", scroll: false });

    return true;
}

function loadInitialState() {

    _renderForm(0);


}

function handleNav() {

    $('#main-app').on('click', '.prev-button', function() {
        if (currentState.questionNum > 0) {
            currentState.questionNum--;
            _renderForm(currentState.questionNum);
        }
    });

    $('#main-app').on('click', '.next-button', function() {

        currentState.playerAnswers[currentState.questionNum] = $('input[name="question"]:checked').val();

        if (currentState.questionNum < currentState.playerAnswers.length &&
            currentState.playerAnswers[currentState.questionNum]
        ) {
            currentState.questionNum++;
            _renderForm(currentState.questionNum);
        }

    });
}

function handleQuiz() {

    loadInitialState();
    handleNav();

    return 0;
}


// jQuery
$.getScript('questions.js', handleQuiz);