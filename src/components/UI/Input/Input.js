import React from 'react';
import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputTupe = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputTupe}-${Math.random()}`

    if ( isInvalid(props) ) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputTupe}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                    ? <span>{props.errorMessage}</span> || 'Введите верное значение'
                    : null
            }
        </div>
    )
}

export default Input;