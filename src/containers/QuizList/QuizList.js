import React from 'react';
import classes from './QuizList.module.css';
import { Link } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

class QuizList extends React.Component {
  renderQuizes() {
    return this.props.quizes.map((item, index) => {
      return (
        <li key={item.id}>

          <Link to={'/quiz/' + item.id}>
            {item.name}
          </Link>

        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {/*  Прелоадер будет работать пока state.loading == true */}
          {
            this.props.loading 
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

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);