// Babel run command
// .\node_modules\.bin\babel src\app.js --out-file=public\scripts\app.js --presets=env,react --watch

console.log('App.js is running!');

class VisibilityToggle extends React.Component {
  constructor (props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility : false
    };
    this.title = 'Visibility App';
    this.details ="Enough information has been provided to you! Ha Ha Ha";
  }
  handleToggleVisibility () {
    this.setState((prevState) => {
      return {
        visibility : !prevState.visibility
      }
    });
  }
  render () {
    return (
      <div>
        <h1>{this.title}</h1>
        <button onClick={this.handleToggleVisibility}>{this.state.visibility ? "Hide Details" : "Show Details"}</button>
        {this.state.visibility ? <p>{this.details}</p> : undefined}
      </div>      
    )
  }
}

const appRoot = document.getElementById('app');
ReactDOM.render(<VisibilityToggle />, appRoot);


// const app = {
//   title: 'Visibility App',
//   visibility: false,
//   details : "Enough information has been provided to you! Ha Ha Ha"
// };

// const toggleVisibility = () => {
//   app.visibility = ! app.visibility;
//   render();
// };
// const appRoot = document.getElementById('app');

// const render = () => {
//   const template = (
//     <div>
//       <h1>{app.title}</h1>
//       <button onClick={toggleVisibility}>{app.visibility ? "Hide Details" : "Show Details"}</button>
//       {app.visibility ? <p>{app.details}</p> : undefined}
//     </div>
//   );

//   ReactDOM.render(template, appRoot);
// };

// render();
