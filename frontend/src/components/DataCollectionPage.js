import React from 'react';
import SentimentPage from './SentimentPage';

const DataCollectionPage = () => {
  const handleFormSubmit = async (responses) => {
    try {
      const response = await fetch('https://your-backend-api.com/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error during data submission:', error);
    }

  };

  return (
    <div>
      <h2>Collect Data for Training</h2>
      <SentimentPage onSubmit={handleFormSubmit} />
     
    </div>
  );
};

export default DataCollectionPage;
