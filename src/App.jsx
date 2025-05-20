import React from "react";
import { Routes, Route } from "react-router-dom";
import DateCounter from "./pages/dateCounter";

import FlashCard from "./pages/flashCard/flashCard";
import TravelList from "./pages/travel/travel_list";
import FlashCardQuizz from "./pages/flashCardQuizz/FlashCardQuizz";
import EatAndSplit from "./pages/EatAndSplit/EatAndSplit";
import UsePopCorn from "./pages/DemoUsePopCorn/usePopCorn";
import TabBox from "./pages/TabBox/TabBox";
import ChangeMoney from "./pages/Money/ChangeMoney";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DateCounter />} />
        <Route path="/travel" element={<TravelList />} />
        <Route path="/card" element={<FlashCard />} />
        <Route path="/flashCardQuizz" element= {<FlashCardQuizz />}/>
        <Route path ="/eatandsplit" element = {<EatAndSplit/>} />
        <Route path = "/usePopcorn"  element = {<UsePopCorn/>}/>
        <Route path = "/tabBox"  element = {<TabBox/>}/>
        <Route path = "/changemoney"  element = {<ChangeMoney/>}/>



      </Routes>
    </>
  );
}

export default App;
