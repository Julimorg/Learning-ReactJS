import React from "react";
import { useState } from "react";
// import "../flashCardQuizz/styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function Accordian({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <>
      <div className="accordion">
        {data.map((el, index) => (
          <AccordianItem
            curOpen = {curOpen}
            setCurOpen = {setCurOpen}
            key={el.title}
            number={index}
            title={el.title}
            text={el.text}
          />
        ))}
      </div>
    </>
  );
}

function AccordianItem({number, title, text , setCurOpen ,curOpen}) {

  const isOpen = number === curOpen;


  function handleToggle(){
    setCurOpen(isOpen ? null : number);
  }

  return (
    <>
      <div className="item" onClick = {handleToggle}>
        <p className="number">{number}</p>
        <p className="title">{title}</p>
        <p className="icon">{isOpen ? "-" : "+"}</p>
       { isOpen && <p className="content-box">{text}</p>}
      </div>
    </>
  );
}

function FlashCardQuizz() {
  return (
    <>
      <Accordian data={faqs} />
    </>
  );
}

export default FlashCardQuizz;
