import { number } from "prop-types";
import React, { useEffect } from "react";
import { useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [value, setValue] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckMoney() {
    try {
      setIsLoading(true);

      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${value}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();

      if (value <= 0) {
        setError("NUMBER MUST NOT BE NEGATIVE!");
      } else {
        setError("");
      }

      setConverted(data.rates[toCur]);
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsLoading(false);
    }
  }
  // useEffect(function(){
  //   async function Money(){
  //   setIsLoading(true);
  //   const res = await fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${fromCur}&to=${toCur}`);
  //   const data = await res.json();

  //   setConverted(data.rates[toCur]);

  //   setIsLoading(false);
  //   }
  //   Money();
  // },[value, fromCur, toCur]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        disabled={isLoading}
      />
      <button onClick={(e) => handleCheckMoney()}>change Money</button>
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {error} - {converted} - {toCur}
      </p>
    </div>
  );
}
