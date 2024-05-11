from tensorflow.keras.preprocessing.text import Tokenizer
import pandas as pd
from nltk.stem.wordnet import WordNetLemmatizer
import nltk
from tensorflow import keras


import re # import regex

def preprocess_data(data):
    data = data.drop_duplicates(subset=['text'], keep='first')

    # Remove emojis from data
    data = data.astype(str).apply(lambda x: x.str.encode('ascii', 'ignore').str.decode('ascii'))

    # Remove emoticons as stopwords so it will happen when tokenizing our sentences hence not needed here

    # Remove urls
    def remove_username_link_nums(text):
        text = re.sub('@[^\s]+', '', text)
        text = re.sub('http[^\s]+', '', text)
        text = re.sub(r'\d+', '', text)
        return text

    data['text'] = data['text'].apply(remove_username_link_nums)

    # # turn text to lowercase
    data['text'] = data['text'].map(lambda x: x.lower())

    # Remove stopwords and lemmatize the text
    lem = WordNetLemmatizer()
    def remove_stopwords(text):
        tokens = []
        for token in text.split():
            if token not in stpwrd:
                tokens.append(lem.lemmatize(token, "v"))

        return  " ".join(tokens)

    data.text = data.text.apply(lambda x: remove_stopwords(x))


    return data

# nltk works 
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')
emoticons = [":)", ':-)', ': )', ':D', '=)', ':(', ':-(', ': (']
stpwrd = nltk.corpus.stopwords.words('english')
stpwrd.extend(emoticons)


# get train_examples
columns = ["target", "ids", "date", "flag", "user", "text"]
training_data = pd.read_csv('backend/model/training.1600000.processed.noemoticon.csv', encoding='latin_1', names=columns)
train_neg = training_data[:800000]
train_pos = training_data[800000:]
train_neg = preprocess_data(train_neg.drop(['ids', 'date', 'flag', 'user'], axis=1))
train_pos = preprocess_data(train_pos.drop(['ids', 'date', 'flag', 'user'], axis=1))
train_examples =pd.concat([train_neg, train_pos])

tokenizer = Tokenizer()
tokenizer.fit_on_texts(train_examples.text)

# load model
# loaded_model = keras.models.load_model('backend/model/Sentiment_LSTM_model.h5')                                                   
loaded_model = keras.models.load_model('backend/model/sentiment_2.h5')                                                   
