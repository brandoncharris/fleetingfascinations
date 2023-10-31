// Sample data: The number of items for each category
// Ideally, this data would come from the server or database
const categoryCounts = {
    tech: 15, // example count
    arts: 2, // example count
    // ... other categories
};

// Define base size and increment
const baseSize = 50; // 50px
const incrementSize = 10; // 10px

// Calculate sizes for each category
const categorySizes = {};
for (let category in categoryCounts) {
    categorySizes[category] = baseSize + (incrementSize * categoryCounts[category]);
}

// When the DOM is loaded, set the sizes for each category
document.addEventListener("DOMContentLoaded", () => {
    for (let category in categorySizes) {
        const element = document.querySelector(`#${category}`);
        if (element) {
            element.style.width = `${categorySizes[category]}px`;
            element.style.height = `${categorySizes[category]}px`;
        }
    }
});
