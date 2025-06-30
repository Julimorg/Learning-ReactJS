import DateCounter from './DateCounter';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import Questions from './Questions';
import { useEffect, useReducer } from 'react';
import '../Quizz/index.css';
import StartScreen from './StartScreen';

const initialState = {
  questions: [],
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case  "start":
      return {...state, status: "active"};

    default:
      throw new Error('Action Unknown');
  }
}

function QuizzPage() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          dispatch({ type: 'dataReceived', payload: data });
        } else {
          dispatch({ type: 'dataFailed' });
        }
      } catch (e) {
        console.error(e);
        dispatch({ type: 'dataFailed' });
        
      }
    }
    fetchQuestion();
  }, []);

  return (
    <>
      <div className="main">
        <Header />
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen  />}
        </Main>
        <h1>{status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen 
                                  numQuestions = {numQuestions}
                                  dispatch = {dispatch}
                                  />}
          {status === 'active' && <Questions/>}
          </h1>
      </div>
    </>
  );
}

export default QuizzPage;