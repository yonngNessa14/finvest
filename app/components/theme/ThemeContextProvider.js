import React, {Component} from 'react';
  

const ThemeContext = React.createContext();

class ThemeContextProvider extends Component {
  state = {
    darkMode: false,
  };

  changeThemeMode = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    });
  };
  render() {
    let mode = null;

    let darkMode = {
      background: '#50434F',
      text: 'whitesmoke',
      card: '#A9A9A9',
      footBack: '#776776',
      footColor: '#fff',
      footText: 'lightgrey'

    };

    let lightMode = {
      background: '#ebebeb',
      text: '#776776',
      card: 'white',
      footBack: 'whitesmoke',
      footColor: '#CA1A8E',
      footText: 'gray'
    };

    if (this.state.darkMode) {
      mode = darkMode;
    }
    else {
        mode = lightMode
    }

    return (
      <ThemeContext.Provider value={{...this.state, changeThemeMode: this.changeThemeMode, mode}}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

const ThemeConsumer = ThemeContext.Consumer;

export {ThemeContextProvider, ThemeConsumer};
