import React, { useState } from "react";
// import "../flashCard/styles.css";

const questions = [
    {
        id: 3457,
        question: "What language is React based on?",
        answer: "JavaScript"
    },
    {
        id: 7336,
        question: "What are the building blocks of React apps?",
        answer: "Components"
    },
    {
        id: 8832,
        question: "What's the name of the syntax we use to describe a UI in React?",
        answer: "JSX"
    },
    {
        id: 1297,
        question: "How to pass data from parent to child components?",
        answer: "Props"
    },
    {
        id: 9103,
        question: "How to give components memory?",
        answer: "useState hook"
    },
    {
        id: 2002,
        question:
            "What do we call an input element that is completely synchronised with state?",
        answer: "Controlled element"
    }
];
function FlashCards() {
    const [selectId , setSelectId] = useState<number | null>(null);

    const handleSelectId = (id: number) =>{
        setSelectId(id != selectId ? id : null);
        console.log("selected id", selectId);
        console.log("id", id);
        console.log("setSelectId", selectId);
    }
    return (
        <>
            <div className="flashcards">
                {
                    questions.map((questions) => {
                        return (
                            <div 
                            key = {questions.id}
                            onClick = {() => handleSelectId(questions.id)}
                            className={ questions.id === selectId ? "selected" : ""}>
                                {
                                    questions.id === selectId ? (questions.answer) : (questions.question)
                                }
                            </div>
                        )
                    })
                }

            </div>

        </>
    )
}


const FlashCard = () => {
    return (
        <div className="app">
            <FlashCards />
        </div>
    )
}



export default FlashCard;