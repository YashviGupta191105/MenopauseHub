// Define canvas contexts for each symptom
const canvasContexts = {
    "Hot Flashes": document.getElementById('hotFlashesChart').getContext('2d'),
    "Mood Swings": document.getElementById('moodSwingsChart').getContext('2d'),
    "Sleep Disturbance": document.getElementById('sleepDisturbanceChart').getContext('2d'),
    "Night Sweats": document.getElementById('nightSweatsChart').getContext('2d'),
    "Fatigue": document.getElementById('fatigueChart').getContext('2d')
};

// Initialize charts to prevent over-writing them
function createInitialCharts() {
    // Check if data exists, otherwise don't create a new chart
    const symptomsData = JSON.parse(localStorage.getItem('symptomsData')) || {
        "Hot Flashes": [],
        "Mood Swings": [],
        "Sleep Disturbance": [],
        "Night Sweats": [],
        "Fatigue": []
    };

    // Create initial empty charts with example data for Hot Flashes
    Object.keys(canvasContexts).forEach(symptom => {
        if (!symptomsData[symptom] || symptomsData[symptom].length === 0) {
            // If no symptom data exists, create a basic chart
            new Chart(canvasContexts[symptom], {
                type: 'line',
                data: {
                    labels: ['2024-11-01'], // Default placeholder date
                    datasets: [{
                        label: `${symptom} Severity`,
                        data: [0], // Default severity value
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: { display: true, text: 'Date' }
                        },
                        y: {
                            title: { display: true, text: 'Severity (1-10)' },
                            min: 0,
                            max: 10
                        }
                    }
                }
            });
        }
    });
}

document.getElementById('symptom-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form inputs
    const symptom = document.getElementById('symptom').value;
    const severity = parseInt(document.getElementById('severity').value);
    const notes = document.getElementById('notes').value;
    const date = new Date().toLocaleDateString();  // Get current date

    // Create a new symptom entry
    const newEntry = {
        symptom: symptom,
        severity: severity,
        notes: notes,
        date: date
    };

    // Get the current symptoms from local storage or initialize an empty object
    let symptomsData = JSON.parse(localStorage.getItem('symptomsData')) || {
        "Hot Flashes": [],
        "Mood Swings": [],
        "Sleep Disturbance": [],
        "Night Sweats": [],
        "Fatigue": []
    };

    // Add the new entry to the corresponding symptom array
    symptomsData[symptom].push(newEntry);

    // Save the updated symptom data in local storage (but only update when data changes)
    localStorage.setItem('symptomsData', JSON.stringify(symptomsData));

    // Clear the form
    document.getElementById('symptom-form').reset();

    // Update the history view and all graphs
    displaySymptoms(symptomsData);
    updateGraphs(symptomsData);
});

function displaySymptoms(symptomsData) {
    const historyContainer = document.getElementById('symptom-history');
    
    // Clear the previous history
    historyContainer.innerHTML = '';
    
    // Loop through the symptoms and create an HTML structure
    Object.keys(symptomsData).forEach(symptom => {
        symptomsData[symptom].forEach(entry => {
            const symptomDiv = document.createElement('div');
            symptomDiv.classList.add('symptom-entry');
            
            symptomDiv.innerHTML = `
                <p><strong>Date:</strong> ${entry.date}</p>
                <p><strong>Symptom:</strong> ${entry.symptom}</p>
                <p><strong>Severity:</strong> ${entry.severity}/10</p>
                <p><strong>Notes:</strong> ${entry.notes || 'No additional notes'}</p>
                <hr>
            `;
            
            historyContainer.appendChild(symptomDiv);
        });
    });
}

function updateGraphs(symptomsData) {
    // Loop through each symptom and create the graph
    Object.keys(symptomsData).forEach(symptom => {
        const symptomData = symptomsData[symptom];
        const labels = symptomData.map(entry => entry.date);  // Dates on the X-axis
        const severityData = symptomData.map(entry => entry.severity);  // Severity on the Y-axis

        // Dynamically create the graph for each symptom
        new Chart(canvasContexts[symptom], {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${symptom} Severity`,
                    data: severityData,
                    fill: false,
                    borderColor: getRandomColor(),
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: { display: true, text: 'Date' }
                    },
                    y: {
                        title: { display: true, text: 'Severity (1-10)' },
                        min: 0,
                        max: 10
                    }
                }
            }
        });
    });
}

// Generate random color for each symptom graph
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Load symptoms and graphs when the page loads
window.onload = () => {
    // Retrieve symptoms data from localStorage
    const symptomsData = JSON.parse(localStorage.getItem('symptomsData')) || {
        "Hot Flashes": [],
        "Mood Swings": [],
        "Sleep Disturbance": [],
        "Night Sweats": [],
        "Fatigue": []
    };

    // Load history and graphs based on stored data
    displaySymptoms(symptomsData);
    updateGraphs(symptomsData);

    // Create charts only if there is no existing symptom data
    createInitialCharts();
};
