import { useState } from 'react'

const buttons = [
'AC', 'DEL', '%', '÷',
'7', '8', '9', '×',
'4', '5', '6', '−',
'1', '2', '3', '+',
'±', '0', '.', '=',
]

function App() {
const [display, setDisplay] = useState('0')
const [firstValue, setFirstValue] = useState(null)
const [operator, setOperator] = useState(null)
const [newNumber, setNewNumber] = useState(false)

const calculate = (a, b, op) => {
switch (op) {
case '+':
return a + b
case '−':
return a - b
case '×':
return a * b
case '÷':
return b === 0 ? NaN : a / b
default:
return b
}
}

const format = (number) => {
if (!Number.isFinite(number)) return 'Error'
return String(Number(number.toPrecision(10)))
}

const handleClick = (value) => {
if (value === 'AC') {
setDisplay('0')
setFirstValue(null)
setOperator(null)
setNewNumber(false)
return
}

if (value === 'DEL') {
  if (display === 'Error' || newNumber) {
    setDisplay('0')
    setNewNumber(false)
  } else {
    setDisplay(
      display.length > 1 ? display.slice(0, -1) : '0'
    )
  }
  return
}

if (value === '±') {
  if (display !== '0' && display !== 'Error') {
    setDisplay(
      display.startsWith('-')
        ? display.slice(1)
        : '-' + display
    )
  }
  return
}

if (value === '%') {
  if (display !== 'Error') {
    setDisplay(format(Number(display) / 100))
    setNewNumber(true)
  }
  return
}

if (['+', '−', '×', '÷'].includes(value)) {
  if (display === 'Error') return

  const current = Number(display)

  if (operator && firstValue !== null && !newNumber) {
    const result = calculate(firstValue, current, operator)
    const output = format(result)

    setDisplay(output)
    setFirstValue(output === 'Error' ? null : Number(output))
  } else {
    setFirstValue(current)
  }

  setOperator(value)
  setNewNumber(true)
  return
}

if (value === '=') {
  if (operator && firstValue !== null && display !== 'Error') {
    const result = calculate(firstValue, Number(display), operator)

    setDisplay(format(result))
    setFirstValue(null)
    setOperator(null)
    setNewNumber(true)
  }
  return
}

if (value === '.') {
  if (display === 'Error' || newNumber) {
    setDisplay('0.')
    setNewNumber(false)
  } else if (!display.includes('.')) {
    setDisplay(display + '.')
  }
  return
}

if (/^\d$/.test(value)) {
  if (display === 'Error' || newNumber) {
    setDisplay(value)
    setNewNumber(false)
  } else {
    setDisplay(display === '0' ? value : display + value)
  }
}

}

const buttonStyle = (value) => {
const base =
'rounded-2xl py-4 text-lg font-bold transition active sm'

if (value === '=') {
  return `${base} bg-fuchsia-400 text-purple-950 hover:bg-fuchsia-300`
}

if (['+', '−', '×', '÷'].includes(value)) {
  return `${base} bg-purple-500 text-white hover:bg-purple-400`
}

if (['AC', 'DEL', '%', '±'].includes(value)) {
  return `${base} bg-slate-600 text-purple-100 hover:bg-slate-500`
}

return `${base} bg-slate-800 text-white hover:bg-slate-700`

}

return (
<main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 px-4 py-8 text-white">
<div className="w-full max-w-sm">
<header className="mb-6 text-center">
<p className="text-sm font-bold uppercase tracking-[0.3em] text-fuchsia-300">
React Calculator
</p>

      <h1 className="mt-2 text-4xl font-extrabold">
        Calculate<span className="text-fuchsia-300">+</span>
      </h1>

      <p className="mt-2 text-sm text-slate-400">
        Simple, fast, and easy to use
      </p>
    </header>

    <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl shadow-purple-950/50">
      <div className="mb-5 flex min-h-32 flex-col items-end justify-end overflow-hidden rounded-2xl bg-slate-950 p-5">
        <p className="mb-2 text-sm text-slate-400">
          {firstValue !== null && operator
            ? `${firstValue} ${operator}`
            : 'Ready to calculate'}
        </p>

        <output
          aria-label="Calculator display"
          className="max-w-full break-all text-right text-4xl font-light sm:text-5xl"
        >
          {display}
        </output>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            className={buttonStyle(value)}
            aria-label={
              value === 'DEL'
                ? 'Delete last digit'
                : value === 'AC'
                  ? 'Clear all'
                  : value
            }
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-slate-800/70 p-4">
        <h2 className="mb-2 font-bold text-fuchsia-200">
          User Guide
        </h2>

        <ul className="space-y-1 text-sm text-slate-300">
          <li>• Select numbers to enter a value.</li>
          <li>• Choose +, −, ×, or ÷.</li>
          <li>• Press = to calculate.</li>
          <li>• Press AC to clear everything.</li>
          <li>• Use DEL to remove the last digit.</li>
          <li>• Use % for percentage and ± to change the sign.</li>
        </ul>
      </div>
    </section>

    <footer className="mt-5 text-center text-xs text-slate-500">
      Built with React and Tailwind CSS
    </footer>
  </div>
</main>

)
}

export default App