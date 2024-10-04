document.addEventListener("DOMContentLoaded", fetchData);

async function fetchData() {
  try {
    const response = await fetch("http://localhost:5500/public/streaming.json");
    if (!response.ok) {
      throw new Error(`HTTP error: status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const genres = data.genres;
    const films = data.films;
    const series = data.series;

    //display all items initially / default logic.  This will prevent having to click twice on the icon to load data
    displayResults(films, series);

    // set up genre filternig AFTER data is loaded
    setGenreFiltering(genres, films, series);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//filtering genre for each link
function setGenreFiltering(genres, films, series) {
  document.querySelectorAll(".sideNav a").forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const genreId = e.currentTarget.dataset.genreId;

      if (films && series) {
        const filteredFilms = films.filter((film) =>
          film.genres.includes(genreId)
        );
        const filteredSeries = series.filter((serie) =>
          serie.genres.includes(genreId)
        );

        displayResults(filteredFilms, filteredSeries);
      }
    })
  );
}

//diplay function / filtred items for both films and series
function displayResults(filteredFilms, filteredSeries) {
  const filmContainer = document.getElementById("film-container");
  const seriesContainer = document.getElementById("series-container");

  //clear before adding new content
  filmContainer.innerHTML = "";
  seriesContainer.innerHTML = "";

  //display filtered films and +=filmCard
  filteredFilms.forEach((film) => {
    const filmCard = `
    <div class="film-card">
       <img src="${film.image}" alt="${film.title}" style="width:270px;height:150px;" />
    <h4>${film.title}</h4>
    <p>${film.duration} Rating: ${film.rating}</p>
    </div>
    `;
    filmContainer.innerHTML += filmCard;
  });

  //display filtered series and += serieCard
  filteredSeries.forEach((serie) => {
    const serieCard = `
     <div class="serie-card">
    <img src="${serie.image}" alt="${serie.title}" style="width:270px;height:150px;" />
    <h4>${serie.title}</h4>
    <p>${serie.duration} Rating: ${serie.rating}</p>
    </div>
    `;
    seriesContainer.innerHTML += serieCard;
  });
}
