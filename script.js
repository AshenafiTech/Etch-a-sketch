document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('container');
    const resetButton = document.getElementById('resetButton');

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);  // Random between 0 and 255
        const g = Math.floor(Math.random() * 256);  // Random between 0 and 255 
        const b = Math.floor(Math.random() * 256);  // Random between 0 and 255
        return `rgb(${r}, ${g}, ${b})`;
    }

    function darkenColor(color, factor) {
        const rgb = color.match(/\d+/g);
        const r = Math.max(0, rgb[0] - factor);
        const g = Math.max(0, rgb[1] - factor);
        const b = Math.max(0, rgb[2] - factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function createGrid(squaresPerSide) {
        container.innerHTML = ''; // Clear existing grid
        container.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;
        const totalSquares = squaresPerSide * squaresPerSide;
        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.backgroundColor = 'rgb(255, 255, 255)'; // Start with white background
            square.dataset.darkeningLevel = 0;
            square.dataset.originalColor = getRandomColor();
            square.addEventListener('mouseover', () => {
                let darkeningLevel = parseInt(square.dataset.darkeningLevel, 10);
                if (darkeningLevel === 0) {
                    square.style.backgroundColor = square.dataset.originalColor;
                }
                if (darkeningLevel < 10) {
                    darkeningLevel += 1;
                    square.dataset.darkeningLevel = darkeningLevel;
                    square.style.backgroundColor = darkenColor(square.style.backgroundColor, 25.5); // 25.5 is 10% of 255
                }
            });
            container.appendChild(square);
        }
    }

    resetButton.addEventListener('click', () => {
        const squaresPerSide = parseInt(prompt("Enter the number of squares per side for the new grid:"), 10);
        if (squaresPerSide && squaresPerSide > 0) {
            createGrid(squaresPerSide);
        } else {
            alert("Please enter a valid number.");
        }
    });

    createGrid(16); // Initial grid
});