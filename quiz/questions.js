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
        image: {
            url: "http://res.cloudinary.com/execool/image/upload/v1510128481/quiz/building_PNG91.png",
            alt: "Perhaps there is an answer behind this building..."
        },
        obstacleNum: 16
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
        image: {
            url: "http://res.cloudinary.com/execool/image/upload/c_pad,h_765,w_765/v1510128481/quiz/book_PNG2105.png",
            alt: "Perhaps there is an answer among these books..."
        },
        obstacleNum: 24
    },
    {
        ID: 2,
        title: 'Question 3',
        text: 'What is 3 + 3?',
        answers: [{
                ID: 0,
                value: '44',
                position: 0,
                offset: { left: 62, top: 50 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '-3',
                position: 1,
                offset: { left: 432, top: 200 },
                isCorrect: false
            },
            {
                ID: 2,
                value: '6',
                position: 2,
                offset: { left: 35, top: 116 },
                isCorrect: true
            },
            {
                ID: 3,
                value: '9',
                position: 3,
                offset: { left: 640, top: 212 },
                isCorrect: false
            }
        ],
        image: {
            url: "http://res.cloudinary.com/execool/image/upload/c_pad,h_380,w_380/v1510128481/quiz/medival_knight_PNG15955.png",
            alt: "Its a templar! Watch out!"
        },
        obstacleNum: 16
    },
    {
        ID: 3,
        title: 'Question 4',
        text: 'What is 4 + 4?',
        answers: [{
                ID: 0,
                value: '44',
                position: 0,
                offset: { left: 162, top: 250 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '666',
                position: 1,
                offset: { left: 232, top: 150 },
                isCorrect: false
            },
            {
                ID: 2,
                value: '12',
                position: 2,
                offset: { left: 678, top: 16 },
                isCorrect: false
            },
            {
                ID: 3,
                value: '8',
                position: 3,
                offset: { left: 10, top: 300 },
                isCorrect: true
            }
        ],
        image: {
            url: "http://res.cloudinary.com/execool/image/upload/c_pad,h_592,w_592/v1510128481/quiz/christian_cross_PNG23030.png",
            alt: "Look at all these crosses. We should be safe here!"
        },
        obstacleNum: 30
    },
    {
        ID: 3,
        title: 'Question 5',
        text: 'What is 5 + 5?',
        answers: [{
                ID: 0,
                value: '100',
                position: 0,
                offset: { left: 32, top: 40 },
                isCorrect: false
            },
            {
                ID: 1,
                value: '13',
                position: 1,
                offset: { left: 496, top: 70 },
                isCorrect: false
            },
            {
                ID: 2,
                value: 'ten',
                position: 2,
                offset: { left: 628, top: 160 },
                isCorrect: true
            },
            {
                ID: 3,
                value: '0',
                position: 3,
                offset: { left: 130, top: 30 },
                isCorrect: false
            }
        ],
        image: {
            url: "http://res.cloudinary.com/execool/image/upload/v1510128481/quiz/skeleton_PNG5552.png",
            alt: "Uh oh, its a skull. Hope there aren't any rats!"
        },
        obstacleNum: 30
    }
];