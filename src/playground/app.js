console.log("App is running");
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this); //delete single option
    this.state = {
      // options : props.options
      options : []
    }
  }
  componentDidMount() {
    // console.log('Yeah.. I am here.');
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
    // console.log('Yeah.. I have changed.');
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    // console.log('Hmmm.. I understand nothing is permanent. Bye. :-(');
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  handleAddOption(option) {
    if(!option) {
      return 'Enter valid value to add item!';
    }
    else if(this.state.options.indexOf(option) > -1) {
      return 'Item already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option) }) );
  }
  handleDeleteOptions() {
    // this.setState(() => {
    //   return {
    //     options:[]
    //   };
    // });
    this.setState( () => ( { options :[] } ) );
  }
  handleDeleteOption (optionToDelete) {
    this.setState((prevState) => ( 
    {
      options : prevState.options.filter((option) => option !== optionToDelete)
    }
    ));
  }
  render () {
    const title = 'Indecision App';//Not required as we have set this as default props for header
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header subtitle = {subtitle} />
        <Action 
          hasOptions = {this.state.options.length > 0}
          handlePick = {this.handlePick}
        />
        <Options 
          options = {this.state.options}
          handleDeleteOptions = {this.handleDeleteOptions}
          handleDeleteOption = {this.handleDeleteOption}
        />
        <AddOption handleAddOption = {this.handleAddOption} />
      </div>
    );
  }
}

// IndecisionApp.defaultProps = {
//   options : []
// }

// Class based Component
// class Header extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <h2>{this.props.subtitle}</h2>
//       </div>
//     );
//   }
// }

// Stateless Functional Component
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};
Header.defaultProps = {
  title: 'Indecision App!!!'
}

// class Action extends React.Component {
//   render() {
//     return (
//       <div>
//         <button onClick={this.props.handlePick} disabled = {!this.props.hasOptions}>What should I do?</button>
//       </div>
//     );
//   }
// }

const Action = (props) => {
  return (
    <div>
      <button onClick={props.handlePick} disabled = {!props.hasOptions}>What should I do?</button>
    </div>
  );
};

// class Options extends React.Component {
//   render() {
//     return (
//       <div>
//         <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//         <ol>
//           {
//             this.props.options.map((option) => {
//               return <Option key = {option} optionText = {option} /> 
//             })
//           }
//         </ol>
//       </div>
//     );
//   }
// }

const Options =(props) => {
  return (
    <div>
      <button 
        onClick = {props.handleDeleteOptions}
        disabled = {!props.options.length} >
        Remove All
      </button>
      {props.options.length === 0 && <p>Please add an option to get started.</p>}
      <ol>
        {
          props.options.map((option) => {
            return <Option key = {option} optionText = {option} handleDeleteOption = {props.handleDeleteOption}/> 
          })
        }
      </ol>
    </div>
  );
}

// class Option extends React.Component {
//   render() {
//     return (
//       <li>{this.props.optionText}</li>
//     );
//   }
// }

const Option = (props) => {
  return (
    <li>
      {props.optionText}
      <button onClick = {(e) => {props.handleDeleteOption(props.optionText)}}> Remove </button>
    </li>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error : undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim(); //trim removes the leading and trailing spaces in the string
    const error = this.props.handleAddOption(option);
    this.setState(() =>  ( { error } ) ); //same as error: error
    if(!error) {
      e.target.elements.option.value = '';  
    }
  }
  render () {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit = {this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

// const jsx = (
//   <IndecisionApp />
// );

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));