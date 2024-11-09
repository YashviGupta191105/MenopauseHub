document.getElementById('recommendation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const age = parseInt(document.getElementById('age').value);
    const activityLevel = document.getElementById('activity-level').value;
    const symptoms = document.getElementById('symptoms').value;

    let dietRecommendation = '';
    let exerciseRecommendation = '';

    // Diet Recommendations based on age and symptoms (example logic)
    if (age < 50) {
        dietRecommendation = "Focus on high fiber, antioxidants, and healthy fats. Include more fruits, vegetables, and lean proteins.";
    } else {
        dietRecommendation = "Increase calcium and vitamin D intake. Try low-fat dairy, leafy greens, and fortified cereals.";
    }

    if (symptoms === 'hot-flashes') {
        dietRecommendation += " Avoid spicy foods, alcohol, and caffeine.";
        exerciseRecommendation = "Try gentle exercises like walking or yoga to help with hot flashes.";
    } else if (symptoms === 'joint-pain') {
        dietRecommendation += " Consider anti-inflammatory foods like fatty fish, nuts, and leafy greens.";
        exerciseRecommendation = "Try low-impact exercises like swimming or stretching to relieve joint pain.";
    } else if (symptoms === 'sleep-issues') {
        dietRecommendation += " Include magnesium-rich foods like bananas, almonds, and spinach.";
        exerciseRecommendation = "Practice calming exercises like meditation or light stretching before bed.";
    }

    // Additional exercise recommendations based on activity level
    if (activityLevel === 'low') {
        exerciseRecommendation += " Start with light exercises like walking or stretching.";
    } else if (activityLevel === 'medium') {
        exerciseRecommendation += " Moderate exercises like brisk walking, cycling, or swimming are great options.";
    } else {
        exerciseRecommendation += " Include strength training and high-intensity interval training (HIIT) for optimal results.";
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Array of motivational quotes
        const quotes = [
            "Embrace the change, it's a new beginning!",
            "You are stronger than you think!",
            "This too shall pass, with strength and support.",
            "Each day brings new strength and new challenges.",
            "Believe in yourself, and the rest will follow.",
            "You are not alone; we are in this together."
        ];
    
        // Get today's quote based on the current date
        const todayQuoteIndex = new Date().getDate() % quotes.length; // Use current date to rotate quotes
    
        // Insert the quote into the HTML
        document.getElementById('quotes-container').innerHTML = `
            <p>"${quotes[todayQuoteIndex]}"</p>
        `;
    });
    
    
    // Display the recommendations
    document.getElementById('recommendation-output').innerHTML = `
        <h3>Diet Recommendation:</h3>
        <p>${dietRecommendation}</p>
        <h3>Exercise Recommendation:</h3>
        <p>${exerciseRecommendation}</p>
    `;
    
});
