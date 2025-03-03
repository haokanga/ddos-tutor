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
            // Will not display graphs at this step yet, as students focus on the user tickets
            displayContent(step);
            break;
        case 'analyze':
        case 'scale':
        case 'mitigation':
        case 'release':
        case 'reflect':
            const stepToChartMap = {
                analyze: 4,
                scale: 4,
                mitigation: 5,
                release: 6,
                reflect: 7
            };
            updateChart(stepToChartMap[step]);
            displayContent(step);
            break;
        default:
            console.error(`Unknown step: ${step}`);
    }

    // Scroll the content container instead of the entire page
    const contentContainer = document.getElementById("content-left"); 
    if (contentContainer) {
        contentContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        console.warn("Content container not found.");
    }
}

// Function to display content for the current step and hide all other steps
function displayContent(step) {
    const steps = ["intro", "incident", "analyze", "scale", "mitigation", "release", "reflect"]; // Updated list

    steps.forEach(currentStep => {
        const element = document.getElementById(currentStep);
        if (element) {
            // Display the current step, hide others
            element.style.display = currentStep === step ? "block" : "none";
        } else {
            console.warn(`Element with id "${currentStep}" not found.`);
        }
    });
}

// Function to mark a step as completed
function complete(step) {
    const statusElement = document.getElementById(`status-${step}`);
    const stepElement = document.getElementById(`step-${step}`);

    if (statusElement) {
        statusElement.textContent = "Completed";
    } else {
        console.warn(`Status element for step "${step}" not found.`);
    }

    if (stepElement) {
        stepElement.classList.add("completed");
    } else {
        console.warn(`Step element for step "${step}" not found.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Define all steps and their corresponding details
    const steps = [
        { id: 'step-incident', detail: 'incident' },
        { id: 'step-analyze', detail: 'analyze' },
        { id: 'step-scale', detail: 'scale' },
        { id: 'step-mitigation', detail: 'mitigation' },
        { id: 'step-release', detail: 'release' },
        { id: 'step-reflect', detail: 'reflect' }
    ];

    // Add click event listeners for each step
    steps.forEach(step => {
        const stepElement = document.getElementById(step.id);
        if (stepElement) {
            stepElement.addEventListener('click', () => showDetails(step.detail));
        } else {
            console.warn(`Step element with id "${step.id}" not found.`);
        }
    });

    // Initially show the introduction and hide other steps
    displayContent("intro");
});

document.addEventListener("DOMContentLoaded", () => {
    const buttonMappings = [
        { buttonId: "buttonIncidentNextStep", targetStep: "analyze" },
        { buttonId: "buttonAnalyzePreviousStep", targetStep: "incident" },
        { buttonId: "buttonAnalyzeNextStep", targetStep: "scale" },
        { buttonId: "buttonScalePreviousStep", targetStep: "analyze" },
        { buttonId: "buttonScaleNextStep", targetStep: "mitigation" },
        { buttonId: "buttonMitigationPreviousStep", targetStep: "scale" },
        { buttonId: "buttonMitigationNextStep", targetStep: "release" },
        { buttonId: "buttonReleasePreviousStep", targetStep: "mitigation" },
        { buttonId: "buttonReleaseNextStep", targetStep: "reflect" },
        { buttonId: "buttonReflectPreviousStep", targetStep: "release" },
    ];

    buttonMappings.forEach(({ buttonId, targetStep }) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", () => showDetails(targetStep));
        } else {
            console.warn(`Button with id "${buttonId}" not found.`);
        }
    });
});
