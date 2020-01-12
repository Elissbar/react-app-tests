import React from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/BUTTON/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
// import axios from 'axios';
import {connect} from 'react-redux';
import {auth} from '../../store/actions/auth'

class Auth extends React.Component {

  state = {
    isFormsValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false, // По умолчанию - false, так как строка пустая. Т.е. нельзя отправить пустую строку
        touched: false, // Проверка было ли затронуто поле пользователем
        validation: {
          required: true, // Обязательное поле
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false, // По умолчанию - false, так как строка пустая. Т.е. нельзя отправить пустую строку
        touched: false, // Проверка было ли затронуто поле пользователем
        validation: {
          required: true, // Обязательное поле
          minLength: 6,
        }
      }
    }
  }

  submitHandler = event => {
    event.preventDefault()
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true
    // }
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDg1TE78lBNbn8yBIXv8LiKAKI09QdnY8s', authData)

    //   console.log(response.data.email);
    // } catch (e) {
    //   console.error(e)
    // }
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true
    // }
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDg1TE78lBNbn8yBIXv8LiKAKI09QdnY8s', authData)

    //   console.log(response.data);
    // } catch (e) {
    //   console.error(e)
    // }
  }

  validControl = (value, validation) => {
    if (!validation) { // Если объект пуст - не нужно валидировать
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid // Библиотека is_js проверяет правильность email
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;

  }

  onChangeHandler = (event, contorlName) => {
    const formControls = { ...this.state.formControls }; // Клонируем объект
    const control = { ...formControls[contorlName] }; // Клонируем объект

    // Перезаписываем значение
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validControl(control.value, control.validation); // Вернется true в случае правильного ввода - false наоборот

    formControls[contorlName] = control; // contorlName имя объекта. Так мы перезаписываем старые объекты с новыми значениями

    let isFormsValid = true;
    Object.keys(formControls).forEach(name => {
      isFormsValid = formControls[name].valid && isFormsValid // Блокировка кнопок при некорректном вводе
    })

    this.setState({
      formControls, // Заменяем старый объект на новый
      isFormsValid
    })
  }
  renderInputs() {
    return Object.keys(this.state.formControls).map((contorlName, index) => {
      const contol = this.state.formControls[contorlName];
      return (
        <Input
          key={contorlName + index}
          value={contol.value}
          type={contol.type}
          label={contol.label}
          errorMessage={contol.errorMessage}
          shouldValidate={true}
          valid={contol.valid}
          touched={contol.touched}
          onChange={event => this.onChangeHandler(event, contorlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>

            {this.renderInputs()}

            <Button
              type='succes'
              onClick={this.loginHandler}
              disabled={!this.state.isFormsValid}
            >
              Войти
            </Button>

            <Button
              type='primary'
              onClick={this.registerHandler}
              disabled={!this.state.isFormsValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);