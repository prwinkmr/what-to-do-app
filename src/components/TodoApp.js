import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal'

export default class TodoApp extends React.Component {
  state = {
	options : [],
	selectedOption : undefined
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({selectedOption: option}));
  };
  handleAddOption = (option) => {
    if(!option) {
      return 'Enter valid value to add item!';
    }
    else if(this.state.options.indexOf(option) > -1) {
      return 'Item already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option) }) );
  };
  handleDeleteOptions = () => {
    this.setState( () => ( { options :[] } ) );
  };
  handleDeleteOption = (optionToDelete) => {
    this.setState((prevState) => ( 
	    {
	      options : prevState.options.filter((option) => option !== optionToDelete)
	    }
    ));
  };
  handleClearSelectedOption = () => {
  	this.setState(() => ({selectedOption: undefined}));
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json)

      if (options) {
        this.setState(() => ({options}));
      }
      
    }
    catch (e) {
      // Do nothing for now
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    // console.log('Hmmm.. I understand nothing is permanent. Bye. :-(');
  }

  render () {
    const subtitle = 'Let me help you decide.';
    return (
      <div>
        <Header subtitle = {subtitle} />
          <div className = "container">
            <Action 
              hasOptions = {this.state.options.length > 0}
              handlePick = {this.handlePick}
            />
            <div className="widget">
              <Options 
                options = {this.state.options}
                handleDeleteOptions = {this.handleDeleteOptions}
                handleDeleteOption = {this.handleDeleteOption}
              />
              <AddOption handleAddOption = {this.handleAddOption} />
            </div>  
          </div>
        <OptionModal 
          selectedOption = {this.state.selectedOption}
          handleClearSelectedOption = {this.handleClearSelectedOption} 
        />
      </div>
    );
  }
}
