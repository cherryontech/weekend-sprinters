import Head from 'next/head'
import styles from '@/styles/Quiz.module.css'
import content from '../components/content.js'
import {useState} from 'react';
import Link from 'next/link'
import Navbar from '../components/navbar.js';


export default function Quiz() {

const [currentQuestion, setCurrentQuestion] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState([]);
const [progress, setProgress] = useState(0); // new addition 4/8/23


/* handles the 'previous' button onClick */
const clickPrevious = () => {
  const previousQuestion = currentQuestion - 1;
  previousQuestion >= 0 && setCurrentQuestion(previousQuestion);
  const progress = (((currentQuestion +1) - 1) / content.length) * 100; // new addition 4/8/23
  setProgress(progress); // new addition 4/8/23
};

/* handles the 'next' button onClick */
const clickNext = () => {
  const nextQuestion = currentQuestion + 1;
  nextQuestion < content.length && setCurrentQuestion(nextQuestion);
  const progress = (((currentQuestion +1) + 1) / content.length) * 100;

  setProgress(progress); // new addition 4/8/23
};

const handleSelectedAnswer = (answer) => {
  setSelectedAnswer([
    (selectedAnswer[currentQuestion] = { userAnswer: answer})

  ]);
    setSelectedAnswer([...selectedAnswer]);
    console.log(selectedAnswer);
};

const showResults = () => {
  window.location.href = '/results';
}

  return (
    <>
      <Head>
        <title>Burnout Buster</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        {/* EXIT BUTTON */}
        <div>
          <Link className={styles.exit_button} href="/" align="right">EXIT</Link>
        </div>


        {/* QUESTIONS */}
        <div className={styles.quiz_statement}>
          <h1>{content[currentQuestion].question}</h1>
        </div>

        <div className={styles.quiz_answers}>
          {/* PREVIOUS BUTTON */}
          <div className='prev-btn'>
            <button className={styles.prev_btn} onClick={clickPrevious}><span>&#60;</span></button>
          </div>

          <h2 className={styles.answer_titles}>Disagreed</h2>

          {/* ANSWERS INPUTS */}
          {content[currentQuestion].quizAnswers.map((answer, index )=> (
              <div key={index} className="answers" onClick={(e) => handleSelectedAnswer(answer.answer)}>
                <input type="radio" name={answer.answer} value={answer.answer}
                onChange ={(e) => handleSelectedAnswer(answer.answer)}
                checked ={answer.answer === selectedAnswer[currentQuestion]?.userAnswer}
                className={styles.answerBtns}/>
              </div>
          ))}

          <h2 className={styles.answer_titles}>Agreed</h2>

          {/* NEXT BUTTON */}
          <div>
            <div className='next-btn'>
              <button className={styles.next_btn} onClick={ currentQuestion + 1 === content.length ? showResults : clickNext}><span>&#62;</span></button>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div>
          <ProgressBar progress={progress} />
          <h3>{`${currentQuestion + 1} / ${content.length}`}</h3>
        </div>
      </main>
    </>
  )
}


function ProgressBar({ progress }) { // new addition 4/8/23
  return (
    <div className={styles.progress_bar}>
      <div
        className={styles.user_progress}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
