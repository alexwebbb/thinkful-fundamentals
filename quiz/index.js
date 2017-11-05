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
                offset: { x: 0, y: 0 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '4',
                position: 1,
                offset: { x: 0, y: 0 },
                isCorrect: false
            },
            {
                ID: 2,
                value: '2',
                position: 2,
                offset: { x: 0, y: 0 },
                isCorrect: true
            },
            {
                ID: 3,
                value: '14',
                position: 3,
                offset: { x: 0, y: 0 },
                isCorrect: false
            }
        ],
        isAnswered: false,
        isCorrect: false,
        // this will be filled in a bit later...
        // may also be changed to a data structure 
        // that has an object for each image
        image: null
    },
    {
        ID: 1,
        title: 'Question 2',
        text: 'What is 2 + 2?',
        answers: [{
                ID: 0,
                value: '7',
                position: 0,
                offset: { x: 0, y: 0 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '4',
                position: 1,
                offset: { x: 0, y: 0 },
                isCorrect: true
            },
            {
                ID: 2,
                value: '2',
                position: 2,
                offset: { x: 0, y: 0 },
                isCorrect: false
            },
            {
                ID: 3,
                value: '14',
                position: 3,
                offset: { x: 0, y: 0 },
                isCorrect: false
            }
        ],
        isAnswered: false,
        isCorrect: false,
        image: null
    }
];
















function _renderForm(index) {

	const q = QUESTIONS[index];

	const a = q.answers;

	const formElements = [];

	for (let i = 0, x = a.length; i < x; i++) {
		
		a[i].value;

		formElements.push(`
				<figure class="js-answer-${a[i].position}">
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
			`);
	}


	$('#main-app').html($(`
			
			<form 
				method="post"
				>
				<fieldset
					>
					<legend>
						${q.title}
					</legend>
					<h1>
						${q.text}
					</h1>
					<section
						class="draggable-zone-parent"
						>
						<section 
							class="draggable-zone"
							>
							${formElements.join('')}	
						</section>
					</section>
				</fieldset>
			</form>			

		`));

	return true;
}

function loadInitialState() {

	_renderForm(0);

	$( ".draggable-zone" ).draggable({ containment: ".overflow-zone-parent", scroll: false });
}

function handleQuiz () {

	loadInitialState();

	return 0;
}

$(handleQuiz);