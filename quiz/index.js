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
                offset: { left: 0, top: 0 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '4',
                position: 1,
                offset: { left: 0, top: 0 },
                isCorrect: true
            },
            {
                ID: 2,
                value: '2',
                position: 2,
                offset: { left: 0, top: 0 },
                isCorrect: false
            },
            {
                ID: 3,
                value: '14',
                position: 3,
                offset: { left: 0, top: 0 },
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
			</form>			

		`));

	return true;
}

function loadInitialState() {

	_renderForm(0);

	$( "#drag-zone" ).draggable({ containment: "#drag-zone-parent", scroll: false });
	$( ".answer" ).draggable({ containment: "#drag-zone", scroll: false });
}

function handleQuiz () {

	loadInitialState();

	return 0;
}

$(handleQuiz);