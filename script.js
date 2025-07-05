// To-Do List
function addTask() {
  const task = document.getElementById('todo-input').value;
  if (!task) return;
  const li = document.createElement('li');
  li.textContent = task;
  li.onclick = () => li.remove();
  document.getElementById('todo-list').appendChild(li);
  document.getElementById('todo-input').value = '';
}

// Quote Generator
const quotes = [
  "Stay hungry, stay foolish.",
  "Be yourself; everyone else is already taken.",
  "Success is not in what you have, but who you are.",
  "Dream big and dare to fail."
];

function generateQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote-display').textContent = quote;
}

// Currency Converter (Static)
const currencies = ['USD', 'EUR', 'INR', 'JPY'];

window.onload = () => {
  const from = document.getElementById('from-currency');
  const to = document.getElementById('to-currency');
  currencies.forEach(c => {
    from.innerHTML += `<option value="${c}">${c}</option>`;
    to.innerHTML += `<option value="${c}">${c}</option>`;
  });
};

function convertCurrency() {
  const amt = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('from-currency').value;
  const to = document.getElementById('to-currency').value;
  
  if (isNaN(amt)) {
    document.getElementById('currency-result').textContent = "Please enter a valid amount";
    return;
  }
  
  // Simple conversion rates (static for demo)
  const rates = {
    USD: { EUR: 0.85, INR: 75.0, JPY: 110.0, USD: 1 },
    EUR: { USD: 1.18, INR: 88.0, JPY: 130.0, EUR: 1 },
    INR: { USD: 0.013, EUR: 0.011, JPY: 1.5, INR: 1 },
    JPY: { USD: 0.0091, EUR: 0.0077, INR: 0.67, JPY: 1 }
  };
  
  const result = amt * rates[from][to];
  document.getElementById('currency-result').textContent = `Converted: ${result.toFixed(2)} ${to}`;
}