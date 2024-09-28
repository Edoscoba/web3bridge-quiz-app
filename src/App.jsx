import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Score from './components/Score'
import Questions from './components/Questions';
import qBank from './components/QuestionHolder';


const App = () => {
 const [questions, setQuestions] = useState(qBank);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);

const [timer, setTimer] = useState(10); 
const [quizStarted, setQuizStarted] = useState(false);
const [isLastq, setIsLastq]=useState(false)


  useEffect(() => {
    if (quizStarted) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setCurrentQuestion(prevQuestion => prevQuestion + 1);
            return 10
          }
        })
      }, 1000);
      
      return () => clearInterval(interval)
     
         
       };
  }, [currentQuestion, quizStarted]);
  const handleAQnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScores(prevScore => prevScore + 1);
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestion + 2 === questions.length) {
      setIsLastq(true)
    }
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setTimer(10);
  }
  const startQuiz = () => {
    setQuizStarted(true)
  }
  return (

	<div className="card container mt-2 
		d-flex justify-content-center 
		align-items-center"
		style={{ maxWidth: '600px', margin: '0 auto' }}>
	<h1 className="text-success mt-2">Web3bridge quiz</h1>
	<h3 className=" mt-2">Quiz App</h3>
	<div>
		
		{!quizStarted ? (
		<div>
			<div className="card-body">
				<h2 className="card-title">Start Test</h2>
				<button className="btn btn-primary"
				onClick={startQuiz}>
				Start Test
				</button>
			</div>
		</div>
		) : currentQuestion < questions.length ? (
		<Questions
			questions={questions}
			handleNextQuestion={handleNextQuestion}
			currentQuestion={currentQuestion}
			handleAQnswerClick={handleAQnswerClick}
			timer={timer}
			isLastq={isLastq}
		/>
		) : (
		<Score
			score={score}
			setScore={setScore}
			setCurrentQuestion={setCurrentQuestion}
			setQuizStarted={setQuizStarted}
			setIsLastq={setIsLastq}
			setTimer={setTimer}		 
		/>
		)}
	</div>
	</div>
);
};

export default App