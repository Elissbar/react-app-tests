import React from 'react';
import classes from './QuizList.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

class QuizList extends React.Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map((item, index) => {
      return (
        <li key={item.id}>

          <Link to={'/quiz/' + item.id}>
            {item.name}
          </Link>

        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://react-quiz-559fd.firebaseio.com/quizes.json');

      let quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })

      this.setState({
        quizes,
        loading: false // После того как тесты загрузятся из БД прелодер == false
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {/*  Прелоадер будет работать пока state.loading == true */}
          {
            this.state.loading
              ? <Loader />
              : <ul>
                  {this.renderQuizes()}
                </ul>
          }
        </div>
      </div>
    )
  }
}

export default QuizList;