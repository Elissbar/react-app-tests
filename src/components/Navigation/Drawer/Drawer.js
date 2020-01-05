import React from 'react';
import classes from './Drawer.module.css';
import { Link } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

const listNav = [
  { to: '/', label: 'Списки', exact: true.toString() },
  { to: '/auth', label: 'Авторизация', exact: false.toString() },
  { to: '/quiz-creater', label: 'Создать тест', exact: false.toString() },
]

class Drawer extends React.Component {

  renderLink() {
    return listNav.map((link, index) => {
      return (
        <li key={index}>
          <Link to={link.to} exact={link.exact} onClick={ this.props.onClick }>
            {link.label}
          </Link>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer,];

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <>
        <nav className={cls.join(' ')} >
          <ul>
            {this.renderLink()}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClick} /> : null}
      </>
    )
  }
}

export default Drawer;