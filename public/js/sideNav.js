const sideNav = document.getElementById("side-nav");

sideNav.innerHTML = `
<li><a id="drama" href="sci_fi.html" data-genre-id="1">
<p>DRAMA</p>
</a></li>
<li><a id="comedy" href="sci_fi.html" data-genre-id="2">
<p>COMEDY</p>
</a></li>
<li><a id="sci-fi" href="sci_fi.html" data-genre-id="3">
<p>SCI-FI</p>
</a></li>

<li><a id="searchLink" href="search.html">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
</a></li>
`;

//re-attached so the search link does not get rendered with the genre links
document.getElementById("searchLink").addEventListener("click", (e) => {
  window.location.href = "search.html";
});
