function updateChart(hour) {
    fetch(`Assets/traffic-chart-1PM-${hour}PM.json`)
        .then(response => response.json())
        .then(data => {
            Plotly.newPlot("traffic-chart", data.data, data.layout);
        });

    fetch(`Assets/utilization-chart-1PM-${hour}PM.json`)
        .then(response => response.json())
        .then(data => {
            Plotly.newPlot("utilization-chart", data.data, data.layout);
        });
}

// Function to display details for a selected step and mark as completed
function showDetails(step) {
    switch (step) {
        case 'incident':
            updateChart(4);
            break;
        case 'analyze':
            updateChart(4);
            break;
        case 'scale':
            updateChart(4);
            break;
        case 'mitigation':
            updateChart(5);
            break;
        case 'release':
            updateChart(6);
            break;
        case 'reflect':
            updateChart(7);
            break;
        default:
        // code block
    }
}

function complete(step) {
    // Mark the step as completed
    document.getElementById(`status-${step}`).textContent = "Completed";
    document.getElementById(`step-${step}`).classList.add("completed");
}

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for each step dynamically
    const steps = [
        { id: 'step-incident', detail: 'incident' },
        { id: 'step-analyze', detail: 'analyze' },
        { id: 'step-scale', detail: 'scale' },
        { id: 'step-mitigation', detail: 'mitigation' },
        { id: 'step-release', detail: 'release' },
        { id: 'step-reflect', detail: 'reflect' }
    ];

    steps.forEach(step => {
        const stepElement = document.getElementById(step.id);
        if (stepElement) {
            stepElement.addEventListener('click', () => showDetails(step.detail));
        }
    });
});
