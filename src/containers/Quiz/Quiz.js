import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizesById, updateSetState, renderQuiz, retryQuiz} from '../../store/actions/quiz';
// import axios from '../../axios/axios-quiz';

class Quiz extends React.Component {
  // state = {
  //   AnswerNumber: 0,  // Выступает счетчиком при прохождении по массиву
  //   answerState: null,   // Правильный или неправильный выбор ответа
  //   isFinished: false, // Конец опроса
  //   results: {},      // Общее кол-во правильных ответов
  //   loading: true,
  //   quiz: []
  // }

  // clickAnswer = (answerId) => {
  //   if (this.state.answerState) {
  //     const key = Object.keys(this.state.answerState)[0];
  //     if (this.state.answerState[key] === 'succes') {
  //       return
  //     }
  //   }

  //   const question = this.state.quiz[this.state.AnswerNumber];
  //   const results = this.state.results;
  //   if (question.rightAnswerId == answerId) {

  //     if (!results[question.id]) {
  //       results[question.id] = 'succes';
  //     }

  //     this.setState({
  //       answerState: { [answerId]: 'succes' },
  //       results: results
  //     })

  //     const timeout = window.setTimeout(() => {

  //       if (this.isQuizFinished()) {
  //         this.setState({
  //           isFinished: true
  //         })
  //       } else {
  //         this.setState({
  //           AnswerNumber: this.state.AnswerNumber + 1, // Переход на след.вопрос
  //           answerState: null // Обнулять состояние необходимо, чтобы на след.вопросе не подсвечивался вариант ответа.
  //         })
  //       }

  //       window.clearTimeout(timeout)
  //     }, 1000)
  //   } else {
  //     results[question.id] = 'error';
  //     this.setState({
  //       answerState: { [answerId]: 'error' },
  //       results: results
  //     })
  //   }
  // }

  // Функция проверяет не является ли вопрос последним (true/false)
 

  // updateState = () => {
  //   this.setState({
  //     AnswerNumber: 0,
  //     isFinished: false,
  //     answerState: null,
  //     results: {}
  //   })
  // }

  componentDidMount() {
    this.props.renderQuiz(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>

          { 
            this.props.loading || !this.props.quiz
              ? <Loader />
              : this.props.isFinished
            ? <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              updateState={this.props.updateSetState}
            />
            : <ActiveQuiz
              answers={this.props.quiz[this.props.AnswerNumber].answers}
              question={this.props.quiz[this.props.AnswerNumber].question}
              clickAnswer={this.props.fetchQuizesById}
              numberAnswer={this.props.AnswerNumber + 1} // Увеличиваем, чтобы первый вопрос был 1-м по счету
              quizLength={this.props.quiz.length}     // Длина массива - кол-во вопросов
              state={this.props.answerState}
            />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    AnswerNumber: state.quiz.AnswerNumber,  // Выступает счетчиком при прохождении по массиву
    answerState: state.quiz.answerState,   // Правильный или неправильный выбор ответа
    isFinished: state.quiz.isFinished, // Конец опроса
    results: state.quiz.results,      // Общее кол-во правильных ответов
    quiz: state.quiz.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizesById: answerId => dispatch(fetchQuizesById(answerId)),
    updateSetState: () => dispatch(updateSetState()),
    renderQuiz: id => dispatch(renderQuiz(id)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);