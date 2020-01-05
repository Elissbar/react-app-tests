import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz';

class Quiz extends React.Component {
  state = {
    AnswerNumber: 0,  // Выступает счетчиком при прохождении по массиву
    answerState: null,   // Правильный или неправильный выбор ответа
    isFinished: false, // Конец опроса
    results: {},      // Общее кол-во правильных ответов
    loading: true,
    quiz: [
    ]
  }

  clickAnswer = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'succes') {
        return
      }
    }

    const question = this.state.quiz[this.state.AnswerNumber];
    const results = this.state.results;
    if (question.rightAnswerId == answerId) {

      if (!results[question.id]) {
        results[question.id] = 'succes';
      }

      this.setState({
        answerState: { [answerId]: 'succes' },
        results: results
      })

      const timeout = window.setTimeout(() => {

        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            AnswerNumber: this.state.AnswerNumber + 1, // Переход на след.вопрос
            answerState: null // Обнулять состояние необходимо, чтобы на след.вопросе не подсвечивался вариант ответа.
          })
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results: results
      })
    }
  }

  // Функция проверяет не является ли вопрос последним (true/false)
  isQuizFinished = () => {
    return this.state.quiz.length === this.state.AnswerNumber + 1;
  }

  updateState = () => {
    this.setState({
      AnswerNumber: 0,
      isFinished: false,
      answerState: null,
      results: {}
    })
  }

  async componentDidMount() {
    console.log(this.props.match.params)
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      const quiz = response.data;

      this.setState({
        quiz, 
        loading: false
      })
    } catch(e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>

          { 
            this.state.loading
              ? <Loader />
              : this.state.isFinished
            ? <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              updateState={this.updateState}
            />
            : <ActiveQuiz
              answers={this.state.quiz[this.state.AnswerNumber].answers}
              question={this.state.quiz[this.state.AnswerNumber].question}
              clickAnswer={this.clickAnswer}
              numberAnswer={this.state.AnswerNumber + 1} // Увеличиваем, чтобы первый вопрос был 1-м по счету
              quizLength={this.state.quiz.length}     // Длина массива - кол-во вопросов
              state={this.state.answerState}
            />
          }
        </div>
      </div>
    )
  }
}

export default Quiz;