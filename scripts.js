const circleData = [
    { category: 'Technology', size: 80 },
    { category: 'Art', size: 120 },
    { category: 'Cooking', size: 100 },
    { category: 'Travel', size: 90 },
    { category: 'Science', size: 110 },
    { category: 'Fashion', size: 70 },
    { category: 'Music', size: 95 },
    { category: 'Sports', size: 85 },
    // Add more categories and sizes as needed
];

function createCircles() {
    const container = document.getElementById('circleContainer');
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Generate a random strength value between 500 and 3000
    const randomStrength = Math.random() * (3000 - 500) + 500;

    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const circles = svg.selectAll("circle")
        .data(circleData)
        .enter()
        .append("circle")
        .attr("r", (d) => d.size)
        .style("fill", "#007bff")
        .style("opacity", 0.8);

    const simulation = d3.forceSimulation(circleData)
        .force("charge", d3.forceManyBody().strength(randomStrength)) // Use the random strength
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius((d) => d.size + 1))
        .on("tick", () => {
            circles
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);
        });

    simulation.alpha(1).restart();
}

window.onload = createCircles;
