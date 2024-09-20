import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quizes.css';
import Sidebar from '../../components/Sidebar/Sidebar';

const Quizes = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [marks, setMarks] = useState(0);
  const [showFailPopup, setShowFailPopup] = useState(false);

  const navigate = useNavigate();

  const subjects = ['Mathematics', 'Science', 'English'];

  const getQuizDataForSubject = (subject) => {
    const quizQuestions = {
      Mathematics: [
        { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
        { question: 'What is the square root of 16?', options: ['2', '3', '4', '5'], correctAnswer: '4' },
        { question: 'What is 7 x 6?', options: ['42', '36', '48', '54'], correctAnswer: '42' },
        { question: 'What is 15% of 200?', options: ['20', '30', '40', '50'], correctAnswer: '30' },
        { question: 'What is 100 divided by 4?', options: ['20', '25', '30', '40'], correctAnswer: '25' },
      ],
      Science: [
        { question: 'What is the chemical symbol for water l? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sequi perspiciatis impedit commodi ab. Quaerat rem itaque et voluptatum atque ipsum incidunt corrupti libero voluptatem veritatis, quasi consequatur, voluptate nemo est autem non a iusto provident? Adipisci odit nisi ducimus quo libero natus, impedit aperiam nesciunt! Vitae sunt veritatis temporibus hic placeat tempora recusandae distinctio rerum ab. Est nemo numquam laboriosam harum sequi, debitis, vel consequuntur odio voluptatibus, eveniet tempore voluptatum vitae praesentium quo ad natus dolorum mollitia nostrum repellendus! Error, perspiciatis architecto incidunt ipsum repellat totam dolore modi minima consequatur esse nemo eius a illum tempore ad magnam eveniet omnis recusandae cupiditate. A fugiat natus nihil, ducimus doloribus repudiandae exercitationem voluptatem qui eaque corrupti iusto perferendis voluptates excepturi, ex molestias autem, eius pariatur illum cum! Minima atque officia alias sit optio, magni labore cumque molestias magnam dolorem iste hic sequi assumenda odio perferendis nemo, aliquid voluptates illo corrupti corporis. Sapiente aperiam consequuntur modi dolor tempore iure reiciendis itaque nam repellendus, autem quisquam voluptatibus corporis quo tenetur ea ratione cum nihil. Doloribus quae, explicabo veniam fugit, iure aliquam cum facere dolore in repudiandae quis? Reprehenderit adipisci maiores nostrum iusto! Dicta, facilis laudantium id cumque ea provident dolorem excepturi nisi doloribus porro deleniti voluptates amet, fugit quam natus, earum non! Facilis libero asperiores veritatis fuga maiores quis recusandae incidunt quos ad id autem iste, beatae deleniti et? Culpa, aperiam? Tempora fugit adipisci nam odit incidunt illo aliquid temporibus maxime laborum itaque officia quae perferendis dolorem delectus, molestias numquam blanditiis assumenda dolores?', options: ['O2', 'H2O', 'CO2', 'H2'], correctAnswer: 'H2O' },
        { question: 'What planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], correctAnswer: 'Mars' },
        { question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 'Carbon Dioxide' },
        { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'], correctAnswer: 'Mitochondria' },
        { question: 'What is the speed of light?', options: ['300,000 km/s', '150,000 km/s', '400,000 km/s', '500,000 km/s'], correctAnswer: '300,000 km/s' },
      ],
      English: [
        { question: 'What is the synonym of "happy"?', options: ['Sad', 'Joyful', 'Angry', 'Excited'], correctAnswer: 'Joyful' },
        { question: 'Which word is an adjective?', options: ['Run', 'Quickly', 'Beautiful', 'Happiness'], correctAnswer: 'Beautiful' },
        { question: 'What is the opposite of "cold"?', options: ['Chilly', 'Hot', 'Cool', 'Warm'], correctAnswer: 'Hot' },
        { question: 'What is the plural of "child"?', options: ['Childs', 'Children', 'Childes', 'Childern'], correctAnswer: 'Children' },
        { question: 'Which sentence is correct?', options: ['He go to school', 'He goes to school', 'He going to school', 'He gone to school'], correctAnswer: 'He goes to school' },
      ],
    };

    return quizQuestions[subject] || null; // Return null if subject is invalid
  };

  const handleSubjectSelect = (event) => {
    const subject = event.target.value;
    if (subject) {
      const data = getQuizDataForSubject(subject);
      if (data) {
        setSelectedSubject(subject);
        setQuizData(data);
        setUserAnswers({}); // Reset user answers when selecting a new subject
      } else {
        console.error('Invalid subject selected');
      }
    } else {
      setSelectedSubject('');
      setQuizData(null);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const handleSubmitQuiz = () => {
    setShowSubmitPopup(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitPopup(false);
    if (quizData) {
      // Calculate marks
      let correctAnswers = 0;
      quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      const calculatedMarks = (correctAnswers / quizData.length) * 100;
      setMarks(calculatedMarks);

      if (calculatedMarks < 40) {
        setShowFailPopup(true);
      } else {
        setShowResultPopup(true);
      }
    }
  };

  const handleCloseResult = () => {
    setShowResultPopup(false);
    navigate('/');
  };

  return (
    <div className="quiz-layout">
      <Sidebar id="sidebar" />
      <div className='quiz-container'>
        
        <h1 className='quiz-header'>Quizzes</h1>
        <select className='subject-select' value={selectedSubject} onChange={handleSubjectSelect}>
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        {quizData && (
          <div className='quiz-content'>
            <h2 className='quiz-question'>{selectedSubject} Quiz</h2>
            {quizData.map((question, index) => (
              <div key={index}>
                <h3>{question.question}</h3>
                <ul className='quiz-options'>
                  {question.options.map((option) => (
                    <li className='quiz-option' key={option}>
                      <input
                        type="radio"
                        name={`question_${index}`}

                        value={option}
                        checked={userAnswers[index] === option}
                        onChange={() => handleAnswerSelect(index, option)}
                      />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button className='quiz-submit-button' onClick={handleSubmitQuiz}>Submit Quiz</button>
          </div>
        )}

        {showSubmitPopup && (
          <div>
            <h3>Are you sure you want to submit the quiz?</h3>
            <button onClick={handleConfirmSubmit}>Yes</button>
            <button onClick={() => setShowSubmitPopup(false)}>No</button>
          </div>
        )}
{showSubmitPopup && (
  <div className="popup-overlay">
    <div className="popup-container">
      <h3>Are you sure you want to submit the quiz?</h3>
      <button onClick={handleConfirmSubmit}>Yes</button>
      <button onClick={() => setShowSubmitPopup(false)}>No</button>
    </div>
  </div>
)}


        {showFailPopup && (
          <div className='fail-popup'>
            <h3>You failed the quiz.</h3>
            <p>Please reattempt.</p>
            <button onClick={() => setShowFailPopup(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizes;