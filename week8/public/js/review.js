document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const reviewData = {
        sitterName: document.getElementById('sitterName').value,
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value,
    };

    try {
        const response = await fetch('/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Review submitted:', result);
            // Optionally, clear the form or display success message
            document.getElementById('reviewForm').reset(); // Clear form
        } else {
            console.error('Error submitting review:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadReviews() {
    const response = await fetch('/reviews');
    const reviews = await response.json();

    const reviewSection = document.getElementById("reviewsContainer");
    reviewSection.innerHTML = ""; // Clear existing reviews

    reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("card-panel", "review-card");

        reviewCard.innerHTML = `
            <div class="review-header">
                <strong>Dog Walker:</strong> ${review.sitterName}
            </div>
            <div class="review-rating">
                <strong>Rating:</strong> ${review.rating}/5
            </div>
            <div class="review-comment">
                <strong>Comment:</strong> ${review.comment}
            </div>
        `;

        // reviewSection.appendChild(reviewCard);
        reviewSection.insertBefore(reviewCard, reviewSection.firstChild);
    });
}


// Call loadReviews when the page loads
window.onload = loadReviews;
