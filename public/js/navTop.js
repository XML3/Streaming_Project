const navTop = document.getElementById("navTop");

navTop.innerHTML = `
<li><a href="index.html">
<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="m8.36 1.37l6.36 5.8l-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71l6.35-5.8zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43z" clip-rule="evenodd"/></svg>
</a></li>
<li><a href="movies.html">
<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20"><path fill="currentColor" d="M16.13 5.38L7.038 8h9.46a.5.5 0 0 1 .5.5v7a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 15.5V8.571l-.257-.893a2.5 2.5 0 0 1 1.71-3.095L13.1 2.09a2.5 2.5 0 0 1 3.095 1.71l.277.96a.5.5 0 0 1-.342.62M3.84 7.88l.607-.175L5.889 5.21l-1.16.335A1.5 1.5 0 0 0 3.703 7.4zm1.992-.574l2.12-.612l1.443-2.497l-2.125.613l-.021.042zm5.627-1.622l1.442-2.498l-2.126.613l-.026.053l-1.41 2.443zm2.684-2.652l-.02.036l-1.279 2.216l2.527-.728l-.139-.48a1.5 1.5 0 0 0-1.09-1.044M4 9v6.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V9z"/></svg>
</a></li>
<li><a href="series.html">
<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6h-5.586l2.293-2.293l-1.414-1.414L12 5.586L8.707 2.293L7.293 3.707L9.586 6H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2M4 19V8h16l.002 11z"/></svg>
</a></li>

`;

//keep border active on link after click
const navLinks = document.querySelectorAll("#navTop a");

//Retrieve the active link from localStorage on load, then find the link that matches the 'href' stored - add the 'active' class
window.addEventListener("DOMContentLoaded", () => {
  const activeLinkHref = localStorage.getItem("activeLink");
  if (activeLinkHref) {
    const activeLink = [...navLinks].find(
      (link) => link.getAttribute("href") === activeLinkHref
    );

    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
});

//Add event listener to each link to save the active state (navigate), then save the clicked link attribute in localStorage
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    localStorage.setItem("activeLink", this.getAttribute("href"));
  });
});
