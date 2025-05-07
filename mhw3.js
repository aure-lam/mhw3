document.addEventListener('DOMContentLoaded', function () {
    // Bottone "Leggi di più"
    const buttons = document.querySelectorAll('.read-more');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const parent = button.parentElement;
            const extraText = document.createElement('p');
            extraText.textContent = parent.dataset.extra;
            extraText.classList.add('extra-text');
            button.remove();
            parent.appendChild(extraText);
        });
    });

    // Cambio immagine aroma
    const thumbs = document.querySelectorAll('.aroma-thumb');
    const mainImage = document.getElementById('main-aroma');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function () {
            const newSrc = thumb.dataset.src;
            mainImage.src = newSrc;
            fetchCocktail(newSrc.split('.')[0]);
        });
    });

    // API Meteo
    const apiKeyWeather = 'secret'; // sostituire con chiave vera
    const city = 'Milan';
    const weatherInfo = document.getElementById('weather-info');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric&lang=it`)
        .then(response => response.json())
        .then(data => {
            weatherInfo.textContent = `A ${city}: ${data.weather[0].description}, ${data.main.temp}°C`;
        })
        .catch(error => {
            weatherInfo.textContent = 'Errore nel caricamento del meteo.';
            console.error('Errore meteo:', error);
        });

    // API CocktailDB
    function fetchCocktail(aroma) {
        const container = document.getElementById('cocktail-inspiration');
        container.innerHTML = 'Caricamento suggerimenti...';

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${aroma}`)
            .then(response => response.json())
            .then(data => {
                container.innerHTML = '';
                if (!data.drinks) {
                    container.textContent = 'Nessun drink trovato con questo aroma.';
                    return;
                }
                data.drinks.slice(0, 2).forEach(drink => {
                    const div = document.createElement('div');
                    div.classList.add('drink');
                    div.innerHTML = `<h4>${drink.strDrink}</h4><img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="100">`;
                    container.appendChild(div);
                });
            })
            .catch(error => {
                container.textContent = 'Errore nel caricamento dei drink.';
                console.error('Errore cocktail:', error);
            });
    }
});
