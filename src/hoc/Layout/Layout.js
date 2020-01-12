import React from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import {connect} from 'react-redux';

class Layout extends React.Component {
  state = {
    menu: false
  }

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  // Закрывает меню, когда оно активно, при нажатии на затемненный фон
  menuClickHandler = () => {
    this.setState({
      menu: false
    }) 
  }

  render() {
    return (
      <div className={classes.Layout}>

        <Drawer 
          isOpen={this.state.menu}
          onClick={this.menuClickHandler}
          isAuthenticated={this.props.isAuthenticated}
        />

        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.toggleMenu}
        />

        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToPRops(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToPRops)(Layout);