# -*- coding: utf-8 -*-
"""NLP_twitter_sentiment_analysis.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/13euacbLdukv1VuQXHZdOUEYL5hreoHjH

## Importing Essentials
"""


import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras

# Tensorflow NLP kit(only so much for our needs)
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout, Bidirectional
from tensorflow.keras.preprocessing.text import Tokenizer

# Classification metric
from sklearn.metrics import classification_report

def test():

    # NLTK NLP kit(only so much for our needs)
    import nltk
    nltk.download('stopwords')
    nltk.download('wordnet')
    from nltk.corpus import stopwords
    from nltk.stem.wordnet import WordNetLemmatizer
    # Visualization
    from wordcloud import WordCloud
    import matplotlib.pyplot as plt
    
    columns = ["target", "ids", "date", "flag", "user", "text"]
    training_data = pd.read_csv('../../csv_files/training.1600000.processed.noemoticon.csv', encoding='latin_1', names=columns)
    testing_data = pd.read_csv('../../csv_files/testdata.manual.2009.06.14.csv', encoding='latin_1', names=columns)
    training_data.head()
    
    """## Cleaning the data/ Preprocessing"""
    
    # print(stopwords.words('english'))
    emoticons = [":)", ':-)', ': )', ':D', '=)', ':(', ':-(', ': (']
    stpwrd = nltk.corpus.stopwords.words('english')
    stpwrd.extend(emoticons)
    
    # print(stpwrd)
    
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
    
    """## Analysing our main data
    It is essential that we take a look at the data we're finally going to use for building our model.
    We'll also divide our data into testing and training data without wasting any more time.
    """
    
    train_neg = training_data[:10000]
    train_pos = training_data[1590000:]
    
    test_neg = training_data[10000:12000]
    test_pos = training_data[1588000:1590000]
    
    test_neg = preprocess_data(test_neg.drop(['ids', 'date', 'flag', 'user'], axis=1))
    test_pos = preprocess_data(test_pos.drop(['ids', 'date', 'flag', 'user'], axis=1))
    train_neg = preprocess_data(train_neg.drop(['ids', 'date', 'flag', 'user'], axis=1))
    train_pos = preprocess_data(train_pos.drop(['ids', 'date', 'flag', 'user'], axis=1))
    
    train_neg.shape
    
    train_examples =pd.concat([train_neg, train_pos])
    test_examples =pd.concat([test_neg, test_pos])
    
    train_examples.shape
    
    test_examples.shape
    
    # Fix : The following code would run without any error but with new update of nltk, wordprocessng not done without omw
    nltk.download('omw-1.4')
    
    train_data = preprocess_data(training_data.drop(['ids', 'date', 'flag', 'user'], axis=1))
    test_data = preprocess_data(testing_data.drop(['ids', 'date', 'flag', 'user'], axis=1))
    
    train_data.head()
    
    # taking care of missing data
    train_data.isna().sum().sort_values()
    # since no data is missing, let's move on with the workflow
    
    # print(train_examples.groupby('target').size())
    
    # print(test_examples.groupby('target').size())
    
    # print(test_examples.groupby('target').size())
    
    print(f"Shape of training data : {train_data.shape}")
    
    train_examples.shape
    
    
    
    """## Start tokenizing our tweets!
    We're done organizing our data.
    The next task is to tokenize our data to make to "assign meaning to words".
    Tokenization is where the actual nlp begins i.e. step no. 1.
    """
    
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(train_examples.text)
    
    vocab_size = len(tokenizer.word_index) + 1
    embedding_dim = 16
    max_length = 50
    trunc_type='post'
    padding_type='post'
    oov_tok = "<OOV>"
    training_portion = .8
    
    train_sequences = tokenizer.texts_to_sequences(train_examples.text)
    test_sequences = tokenizer.texts_to_sequences(test_examples.text)
    
    X_train = pad_sequences(train_sequences, maxlen = max_length, padding = padding_type)
    
    X_test = pad_sequences(test_sequences, maxlen = max_length, padding = padding_type)
    
    word_index = tokenizer.word_index
    
    len(word_index)
    
    X_train.shape
    
    test_data.head()
    
    y_train = train_examples.target.replace({'0': 0, '4' : 1}).values
    y_test = test_examples.target.replace({'0': 0, '4' : 1, '2':1}).values
    
    y_test.dtype
    
    import pickle
    with open('tokenizer.pickle', 'wb') as handle:
        pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
    
    """## Word2Vec
    Word2vec is a technique for NLP. This algorithm uses a neural network model to learn word associations. This may also be called word embedding in various texts.
    For our purpose and to make the project easy, we will make use of Gensim, which will help us to develop word embeddings.
    """
    
    # Word2Vec
    import gensim
    
    # WORD2VEC
    W2V_SIZE = 228
    W2V_WINDOW = 7
    W2V_EPOCH = 10
    W2V_MIN_COUNT = 10
    
    documents = [_text.split() for _text in train_examples.text]
    w2v_model = gensim.models.word2vec.Word2Vec(vector_size=W2V_SIZE,
                                                window=W2V_WINDOW,
                                                min_count=W2V_MIN_COUNT,
                                                workers=8)
    w2v_model.build_vocab(documents)
    
    words = w2v_model.wv.key_to_index.keys()
    vocab_size = len(words)
    print("Vocab size", vocab_size)
    
    w2v_model.train(documents, total_examples=len(documents), epochs=W2V_EPOCH)
    
    w2v_model.wv.most_similar("laugh")
    
    # Embedding matrix for the embedding layer
    embedding_matrix = np.zeros((vocab_size+1, W2V_SIZE))
    for word, i in tokenizer.word_index.items():
        if word in w2v_model.wv:
            embedding_matrix[i] = w2v_model.wv[word]
    # print(embedding_matrix.shape)
    
    """## Building our NLP model using LSTM
    LSTM (Long short-term memory) are special kinds of RNN, these are  designed to have a long-term memory making them capable of understanding the context better.
    Will these help us understand the context or sentiment of our tweets better, or not?
    There are previously many models built using different algorithms; let's see if using LSTMs make a staggering difference.
    """
    
    model_1 = tf.keras.models.Sequential([
                                          tf.keras.layers.Embedding(vocab_size+1, W2V_SIZE, weights=[embedding_matrix], input_length=max_length, trainable=False),
                                          tf.keras.layers.Bidirectional(LSTM(128, return_sequences=True)),
                                          tf.keras.layers.Dropout(0.2),
                                          tf.keras.layers.Bidirectional(LSTM(128)),
                                          tf.keras.layers.Dropout(0.2),
                                          tf.keras.layers.Dense(64, activation='relu'),
                                          tf.keras.layers.Dense(1, activation='sigmoid')
    
    ], name='Bidirectional_LSTM_1')
    
    model_1.summary()
    
    test_data.dtypes
    
    model_1.compile(loss='binary_crossentropy',
                  optimizer="adam",
                  metrics=['accuracy'])
    
    print("model training")
    history = model_1.fit(X_train, y_train, batch_size = 32, epochs=50, validation_data=(X_test, y_test), verbose=1)
    
    y_pred = model_1.predict(X_test)
    y_pred = np.where(y_pred>0.5, 1, 0)
    
    # """## Computational limitations
    # This project was built with zero monetary investment. The model performed with over an accuracy of 83% which is not much but the sample size taken was very small and the complexity of the RNN was very simple to make this model work fast. Training time ~ 10 mins for word vector, and RNN combined. This could have performed better with a better GPU and memory investment.
    # """
    
    # print(classification_report(y_test, y_pred))
    
    model_1.save('Sentiment_LSTM_model.h5')
    # with open('trainHistoryDict', 'wb') as file_pi:
    #     pickle.dump(history.history, file_pi)
    
    # from keras.models import load_model
    # # model_1 = load_model('Sentiment_LSTM_model.h5')
    # # loading tokenizer
    # with open('trainHistoryDict', 'rb') as file_pi:
    #     history = pickle.load(file_pi)
    
    # history.keys()
    
    # plt.figure(figsize=(10,5))
    # plt.plot(history['accuracy'])
    # plt.plot(history['val_accuracy'])
    # plt.title('model accuracy')
    # plt.ylabel('accuracy')
    # plt.xlabel('epoch')
    # plt.legend(['Train accuracy', 'Test accuracy'], loc='lower right')
    # plt.show()
    # # History for loss
    # plt.figure(figsize=(10,5))
    # plt.plot(history['loss'])
    # plt.plot(history['val_loss'])
    # plt.title('model loss')
    # plt.ylabel('loss')
    # plt.xlabel('epoch')
    # plt.legend(['Train loss', 'Test loss'], loc='upper right')
    # plt.suptitle('Accuracy and loss for second model')
    # plt.show()
    
    # from keras.models import load_model
    # model_1 = load_model('backend/model/Sentiment_LSTM_model.h5')                                                   
    def predict(text, include_neutral=True):
        # Tokenize text
        x_test = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=max_length)
        print("x_test", x_test)
        # Predict
        score = model_1.predict([x_test])[0]
        if(score >=0.4 and score<=0.6):
            label = "Neutral"
        elif(score >=0.4):
            label = "Negative"
        elif(score <=0.6):
            label = "Positive"
    
        return {"label" : label,
            "score": float(score)}
    
    print(predict(" i love everyone"))
    
    predict(" i hate twitter")
    
    predict("it is good to show love")
    
    predict("I love how idiots are never killed in movies")
    
    predict('No I havent had trouble expressing my emotions or communicating with others')
