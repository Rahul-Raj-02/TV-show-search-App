const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
searchButton.addEventListener("click", searchShow);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchShow();
});

async function searchShow() {
  const input = searchInput.value;
  if (!input) {
    alert("Please enter a show name");
    return;
  }
  const url = `https://api.tvmaze.com/search/shows?q=${input}`;
  try {
    const res = await fetch(url);
    const shows = await res.json();
    displayShow(shows);
  } catch (err) {
    console.log(err, "something went wrong");
  }
}

function displayShow(shows) {
  searchResults.innerHTML = "";

  if (shows.length === 0) {
    searchResults.innerHTML = "<p>No shows found</p>";
    return;
  }
  shows.forEach((item) => {
    const show = item.show;
    const col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");
    const poster = show.image
      ? show.image.medium
      : "https://placehold.co/210x295/343a40/ffffff?text=No+Image";
    col.innerHTML = ` <div class="card bg-dark text-white">
  <img src="${poster}" class="card-img-top" alt="...">
  <div class="card-body">
   <h5 class="card-title">${show.name}</h5>
   <p class="card-text text-white-50">
                        <strong>Genre:</strong> ${
                          show.genres.join(", ") || "N/A"
                        } <br>
                        <strong>Rating:</strong> ${
                          show.rating.average ? show.rating.average : "N/A"
                        } ⭐
                    </p>
  </div>`;
    searchResults.appendChild(col);
  });
}
