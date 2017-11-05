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
                offset: { x: 110, y: 96 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '4',
                position: 1,
                offset: { x: 35, y: 14 },
                isCorrect: false
            },
            {
                ID: 2,
                value: '2',
                position: 2,
                offset: { x: 11, y: 88 },
                isCorrect: true
            },
            {
                ID: 3,
                value: '14',
                position: 3,
                offset: { x: 66, y: 52 },
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
				<div
					style="position: absolute;"
					>
					<figure 
						class="answer"
						style="left: ${a[i].offset.x}px; top: ${a[i].offset.y}px;"
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
					<section id="overflow-parent"
						>
						<section
							id="draggable-zone-parent"
							>
							<section 
								id="draggable-zone"
								>
								${formElements.join('')}	
							</section>
						</section>
					</section>
				</fieldset>
			</form>			

		`));

	return true;
}

function loadInitialState() {

	_renderForm(0);

	$( "#draggable-zone" ).draggable({ containment: "#draggable-zone-parent", scroll: false });
	$( ".answer" ).draggable({ containment: "#draggable-zone", scroll: false });
}

function handleQuiz () {

	loadInitialState();

	return 0;
}

$(handleQuiz);