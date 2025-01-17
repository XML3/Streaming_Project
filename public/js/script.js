export const filmCatalog = document.getElementById("filmCatalog");
export const seriesCatalog = document.getElementById("seriesCatalog");
const genreLinks = document.querySelectorAll(".sideNav a");

async function fetchData() {
  try {
    // const response = await fetch("http://localhost:5500/public/streaming.json");
    const response = await fetch("/streaming.json");
    if (!response.ok) {
      throw new Error(`HTTP error: status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//dispaly films by genre and check if the filmCatalog exist before proceeding, then clear content and avoid duplicates
function displayFilmsByGenre(films, genres) {
  if (!filmCatalog) return;

  filmCatalog.innerHTML = "";

  //loop through each genres id and filter the corresponding films by their genre id[array]
  genres.forEach((genre) => {
    const genreFilms = films.filter((film) => film.genres.includes(genre.id));
    if (genreFilms.length > 0) {
      //create container for films of this genre and add genre name as its heading
      const genreElement = document.createElement("div");
      genreElement.classList.add("genre-container");
      genreElement.innerHTML = `<h3>${genre.name}</h3>`;

      //Carousel could be set here
      const filmCarousel = document.createElement("div");
      filmCarousel.classList.add("carousel");

      genreFilms.forEach((film) => {
        const filmCard = document.createElement("div");
        filmCard.classList.add("film-card");

        filmCard.innerHTML = `
        <div class="film-img">
        <img src="${film.image}" alt="${film.title}" />
        </div>
         <div class="film-info">
        <h4>${film.title}</h4>
        <p>${film.duration} 
        <span class="rating-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#F8DE22" fill-rule="evenodd" d="m16.34 28.324l1.972.335l-1.018 5.998l5.305-2.817a2.99 2.99 0 0 1 2.802 0l5.305 2.817l-1.018-5.998a3.01 3.01 0 0 1 .855-2.65l4.332-4.266l-5.968-.876a3 3 0 0 1-2.256-1.651l1.797-.878a1 1 0 0 0 .749.55l7.95 1.167c.816.12 1.142 1.133.551 1.714l-5.752 5.665a1.01 1.01 0 0 0-.286.89l1.358 7.999c.139.82-.714 1.447-1.444 1.06l-7.11-3.777a.99.99 0 0 0-.927 0l-7.11 3.776c-.73.388-1.584-.238-1.445-1.06zm-6.038-6.555c-.591-.581-.265-1.594.551-1.714l7.95-1.167a1 1 0 0 0 .75-.55l1.796.878a3 3 0 0 1-2.255 1.65l-5.97.877l4.333 4.266a3.01 3.01 0 0 1 .855 2.65l-1.972-.335a1.01 1.01 0 0 0-.286-.89zM24 13.79l2.65 5.426l1.798-.878l-3.556-7.278a.99.99 0 0 0-1.784 0l-3.556 7.278l1.797.878z" clip-rule="evenodd"/></svg>
        </span> ${film.rating}</p>
        </div>
        `;
        //placeholder for possible added carousel implementation for genre films and append film card to carousel for display
        filmCarousel.appendChild(filmCard);
      });
      genreElement.appendChild(filmCarousel);
      filmCatalog.appendChild(genreElement);
    }
  });
}

//display series by genre
function displaySeriesByGenre(series, genres) {
  if (!seriesCatalog) return;

  seriesCatalog.innerHTML = "";
  genres.forEach((genre) => {
    const genreSeries = series.filter((serie) =>
      serie.genres.includes(genre.id)
    );
    if (genreSeries.length > 0) {
      const genreElement = document.createElement("div");
      genreElement.classList.add("genre-container");
      genreElement.innerHTML = `<h3>${genre.name}</h3>`;

      const serieCarousel = document.createElement("div");
      serieCarousel.classList.add("carousel");

      genreSeries.forEach((serie) => {
        const serieCard = document.createElement("div");
        serieCard.classList.add("serie-card");

        serieCard.innerHTML = `
        <div class="serie-img">
             <img src="${serie.image}" alt="${serie.title}" />
         </div>   
         <div class="serie-info"> 
             <h4>${serie.title}</h4>
             <p>${serie.duration} 
             <span class="rating-icon-s">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#F8DE22" fill-rule="evenodd" d="m16.34 28.324l1.972.335l-1.018 5.998l5.305-2.817a2.99 2.99 0 0 1 2.802 0l5.305 2.817l-1.018-5.998a3.01 3.01 0 0 1 .855-2.65l4.332-4.266l-5.968-.876a3 3 0 0 1-2.256-1.651l1.797-.878a1 1 0 0 0 .749.55l7.95 1.167c.816.12 1.142 1.133.551 1.714l-5.752 5.665a1.01 1.01 0 0 0-.286.89l1.358 7.999c.139.82-.714 1.447-1.444 1.06l-7.11-3.777a.99.99 0 0 0-.927 0l-7.11 3.776c-.73.388-1.584-.238-1.445-1.06zm-6.038-6.555c-.591-.581-.265-1.594.551-1.714l7.95-1.167a1 1 0 0 0 .75-.55l1.796.878a3 3 0 0 1-2.255 1.65l-5.97.877l4.333 4.266a3.01 3.01 0 0 1 .855 2.65l-1.972-.335a1.01 1.01 0 0 0-.286-.89zM24 13.79l2.65 5.426l1.798-.878l-3.556-7.278a.99.99 0 0 0-1.784 0l-3.556 7.278l1.797.878z" clip-rule="evenodd"/></svg>
             </span> ${serie.rating}</p>
             </div>
        `;
        serieCarousel.appendChild(serieCard);
      });
      genreElement.appendChild(serieCarousel);
      seriesCatalog.appendChild(genreElement);
    }
  });
}

//initialize data and set inital state for films, series and genres
async function initialize() {
  //fetch data and wait for response
  const data = await fetchData();

  //destructure the fetched data to get flims, series and genres
  const films = data.films;
  const series = data.series;
  const genres = data.genres;

  //call functions to display the initial set of films and series by genre
  displayFilmsByGenre(films, genres);
  displaySeriesByGenre(series, genres);

  genreLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const genreId = e.target.id;

      const filteredFilms = films.filter((film) =>
        film.genres.include(genreId)
      );
      const filteredSeries = series.filter((serie) =>
        serie.genres.includes(genreId)
      );
      //update the display to display the filtered films and series based on selected genre
      displayFilmsByGenre(filteredFilms, genres);
      displaySeriesByGenre(filteredSeries, genres);
    });
  });
}
//Wait for the DOM to fully load before initializing data and event listeners
document.addEventListener("DOMContentLoaded", () => {
  initialize();
});
