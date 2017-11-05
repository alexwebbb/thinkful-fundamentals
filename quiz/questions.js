'use strict'

const QUESTIONS = [{
        ID: 0,
        title: 'Question 1',
        text: 'What is 1 + 1?',
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