import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumber = (num) => {
    if (resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op) => {
    setEquation(display + ' ' + op);
    setResetDisplay(true);
  };

  const calculate = () => {
    try {
      const fullEquation = equation + ' ' + display;
      // eslint-disable-next-line no-eval
      const result = eval(fullEquation.replace(/×/g, '*').replace(/÷/g, '/'));
      setDisplay(String(result));
      setEquation('');
      setResetDisplay(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setResetDisplay(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setResetDisplay(false);
  };

  const buttons = [
    ['C', '←', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Display */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6">
          {equation && (
            <div className="text-gray-400 text-sm mb-2 h-5">{equation}</div>
          )}
          <div className="text-white text-4xl font-light text-right break-words">{display}</div>
        </div>

        {/* Buttons */}
        <div className="p-4 grid gap-2">
          {buttons.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              {row.map((btn) => {
                const isOperator = ['÷', '×', '-', '+', '='].includes(btn);
                const isSpecial = ['C', '←', '%'].includes(btn);
                const isZero = btn === '0';

                return (
                  <button
                    key={btn}
                    onClick={() => {
                      if (btn === 'C') clear();
                      else if (btn === '←') setDisplay(display.slice(0, -1) || '0');
                      else if (btn === '=') calculate();
                      else if (isOperator) handleOperator(btn);
                      else handleNumber(btn);
                    }}
                    className={`h-16 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                      isOperator
                        ? 'bg-orange-500 text-white hover:bg-orange-600 col-span-1'
                        : isSpecial
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } ${isZero ? 'col-span-2' : 'col-span-1'}`}
                  >
                    {btn === '←' ? <Delete className="w-5 h-5 mx-auto" /> : btn}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;