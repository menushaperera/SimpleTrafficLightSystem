let currentLight = 0; // 0: Red, 1: Yellow, 2: Green
    let intervalId;
    let countdownId;
    let blinkIntervalId;

    const lightDurations = [90, 3, 60]; // Durations in seconds: [red, yellow, green]
    let remainingTime = lightDurations[0];

    function changeLight() {
        const redLight = document.getElementById('redLight');
        const yellowLight = document.getElementById('yellowLight');
        const greenLight = document.getElementById('greenLight');
        const countdown = document.getElementById('countdown');

        // Reset all lights
        redLight.className = 'light';
        yellowLight.className = 'light';
        greenLight.className = 'light';

        // Change the current light
        if (currentLight === 0) {
            redLight.classList.add('red');
            countdown.style.color = '#ff0000'; // red
            remainingTime = lightDurations[0];
            currentLight = 1;
        } else if (currentLight === 1) {
            yellowLight.classList.add('yellow');
            countdown.style.color = '#ffff00'; // yellow
            remainingTime = lightDurations[1];
            currentLight = 2;
        } else if (currentLight === 2) {
            greenLight.classList.add('green');
            countdown.style.color = '#00ff00'; // green
            remainingTime = lightDurations[2];
            currentLight = 0;
        }

        countdown.textContent = remainingTime;
        clearInterval(intervalId);
        clearInterval(countdownId);
        intervalId = setTimeout(changeLight, remainingTime * 1000);
        countdownId = setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const countdown = document.getElementById('countdown');
        if (remainingTime > 0) {
            remainingTime--;
            countdown.textContent = remainingTime;
        } else {
            clearInterval(countdownId);
        }
    }

    function startSimulation() {
        stopBlinking(); // Stop blinking if it's active
        clearInterval(intervalId);
        clearInterval(countdownId);
        currentLight = 0; // Start with red light
        changeLight(); // Initialize the first light
    }

    function stopSimulation() {
        clearInterval(intervalId);
        clearInterval(countdownId);
        stopBlinking();
        currentLight = 0;
        remainingTime = lightDurations[0];
        document.getElementById('countdown').textContent = remainingTime;
        document.getElementById('countdown').style.color = '#ff0000'; // Reset to red
        // Turn off all lights
        document.getElementById('redLight').className = 'light';
        document.getElementById('yellowLight').className = 'light';
        document.getElementById('greenLight').className = 'light';
    }

    function blinkYellowLight() {
        stopSimulation(); // Stop the normal simulation if it's active
        const yellowLight = document.getElementById('yellowLight');
        blinkIntervalId = setInterval(() => {
            yellowLight.classList.toggle('yellow');
        }, 500);
    }

    function stopBlinking() {
        clearInterval(blinkIntervalId);
        document.getElementById('yellowLight').className = 'light';
    }