const countEl = document.getElementById('counter');
    const accEl = document.getElementById('accumulator');
    const primeCountEl = document.getElementById('primeCount');
    const increaseBtn = document.getElementById('increaseBtn');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const nextPrimeBtn = document.getElementById('nextPrimeBtn');
    const resetBtn = document.getElementById('resetBtn');

    let count = 0;
    let acc = 0;
    let step = 1;

    const isPrime = (num) => {
      if (num <= 1) return false;
      if (num <= 3) return true;
      if (num % 2 === 0 || num % 3 === 0) return false;
      for (let i = 5; i * i <= num; i = i + 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
      }
      return true;
    };

    const calculateTotalPrimes = (limit) => {

      let response = 0;
      for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) {
          response++;
        }
      }
      return response;
    };

    const findNextPrime = (currentNumber) => {
      let next = Math.floor(currentNumber) + 1;
      while (!isPrime(next)) {
        next++;
      }
      return next;
    };

    const updateUI = () => {
      countEl.textContent = count;
      accEl.textContent = acc;
      primeCountEl.textContent = calculateTotalPrimes(count);

      if (isPrime(count)) {
        countEl.classList.add('is-prime');
      } else {
        countEl.classList.remove('is-prime');
      }
    };

    const updateState = () => {
      const newAcc = Math.floor(Math.abs(count) / 10);
      if (newAcc !== acc) {
        acc = newAcc;
        step = acc + 1;
      }
    };

    const reset = () => {
      count = 0;
      acc = 0;
      step = 1;
      updateUI();
    };

    increaseBtn.addEventListener('click', () => {
      countEl.classList.add('scale-up');
      count += step;
      updateState();
      updateUI();
    });

    decreaseBtn.addEventListener('click', () => {
      countEl.classList.add('scale-down');
      count -= step;
      updateState();
      updateUI();
    });

    nextPrimeBtn.addEventListener('click', () => {
      countEl.classList.add('scale-up');
      count = findNextPrime(count);
      updateState();
      updateUI();
    });

    resetBtn.addEventListener('click', reset);

    countEl.addEventListener('animationend', () => {
      countEl.classList.remove('scale-up', 'scale-down');
    });

    updateUI();
