import React from 'react';
import classes from './QuizCreater.module.css';
import Button from '../../components/UI/BUTTON/Button';
import Input from '../../components/UI/Input/Input';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'
// import axios from '../../axios/axios-quiz';

function createOptionControl(number) {
  return createControl(
    { label: `Вариант ${number}`, errorMessage: 'Значение не может быть пустым', id: number },
    { required: true }
  )
}

function createFormControl() {
  return {
    question: createControl(
      { label: `Вариант вопроса`, errorMessage: 'Вопрос не может быть пустым' },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreater extends React.Component {

  state = {
    // quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formsControl: createFormControl()
  }

  submitHandler = event => {
    event.preventDefault();
  }

  addQuestionHandler = event => {
    event.preventDefault();

    // const quiz = this.state.quiz.concat();
    // const index = quiz.length ;
    const rightAnswerId = this.state.rightAnswerId;

    const { question, option1, option2, option3, option4 } = this.state.formsControl;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ]
    }

    this.props.createQuizQuestion(questionItem)
    // quiz.push(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formsControl: createFormControl()
    })
  }

  createQuizHandler = event => {
    event.preventDefault();

    this.props.finishCreateQuiz()
  
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formsControl: createFormControl()
    })


  }

  changeHandler = (value, name) => {
    const formsControl = { ...this.state.formsControl }; // Клонируем объект
    const control = { ...formsControl[name] }; // Клонируем объект

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation)

    formsControl[name] = control;

    this.setState({
      formsControl,
      isFormValid: validateForm(formsControl)
    })
  }

  renderControls() {
    return Object.keys(this.state.formsControl).map((controlName, index) => {
      const control = this.state.formsControl[controlName];

      return (
        <>
          <Input
            key={index.toString()}
            label={control.label}
            errorMessage={control.errorMessage}
            value={control.value}
            touched={control.touched}
            valid={control.valid}
            shouldValidate={!!control.validation}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </>
      )
    })
  }

  changeSelectHandler = event => {
    this.setState({
      rightAnswerId: event.target.value
    })
  }

  render() {
    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId}
      onChange={this.changeSelectHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />

    return (
      <div className={classes.QuizCreater}>
        <div>
          <h1>Создать тест</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            {select}

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              type='succes'
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreater);