const circleData = [
    { category: 'Sports', size: 8, color: '#f9e2af' },
    { category: 'Art', size: 9, color: '#94e2d5' },
    { category: 'Cooking', size: 8, color: '#f5c2e7' },
    { category: 'Travel', size: 7, color: '#cba6f7' },
    { category: 'Science', size: 6, color: '#f38ba8' },
    { category: 'Fashion', size: 5, color: '#eba0ac' },
    { category: 'Music', size: 4, color: '#fab387' },
    { category: 'Technology', size: 10, color: '#89dceb' },
    // Add more categories, sizes, and colors as needed
];

// Declare the simulation variable
let simulation;

// Initialize the current strength
let currentStrength = 500;
let randomStrength = 500; // Initialize the random strength

const minSize = 35; // Minimum circle size
const maxSize = 150; // Maximum circle size

const categoryCount = circleData.length;
const sizeStep = (maxSize - minSize) / (categoryCount - 1);

circleData.forEach((d, index) => {
    d.size = minSize + index * sizeStep;
});

const container = document.getElementById('circleContainer'); // Define container here

function createCircles() {
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const circles = svg.selectAll("circle")
        .data(circleData)
        .enter()
        .append("circle")
        .attr("r", (d) => d.size)
        .style("fill", (d) => d.color) // Set fill color based on the color property
        .attr("cx", width / 2) // Initialize circles at the center
        .attr("cy", height / 2);

    // Add category labels to the circles
    svg.selectAll("text")
        .data(circleData)
        .enter()
        .append("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("text-anchor", "middle") // Center the text horizontally
        .attr("dy", "0.35em") // Center the text vertically
        .style("fill", "white") // Text color
        .style("font-size", "12px") // Text font size
        .text((d) => d.category);

    simulation = d3.forceSimulation(circleData)
        .force("charge", d3.forceManyBody().strength(currentStrength)) // Initialize with current strength
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius((d) => d.size + 2))
        .on("tick", () => {
            circles
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);

            // Update the positions of category labels
            svg.selectAll("text")
                .attr("x", (d) => d.x)
                .attr("y", (d) => d.y);
        });

    simulation.alpha(1).restart();
}


function explodeCircles(container, width, height) {
    const radius = circleData[0].size / 2; // Use the size of the first circle as radius
    const maxX = width - 2 * radius;
    const maxY = height - 2 * radius;

    // Calculate the current center of the circles
    const currentCenterX = d3.mean(circleData, d => d.x);
    const currentCenterY = d3.mean(circleData, d => d.y);

    // Calculate new positions based on the current center
    circleData.forEach(d => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * Math.min(maxX, maxY) / 2;

        d.x = currentCenterX + Math.cos(angle) * distance;
        d.y = currentCenterY + Math.sin(angle) * distance;
    });

    simulation.alpha(1).restart();
}

// Add an event listener to the button for exploding the circles
const explodeButton = document.getElementById('explodeButton');
explodeButton.addEventListener('click', () => {
    explodeCircles(container, container.offsetWidth, container.offsetHeight);
});


// Call createCircles when the window is loaded
window.onload = createCircles;
