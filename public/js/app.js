const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = "Loading......"
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.innerHTML = `
        <div>
            <h4>
            <img src="${data.forecast.icon}" alt="Weather Icon" width="50" height="50" style="vertical-align: middle;">
                ${data.forecast.description}
            </h4>
            <p><strong>Temperature:</strong> ${data.forecast.temperature}°C</p>
            <p><strong>Feels Like:</strong> ${data.forecast.feelslike}°C</p>
            <p><strong>Chances of Rain:</strong> ${data.forecast.rainChances}%</p>
            <p><strong>Sunrise:</strong> ${data.forecast.sunrise}</p>
            <p><strong>Sunset:</strong> ${data.forecast.sunset}</p>
            <p><strong>Air Quality Index:</strong> ${data.forecast.qualityIndex} (Scale: 1-6, higher is worse)</p>
        </div>
    `;
            }
        })
    })
})