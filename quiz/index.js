'use strict'

const QUESTIONS = [{
        ID: 0,
        title: 'Question 1',
        text: 'What is 1 + 1?',
        answers: [{
                ID: 0,
                value: '7',
                // pos is the array index of the element
                // that the input tag will be inserted in
                position: 0,
                offset: { left: 492, top: 110 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '4',
                position: 1,
                offset: { left: 682, top: 176 },
                isCorrect: false
            },
            {
                ID: 2,
                value: '2',
                position: 2,
                offset: { left: 173, top: 256 },
                isCorrect: true
            },
            {
                ID: 3,
                value: '14',
                position: 3,
                offset: { left: 48, top: 111 },
                isCorrect: false
            }
        ],
        // this will be filled in a bit later...
        // may also be changed to a data structure 
        // that has an object for each image
        image: "http://pngimg.com/uploads/building/building_PNG91.png",
        obstacleNum: 20
    },
    {
        ID: 1,
        title: 'Question 2',
        text: 'What is 2 + 2?',
        answers: [{
                ID: 0,
                value: '11',
                position: 0,
                offset: { left: 474, top: 200 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '4',
                position: 1,
                offset: { left: 102, top: 294 },
                isCorrect: true
            },
            {
                ID: 2,
                value: '6',
                position: 2,
                offset: { left: 774, top: 235 },
                isCorrect: false
            },
            {
                ID: 3,
                value: '1.5',
                position: 3,
                offset: { left: 44, top: 163 },
                isCorrect: false
            }
        ],
        image: "http://pngimg.com/uploads/book/book_PNG2119.png",
        obstacleNum: 30
    },
    {
        ID: 2,
        title: 'Question 3',
        text: 'What is 3 + 3?',
        answers: [{
                ID: 0,
                value: '44',
                position: 0,
                offset: { left: 0, top: 0 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '-3',
                position: 1,
                offset: { left: 0, top: 0 },
                isCorrect: true
            },
            {
                ID: 2,
                value: '16',
                position: 2,
                offset: { left: 0, top: 0 },
                isCorrect: false
            },
            {
                ID: 3,
                value: '9',
                position: 3,
                offset: { left: 0, top: 0 },
                isCorrect: false
            }
        ],
        image: null,
        obstacleNum: 30
    }
];










const currentState = {
    questionNum: 0,
    questionAnswers: []
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
							for="question-${q.ID+1}" 
							class="js-label-${a[i].position}"
							>
							${a[i].value}
						</label>
						<input 
							type="radio" 
							name="question-${q.ID+1}" 
							id="" 
							class="js-input-${a[i].position} 
							value="${a[i].value}"
						    >
					</figure>
				</div>				
			`;
}

function _generateObstruction(left, top, image) {
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
				        src="${image}" 
				        alt="Perhaps there is an answer behind this building..." 
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
                    <span class="nav-element">Correct: </span>
                    <span class="nav-element">Wrong: </span>
                    <span class="nav-element prev-button" role="button">Prev</span>
                    <span class="nav-element next-button" role="button">Next</span>
                </nav>
			</form>
		`));
		
	$( "#drag-zone" ).draggable({ containment: "#drag-zone-parent", scroll: false });
	$( ".obstruction" ).draggable({ containment: "#drag-zone", scroll: false });

	return true;
}

function loadInitialState() {

	_renderForm(0);


}

function handleNav() {
    
    $('#main-app').on('click', '.prev-button', function() {
        if(currentState.questionNum > 0) {
            currentState.questionNum--;
            _renderForm(currentState.questionNum);   
        }
    });
    
    $('#main-app').on('click', '.next-button', function() {
        currentState.questionNum++;
        _renderForm(currentState.questionNum);
    });
}

function handleQuiz () {

	loadInitialState();
	handleNav();

	return 0;
}

$(handleQuiz);