import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DateCounter = () => {
    return (
        <>
            <div className="App">
                <Counter />
            </div>
        </>
    )
}
function Counter() {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(0);
    const [range, setRange] = useState(0);
    const [values, setValue] = useState(0);

    //? Input
    function handleInput(e) {
        if (!Number.isNaN(values)) {
            setValue(Number(e.target.value));
            console.log(e.target.value);
        }else {
            setValue(0);
        }
    }
    //? Range
    function handleRange(e) {
        setRange(parseInt(e.target.value));
        console.log(e.target.value);
    }
    // ? Counter
    function increase() {
        if (range > 0) {
            setCount((c) => c + (1 * range))
            setValue((c) => c + (1 * range))

        };
        console.log(count);
    }
    function decrease() {
        if (range > 0){
            setCount((c) => c - (1 * range))
            setValue((c) => c - (1 * range))
        };
    }
    //? Time
    // function increaseTime() {
    //     setTime((t) => t + 1);
    // }
    // function decreaseTime() {
    //     if (time > 0) return setTime((t) => t - 1);
    // }
    //? Submit
    function HandleSubmit(e) {
        e.preventDefault();
        if (!values ) return ;
        setCount((c) => c + values);
        setRange(0);
        setValue(0);
    }
    //? Reset
    function handleReset(){
        setCount(0);
        setRange(0);
        setValue(0);
    }
    const date = new Date("March 12 2025");
    date.setDate(date.getDate() + count);
    return (
        <>
            <div className="count">
                <button onClick={increase}>+</button>
                <span>count: {count}</span>
                <button onClick={decrease}>-</button>
            </div>
            {/* <div className="time">
                <button onClick={increaseTime}>+</button>
                <span>time: {time}</span>
                <button onClick={decreaseTime}>-</button>
            </div> */}
            <div className="rangeInput">
                <input type="range" min="0" max="10" onChange={handleRange} />
                <span>range: {range}</span>
                <form className="inputTime" onSubmit={HandleSubmit}>
                    <input type="number"
                        value={values}
                        onChange={handleInput}
                    />
                    <span>seconds</span>
                </form>
            </div>
            <div className="date">
                <span>
                    {
                        count === 0 ? "Today" : count > 0 ? "Future" : "Past"
                    }
                </span>
                <br />
                <span>date: {date.toLocaleDateString()}</span>
            </div>
            {
                count > 0 ? <button onClick={handleReset}>Reset</button> : null
            }
            <hr />
            <Link to="/travel">Travel page</Link>
            <Link to="/card">flash cards page</Link>
            <Link to="/flashCardQuizz"> flash cards 2 pagge</Link>
            <Link to="/eatandsplit"> eat and split </Link>
            <Link to="/usePopcorn"> use pop corn</Link>
            <Link to="/tabBox"> Tab Box</Link>
            <Link to="/changemoney"> changemoney</Link>
            <Link to="/geolocate"> geolocate</Link>
            <Link to="/quizz"> quizzpage</Link>
            <Link to="/automic-blog"> automic-bloc</Link>
            <Link to="/world-wise"> world wise</Link>



        </>
    )
}

export default DateCounter;