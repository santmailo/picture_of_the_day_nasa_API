
function getCurrentImageOfTheDay() {
    const apiKey = "0lcvYIm8Td7eyjjFJQ6YF3Thp8NnajftkGOrKZ8c";
    const currentDate = new Date().toISOString().slice(0, 10);

    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Display data in the UI
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
            <h1>NASA Picture of the Day</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;
        })
        .catch(error => console.log(error));
}

function getImageOfTheDay(selectedDate) {
    const apiKey = "0lcvYIm8Td7eyjjFJQ6YF3Thp8NnajftkGOrKZ8c";

    fetch(`https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
           
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
            <h1>NASA Picture of the Day</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>`;
            saveSearch(selectedDate);
            addSearchToHistory(selectedDate);
        })
        .catch(error => console.log(error));
}
function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}
function addSearchToHistory(date) {
    const searchHistory = document.getElementById("search-history");
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "javascript:void(0)";
    link.textContent = date;
    link.addEventListener("click", function() {
        
        getImageOfTheDay(date);
    });
    li.appendChild(link);
    searchHistory.appendChild(li);
}


document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    getImageOfTheDay(selectedDate);
});

getCurrentImageOfTheDay();
