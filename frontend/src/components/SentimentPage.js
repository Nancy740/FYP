import React, { useState } from 'react';
import "../css/sentiment.css";
import Navbar from './Navbar';
import Footer from './Footer';
// import Button from "@mui/material/Button";

const SentimentPage = () => {
  const [answersPart1, setAnswersPart1] = useState(Array(10).fill(""));
  const [answersPart2, setAnswersPart2] = useState(Array(10).fill(""));

  const handleAnswerChange = (part, index, answer) => {
    switch (part) {
      case 'part1':
        const updatedAnswersPart1 = [...answersPart1];
        updatedAnswersPart1[index] = answer;
        setAnswersPart1(updatedAnswersPart1);
        break;
      case 'part2':
        const updatedAnswersPart2 = [...answersPart2];
        updatedAnswersPart2[index] = answer;
        setAnswersPart2(updatedAnswersPart2);
        break;
      default:
        break;
    }
  };

  const submit = async () => {
    var formData={
      "answerpart1": answersPart1,
      "answerpart2": answersPart2,
    };
    console.log(answersPart1);
    try {
      const response = await fetch('http://127.0.0.1:8000/sentiment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  const renderQuestions = (part, questions) => (
    <div className="sentiment">
      {questions.map((question, index) => (
        <div key={index} className="question">
          <p>{question}</p>
          <span>
            <input
              type="radio"
              id={`yes-${part}-${index}`}
              name={`radio-${part}-${index}`}
              checked={getAnswer(part, index) === 'yes'}
              onChange={() => handleAnswerChange(part, index, 'yes')}
            />
            <label htmlFor={`yes-${part}-${index}`} className="radio-label" />

            <input
              type="radio"
              id={`no-${part}-${index}`}
              name={`radio-${part}-${index}`}
              checked={getAnswer(part, index) === 'no'}
              onChange={() => handleAnswerChange(part, index, 'no')}
            />
            <label htmlFor={`no-${part}-${index}`} className="radio-label" />
          </span>
        </div>
      ))}
    </div>
  );

  const getAnswer = (part, index) => {
    switch (part) {
      case 'part1':
        return answersPart1[index];
      case 'part2':
        return answersPart2[index];
      default:
        return null;
    }
  };

  return (
    <>
   
    <div className='sentiment'>
    <Navbar />
    <div className='sentiment-heading'>
      <h2>QUESTIONNAIRES TO PREDICT MENTAL HEALTH</h2>
      </div>
      <div className="sentiment-container">
        <div className='header-container'>
          <h3>Part 1: Physical Well-being</h3>
          <div className="yes-no-container">
            <span>YES</span>
            <span>NO</span>
          </div>
        </div>



      {renderQuestions('part1', [
        '1. Have you experienced changes in your appetite, such as eating much more or much less than usual?',
        '2. Have you noticed changes in your sleep patterns, such as difficulty falling asleep or waking up frequently during the night?',
        '3. Do you frequently experience headaches or migraines?',
        '4. Have you had unexplained aches or pains in your body, such as muscle tension or joint stiffness?',
        '5. Have you noticed changes in your energy levels, such as feeling fatigued or lethargic most of the time?',
        '6. Have you experienced digestive issues, such as stomachaches, nausea, or diarrhea?',
        '7. Have you had changes in your weight, either gaining or losing a significant amount without trying?',
        '8. Do you frequently experience physical symptoms of anxiety, such as a racing heart, sweating, or trembling?',
        '9. Have you noticed changes in your sexual desire or functioning?',
        '10. Do you often feel physically tense or on edge, with your muscles feeling tight or clenched?',
      ])}

      <div className="header-container">
        <h3>Part 2: Emotional Response</h3>
      </div>
      {renderQuestions('part2', [
        '1. Have you been feeling down or depressed most days for the past two weeks?',
        '2. Do you often feel overwhelmed or unable to cope with daily stressors?',
        '3. Have you experienced frequent mood swings, feeling happy one moment and then sad the next?',
        '4. Do you often feel irritable or easily angered, even over minor issues?',
        '5. Have you noticed a decrease in your self-esteem or feelings of worthlessness?',
        '6. Do you frequently experience feelings of guilt or shame?',
        '7. Have you had difficulty enjoying activities or hobbies that you used to find pleasurable?',
        '8. Do you often feel lonely or isolated from others, even when surrounded by people?',
        '9. Have you had trouble expressing your emotions or communicating with others?',
        '10. Do you often worry excessively about the future or have intrusive thoughts about potential negative outcomes?',
      ])}
          </div>
    <button className='submit-button' onClick={submit}>Submit</button>
    </div>
    <Footer />
    </>
  );
};

export default SentimentPage;