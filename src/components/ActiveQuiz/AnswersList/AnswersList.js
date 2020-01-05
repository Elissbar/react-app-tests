import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => (
  <ul className={classes.AnswersList}>
    { props.answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          answer={answer}
          clickAnswer={props.clickAnswer}
          state={props.state ? props.state[answer.id] : null} // Получаем значение в объекте по ключу(id) итерируемого элемента -- props.state[answer.id]
        />
      )
    }) }
  </ul>
)

export default AnswersList;