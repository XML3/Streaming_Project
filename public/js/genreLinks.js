document.addEventListener("DOMContentLoaded", fetchData);

async function fetchData() {
  try {
    // const response = await fetch("http://localhost:5500/public/streaming.json");
    const response = await fetch("/streaming.json");
    if (!response.ok) {
      throw new Error(`HTTP error: status ${response.status}`);
    }
    const data = await response.json();

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
    <div class="film-img">
       <img src="${film.image}" alt="${film.title}"  />
    </div>
    <div class="film-info">
       <h4>${film.title}</h4>
    <p>${film.duration} 
    <span class="rating-icon">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#F8DE22" fill-rule="evenodd" d="m16.34 28.324l1.972.335l-1.018 5.998l5.305-2.817a2.99 2.99 0 0 1 2.802 0l5.305 2.817l-1.018-5.998a3.01 3.01 0 0 1 .855-2.65l4.332-4.266l-5.968-.876a3 3 0 0 1-2.256-1.651l1.797-.878a1 1 0 0 0 .749.55l7.95 1.167c.816.12 1.142 1.133.551 1.714l-5.752 5.665a1.01 1.01 0 0 0-.286.89l1.358 7.999c.139.82-.714 1.447-1.444 1.06l-7.11-3.777a.99.99 0 0 0-.927 0l-7.11 3.776c-.73.388-1.584-.238-1.445-1.06zm-6.038-6.555c-.591-.581-.265-1.594.551-1.714l7.95-1.167a1 1 0 0 0 .75-.55l1.796.878a3 3 0 0 1-2.255 1.65l-5.97.877l4.333 4.266a3.01 3.01 0 0 1 .855 2.65l-1.972-.335a1.01 1.01 0 0 0-.286-.89zM24 13.79l2.65 5.426l1.798-.878l-3.556-7.278a.99.99 0 0 0-1.784 0l-3.556 7.278l1.797.878z" clip-rule="evenodd"/></svg>
    </span> ${film.rating}</p>
    </div>
    </div>

    `;
    filmContainer.innerHTML += filmCard;
  });

  //display filtered series and += serieCard
  filteredSeries.forEach((serie) => {
    const serieCard = `
     <div class="serie-card">
     <div class="serie-img">
    <img src="${serie.image}" alt="${serie.title}" />
    </div>
    <div class="serie-info">
    <h4>${serie.title}</h4>
    <p>${serie.duration} 
    <span class="rating-icon-s">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#F8DE22" fill-rule="evenodd" d="m16.34 28.324l1.972.335l-1.018 5.998l5.305-2.817a2.99 2.99 0 0 1 2.802 0l5.305 2.817l-1.018-5.998a3.01 3.01 0 0 1 .855-2.65l4.332-4.266l-5.968-.876a3 3 0 0 1-2.256-1.651l1.797-.878a1 1 0 0 0 .749.55l7.95 1.167c.816.12 1.142 1.133.551 1.714l-5.752 5.665a1.01 1.01 0 0 0-.286.89l1.358 7.999c.139.82-.714 1.447-1.444 1.06l-7.11-3.777a.99.99 0 0 0-.927 0l-7.11 3.776c-.73.388-1.584-.238-1.445-1.06zm-6.038-6.555c-.591-.581-.265-1.594.551-1.714l7.95-1.167a1 1 0 0 0 .75-.55l1.796.878a3 3 0 0 1-2.255 1.65l-5.97.877l4.333 4.266a3.01 3.01 0 0 1 .855 2.65l-1.972-.335a1.01 1.01 0 0 0-.286-.89zM24 13.79l2.65 5.426l1.798-.878l-3.556-7.278a.99.99 0 0 0-1.784 0l-3.556 7.278l1.797.878z" clip-rule="evenodd"/></svg>
   </span>${serie.rating}</p>
    </div>
    </div>
    `;
    seriesContainer.innerHTML += serieCard;
  });
}
