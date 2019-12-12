class Counter extends React.Component {
  constructor (props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count : props.count
    };
  }
  componentDidMount() {
    const count = parseInt(localStorage.getItem('count'), 10);
    console.log(count);
    if (!isNaN(count)) {
      console.log('a');
      this.setState(() => ({count})); 
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);
    }       
  }
  handleAddOne () {
    this.setState((prevState) => {
      return {
        count : prevState.count + 1
      }
    });
    // this.forceUpdate();
  }
  handleMinusOne () {
    this.setState((prevState) => {
      return {
        count : prevState.count - 1
      }
    });
    // this.forceUpdate();
  }
  handleReset() {
    this.setState(() => {  //if we do not need prevState arguement then no need to pass it
      return {
        count : 0
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}
Counter.defaultProps = {
  count : 0
}

const appRoot = document.getElementById('app');
ReactDOM.render(<Counter count = {9}/>, appRoot);


// let count = 0;
// const addOne = () => {
//   count++;
//   renderCounterApp();
// };
// const minusOne = () => {
//   count--;
//   renderCounterApp();
// };
// const reset = () => {
//   count = 0;
//   renderCounterApp();
// };

// const appRoot = document.getElementById('app');
// const renderCounterApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>reset</button>
//     </div>
//   );

//   ReactDOM.render(templateTwo, appRoot);
// };

// renderCounterApp();
