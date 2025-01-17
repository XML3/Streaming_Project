import { filmCatalog, seriesCatalog } from "./script.js";
let searchInput;
let data; //store fetched data, avoid multiples

const addSearchBar = () => {
  const searchContainer = document.querySelector("#search-main-container");
  if (!searchContainer) return;

  const searchBarHTML = `
     <div class="search" id="search-container">
        <form class="search-form" id="search-items">
          <input
            id="search-input"
            type="search"
            placeholder="Search for films, series ..."
          />
       
        </form>
      </div>
    `;
  searchContainer.insertAdjacentHTML("beforeend", searchBarHTML);

  searchInput = document.getElementById("search-input");

  //Fetch data once and store in variable
  fetchData().then((fetchedData) => {
    data = fetchedData;
  });

  //input event listener - search bar
  searchInput.addEventListener("input", async (e) => {
    const searchTerm = e.target.value;

    if (!data) {
      console.error("Data not loaded yet");
      return;
    }

    const { filteredFilms, filteredSeries } = filteredItems(
      searchTerm,
      data.films,
      data.series,
      data.genres
    );
    displaySearchResults(filteredFilms, filteredSeries);
  });
};

async function fetchData() {
  try {
    const response = await fetch("/streaming.json");
    if (!response.ok) {
      throw new Error(`HTTP error: status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data;", error);
  }
}

//Filter films and series based on search input
const filteredItems = (searchTerm, films, series, genres) => {
  if (typeof searchTerm !== "string")
    return {
      filteredFilms: [],
      filteredSeries: [],
    };

  const searchLowerCase = searchTerm.toLowerCase();

  const filteredFilms = films.filter((film) => {
    if (!film || !film.title || !film.actors || !film.genres) return false;

    const actorsArray = film.actors.split(", ");
    return (
      (film.title && film.title.toLowerCase().includes(searchLowerCase)) ||
      (film.year && film.year.toLowerCase().includes(searchLowerCase)) ||
      actorsArray.some(
        (actor) => actor && actor.toLowerCase().includes(searchLowerCase)
      ) ||
      film.genres.some((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        if (!genre || !genre.name) return false;
        return genre.name && genre.name.toLowerCase().includes(searchLowerCase);
      })
    );
  });

  const filteredSeries = series.filter((serie) => {
    if (!serie || !serie.title || !serie.actors || !serie.genres) return false;

    const actorsArray = serie.actors.split(", ");
    return (
      (serie.title && serie.title.toLowerCase().includes(searchLowerCase)) ||
      (serie.year && serie.year.toLowerCase().includes(searchLowerCase)) ||
      actorsArray.some(
        (actor) => actor && actor.toLowerCase().includes(searchLowerCase)
      ) ||
      serie.genres.some((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        if (!genre || !genre.name) return false;
        return genre.name && genre.name.toLowerCase().includes(searchLowerCase);
      })
    );
  });

  return { filteredFilms, filteredSeries };
};

//function to display search results
const displaySearchResults = (films, series) => {
  filmCatalog.innerHTML = "";
  seriesCatalog.innerHTML = "";

  if (films.length === 0 && series.length === 0) {
    filmCatalog.innerHTML = "<p>No films found</p>";
    seriesCatalog.innerHTML = "<p>No series found</p>";
    return;
  }

  films.forEach((film) => {
    const filmCard = document.createElement("div");
    filmCard.classList.add("film-card");
    filmCard.innerHTML = `
    <img src="${film.image}" alt="${film.title}" style="width:300px;height:170px;" />
    <h4>${film.title}</h4>
    <p>${film.duration} Rating: ${film.rating}</p>
    </div>
    `;
    filmCatalog.appendChild(filmCard);
  });

  series.forEach((serie) => {
    const serieCard = document.createElement("div");
    serieCard.classList.add("serie-card");
    serieCard.innerHTML = `
     <img src="${serie.image}" alt="${serie.title}" style="width:300px;height:170px;" />
    <h4>${serie.title}</h4>
    <p>${serie.duration} Rating: ${serie.rating}</p>
    </div>
    `;
    seriesCatalog.appendChild(serieCard);
  });
};
//redirect to search page when cliked link
document.getElementById("searchLink").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "search.html";
});

//Once document is loaded add search bar
document.addEventListener("DOMContentLoaded", () => {
  addSearchBar();
});
