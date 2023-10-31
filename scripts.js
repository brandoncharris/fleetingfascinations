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
        .force("charge", d3.forceManyBody().strength(2000))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius((d) => d.size + 5))
        .on("tick", () => {
            circles
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);
        });

    simulation.alpha(1).restart();
}

window.onload = createCircles;
