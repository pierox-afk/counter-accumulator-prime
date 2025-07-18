const counterElement = document.getElementById('counter');
    const accumulatorElement = document.getElementById('accumulator');
    const primeCountElement = document.getElementById('primeCount');
    const increaseButton = document.getElementById('increaseBtn');
    const decreaseButton = document.getElementById('decreaseBtn');
    const nextPrimeButton = document.getElementById('nextPrimeBtn');
    const resetButton = document.getElementById('resetBtn');

    let count = 0;
    let accumulator = 0;
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
      counterElement.textContent = count;
      accumulatorElement.textContent = accumulator;
      primeCountElement.textContent = calculateTotalPrimes(count);

      if (isPrime(count)) {
        counterElement.classList.add('is-prime');
      } else {
        counterElement.classList.remove('is-prime');
      }
    };

    const updateState = () => {
      const newAccumulator = Math.floor(Math.abs(count) / 10);
      if (newAccumulator !== accumulator) {
        accumulator = newAccumulator;
        step = accumulator + 1;
      }
    };

    const reset = () => {
      count = 0;
      accumulator = 0;
      step = 1;
      updateUI();
    };

    increaseButton.addEventListener('click', () => {
      counterElement.classList.add('scale-up');
      count += step;
      updateState();
      updateUI();
    });

    decreaseButton.addEventListener('click', () => {
      counterElement.classList.add('scale-down');
      count -= step;
      updateState();
      updateUI();
    });

    nextPrimeButton.addEventListener('click', () => {
      counterElement.classList.add('scale-up');
      count = findNextPrime(count);
      updateState();
      updateUI();
    });

    resetButton.addEventListener('click', reset);

    counterElement.addEventListener('animationend', () => {
      counterElement.classList.remove('scale-up', 'scale-down');
    });

    updateUI();
