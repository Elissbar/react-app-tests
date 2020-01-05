import React from 'react';
import classes from './AnswerItem.module.css';

const AnswerItem = props => {
  let liClasses = [classes.AnswerItem, ];
  if (props.state) {
    liClasses.push(classes[props.state])
  }

  return (
    <li className={ liClasses.join(' ') } onClick={() => props.clickAnswer(props.answer.id)}>
      { props.answer.text }
    </li>
  )
}

export default AnswerItem;