export const filmCatalog = document.getElementById("filmCatalog");
export const seriesCatalog = document.getElementById("seriesCatalog");
const genreLinks = document.querySelectorAll(".sideNav a");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:5500/public/streaming.json");
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
        <img src="${film.image}" alt="${film.title}" style="width:300px;height:170px;"/>
        <h4>${film.title}</h4>
        <p>${film.duration} Rating: ${film.rating}</p>
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
             <img src="${serie.image}" alt="${serie.title}" style="width:300px;height:170px;"/>
             <h4>${serie.title}</h4>
             <p>${serie.duration} Rating: ${serie.rating}</p>
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
