import React from 'react';
import './App.css';

function App() {
  const [calc, setCalc] = React.useState('');
  const [out, setOut] = React.useState('');
  const actions = ['/', '.', '*', '+', '-'];
  const remove = () => {
    if (calc === '') {
      return;
    }
    let tempValue = calc
      .split('')
      .reverse()
      .splice(1, calc.length - 1)
      .reverse()
      .join('');
    setCalc(tempValue);
    setOut(tempValue);
  };
  const calcFunc = (value: string) => {
    if (
      (actions.includes(value) && calc === '') ||
      (actions.includes(value) && actions.includes(calc.slice(-1)))
    ) {
      return;
    }
    if (calc.length > 11) {
      remove();
    } else {
      setCalc(calc + value);
      if (!actions.includes(value)) {
        setOut(eval(calc + value).toString());
      }
    }
  };
  const createDigit = () => {
    let digitArray = [];
    for (let i = 1; i < 10; i++) {
      digitArray.push(
        <button onClick={() => calcFunc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digitArray;
  };

  const equals = () => {
    setCalc(eval(calc.toString()));
  };
  const fullReset = () => {
    setCalc('');
    setOut('');
  };
  return (
    <React.Fragment>
      <button className="reset" onClick={() => fullReset()}>
        Reset
      </button>
      <div className="calc-grid">
        <div className="output">
          {calc || '0'}
          {out ? <span className="preRes">{out}</span> : ''}
        </div>
        <div>
          <div className="ops">
            <button onClick={() => calcFunc('/')}>/</button>
            <button onClick={() => calcFunc('*')}>*</button>
            <button onClick={() => calcFunc('+')}>+</button>
            <button onClick={() => calcFunc('-')}>-</button>
            <button onClick={() => remove()}>
              <img
                width={100}
                height={100}
                src="https://cdn-icons-png.flaticon.com/512/159/159805.png"
                alt=""
              />
            </button>
          </div>
          <div className="dig">
            {createDigit()}
            <button onClick={() => calcFunc('.')}>.</button>
            <button onClick={() => calcFunc('0')}>0</button>
            <button onClick={() => equals()}>=</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
