import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/sentiment.css';

const SentimentPage = () => {
  const [answersPart1, setAnswersPart1] = useState({});
  const [answersPart2, setAnswersPart2] = useState({});
  const [answersPart3, setAnswersPart3] = useState({});

  const handleAnswerChange = (part, questionIndex, answer) => {
    switch (part) {
      case 'part1':
        setAnswersPart1((prevAnswers) => ({ ...prevAnswers, [questionIndex]: answer }));
        break;
      case 'part2':
        setAnswersPart2((prevAnswers) => ({ ...prevAnswers, [questionIndex]: answer }));
        break;
      case 'part3':
        setAnswersPart3((prevAnswers) => ({ ...prevAnswers, [questionIndex]: answer }));
        break;
      default:
        break;
    }
  };

  const renderQuestions = (part, questions) => (
    <div className="questions-container">
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <span className="question">{question}</span>
          <span className="radio-options">
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
      case 'part3':
        return answersPart3[index];
      default:
        return null;
    }
  };

 return (
    <div>
        <h2>QUESTIONNAIRES TO PREDICT MENTAL HEALTH</h2>
        <div className='sentiment-container'>
        <h3>Part 1: Physical Well-being</h3> 
        <span>YES</span> <span>NO</span>
        </div>
        {renderQuestions("part1", [
        "1. I do not tire quickly.",
        "2. I am troubled by attacks of nausea.",
        "3. I have very few headaches.",
        "4. I sweat very easily even on cool days.",
        "5. Sometimes when embarrassed, I break out in a sweat.",
        "6. I hardly ever notice my heart pounding, and I am seldom short of breath.",
        "7. I am flush with embarrassment no more often than others.",
        "8. I practically never feel embarrassed.",
        "9. I frequently notice my hand shakes when I try to do something.",
        "10. I have diarrhea once a month or more."
    ])}

        <div className='sentiment-container'>
        <h3>Part 2: Physical Well-being and Tension</h3>
        </div>
        {renderQuestions("part2", [
        "1. I cannot keep my mind on one thing.",
        "2. I work under a great deal of tension.",
        "3. I worry quite a bit over possible misfortunes.",
        "4. I worry over money and business.",
        "5. I believe I am no more nervous than most others.",
        "6. How often do you find it challenging to concentrate on tasks due to racing thoughts?",
        "7. Are you frequently aware of tension or stress in your shoulders, neck, or other parts of your body?",
        "8. Do worries about potential misfortunes affect your sleep or daily activities?",
        "9. How much time do you spend thinking about financial concerns on a daily basis?",
        "10. On a scale of 1 to 10, with 10 being the most nervous, how would you rate your typical level of nervousness compared to others?"
    ])}

        <div className='sentiment-container'>
        <h3>Part 2: Emotional Response</h3>
        </div>
        {renderQuestions("part3", [
         "1. Do you often notice your hands trembling or shaking when you're trying to perform tasks that require fine motor skills or focus?",
         "2. In comparison to others, do you find that your skin changes color (e.g., blushing) in a way consistent with typical emotional responses?",
         "3. Rarely do I experience changes in skin color, such as blushing, even in situations that might typically elicit such responses from others. Is this true for you?",
         "4. When faced with embarrassment, do you often find yourself breaking out in a noticeable sweat?",
         "5. Is it accurate to say that you seldom perceive any notable increase in your heartbeat, and instances of shortness of breath are infrequent even during situations that may induce stress or anxiety?",
         "6. How often do you observe your hands trembling or shaking when engaged in activities that require focus or concentration? Is this a frequent experience for you?",
         "7. In terms of changes in skin color, do you notice a similar frequency as others in response to emotional or situational triggers?",
         "8. Do you infrequently experience changes in skin color, such as blushing, even in circumstances where it might be considered a common response?",
         "9. During moments of embarrassment or heightened emotion, do you often find yourself breaking out in a visible sweat?",
         "10. Are instances of heightened heartbeat and shortness of breath seldom observed, even in situations that might typically induce stress or anxiety?"
    ])}

    <button>Submit</button>
    </div>
  
  );
};

export default SentimentPage;
