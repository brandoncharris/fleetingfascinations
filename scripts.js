// Define category sizes
const categorySizes = {
    "sports": 100,
    "entertainment": 150,
    "technology": 200,
    "health": 180,
    "travel": 160
};

document.addEventListener("DOMContentLoaded", () => {
    // Find the center of the categories-container
    const container = document.querySelector('.categories-container');
    const containerCenterX = container.offsetWidth / 2;
    const containerCenterY = container.offsetHeight / 2;

    // Number of categories
    const numCategories = Object.keys(categorySizes).length;

    // Angle between each category
    const angleBetween = 360 / numCategories;

    let currentAngle = 0;  // Start at 0 degrees

    for (let category in categorySizes) {
        const element = document.querySelector(`#${category}`);
        if (element) {
            const radius = (container.offsetWidth - categorySizes[category]) / 2;

            // Use trigonometry to position each category
            const x = containerCenterX + radius * Math.cos(currentAngle * (Math.PI / 180)) - categorySizes[category] / 2;
            const y = containerCenterY + radius * Math.sin(currentAngle * (Math.PI / 180)) - categorySizes[category] / 2;

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            element.style.width = `${categorySizes[category]}px`;
            element.style.height = `${categorySizes[category]}px`;

            currentAngle += angleBetween;
        }
    }
});
