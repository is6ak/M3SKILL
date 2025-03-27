// Dynamic laden van JSON GIFs voor pokemon animatie
let fleeingGIF = new Image();
let catchingGIF = new Image();

fetch('img/image.json')
    .then(response => response.json())
    .then(realData => {
        fleeingGIF.src = realData.fleeGIF;
        catchingGIF.src = realData.catchGIF;

        // debug
        fleeingGIF.onload = () => {
            console.log("Fleeing GIF loaded from JSON.");
        };

        catchingGIF.onload = () => {
            console.log("Catching GIF loaded from JSON.");
        };
    })
    .catch(error => console.error("ERROR loading image JSON:", error));

// Series lookup
const searchTitle = document.getElementById("js--search-title");
const searchText = document.getElementById("js--search-text");
let searchQ = "Bleach";

fetch("https://api.tvmaze.com/search/shows?q=" + searchQ)
    .then(response => response.json())
    .then(realData => {
        searchTitle.innerText = realData[0].show.name;
        searchText.innerText = realData[0].show.summary.replace(/<\/?p>/g, '');
    });

// Pokemon spel met GIF animatie
const catchButton = document.getElementById("js--catch-button");
const pokemonText = document.getElementById("js--pokemon-text");
const pokemonAnim = document.getElementById("js--pokemon-animation");
const pokemonImage = document.getElementById("js--pokemon-img");
const pokemonName = document.getElementById("js--pokemon-name");

let currentPokemonImage = new Image();

let rndmNumber = Math.floor(Math.random() * 250 + 1);
fetch("https://pokeapi.co/api/v2/pokemon/" + rndmNumber)
    .then(res => res.json())
    .then(realData => {
        pokemonImage.src = realData.sprites.front_default;
        currentPokemonImage.src = realData.sprites.front_default;

        pokemonName.innerText = realData.forms[0].name.charAt(0).toUpperCase() + realData.forms[0].name.slice(1);
    });

catchButton.onclick = function() {
    pokemonImage.classList.remove("reveal");
    pokemonImage.classList.add("hidden");

    pokemonText.classList.remove("reveal");
    pokemonText.classList.add("hidden");

    catchButton.classList.remove("reveal");
    catchButton.classList.add("hidden");

    pokemonName.classList.remove("reveal");
    pokemonName.classList.add("hidden");

    setTimeout(() => {
        const catchNumber = Math.floor(Math.random() * 2);
        let gifDuration = catchNumber === 0 ? 1200 : 11350;

        if (catchNumber === 0) {
            pokemonAnim.src = fleeingGIF.src;
            pokemonText.innerText = "Pokemon fled!";
        } else {
            pokemonAnim.src = catchingGIF.src;
            pokemonText.innerText = "Pokemon caught!";
        }

        pokemonAnim.style.display = "block";
        pokemonAnim.classList.remove("hidden");
        pokemonText.classList.remove("hidden");

        setTimeout(() => {
            pokemonAnim.classList.add("hidden");

            pokemonImage.src = currentPokemonImage.src;
            pokemonImage.classList.remove("hidden");
            pokemonImage.classList.add("reveal");

            if (catchNumber === 0) {
                pokemonText.innerText = "Try again!";
                catchButton.classList.remove("hidden");
                catchButton.classList.add("reveal");

                pokemonImage.classList.remove("reveal");
                pokemonImage.classList.remove("hidden");
            } else {
                pokemonName.classList.remove("hidden");
                pokemonName.classList.add("reveal");
            }

        }, gifDuration);

    }, 500);
};


// Leeftijd prediction
const nameText = document.getElementById("js--name");
const inputField = document.getElementById("js--input");

inputField.onkeyup = function(event) {
    if (event.keyCode === 13) {
        const name = inputField.value;

        fetch("https://api.agify.io?name=" + name)
            .then(response => response.json())
            .then(realData => {
                inputField.classList.add("hidden-2");

                setTimeout(() => {
                    inputField.style.display = "none";
                }, 350);

                nameText.innerText = realData.age;
            });
    }
};