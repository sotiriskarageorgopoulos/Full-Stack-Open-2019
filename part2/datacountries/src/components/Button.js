import React from 'react'

class Button extends React.Component {
    constructor(handleButton) {
      this.handleButton
    }
    
    handleClick = () => {
      alert(this.state.message);
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          Say hello
        </button>
      );
    }
  }

export default Button