import React, { Component } from 'react';
import Statistics from '../components/Statistics';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      clicked: false,
      showMenu: false

    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  statisticsClicked() {
    this.setState({
      clicked: true
    })
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
      return (
        <div className="user">
          <div class="dropdown">
            <button onClick={this.showMenu}>
              {this.state.username}
            </button>
            {
              this.state.showMenu 
              ? (
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item" onClick={e => this.props.setStats(true)}>Statistics</button>

            </div>

              ) : (
                null
              )

            }
            
          </div>
        </div>

        

      )
    }

}

export default User;