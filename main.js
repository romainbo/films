window.onload = function() {
  const search = document.getElementById("search");
  search.addEventListener("change", function(e) {
    query = e.target.value;
    reqQueryUrl =
      "https://api.themoviedb.org/3/search/movie?api_key=a67bbdd7cdc8b68c4d9ff436799ac8a8&page=1&query=" +
      query;

    req1QueryUrl =
      "https://api.themoviedb.org/3/configuration?api_key=a67bbdd7cdc8b68c4d9ff436799ac8a8&page=1&query=" +
      query;

    const req1 = new XMLHttpRequest();
    req1.open("GET", req1QueryUrl);
    req1.send(null);

    req1.onload = () => {
      const req = new XMLHttpRequest();
      req.open("GET", reqQueryUrl);
      req.send(null);

      const config = JSON.parse(req1.responseText);
      console.log(config);

      const urlPoster = config.images.base_url + config.images.poster_sizes[2];

      req.onload = showFilms;

      function showFilms() {
        console.log(req.responseText);
        console.log(req.statusText);

        const films = JSON.parse(req.responseText).results;
        console.log("films: ", films);

        const tableau = document.createElement("div");
        tableau.classList.add("currentTableau");
        document.body.appendChild(tableau);

        films.forEach(film => {
          const section = document.createElement("section");
          tableau.appendChild(section);
          console.log(film.title);
          const titre = document.createElement("h2");
          titre.textContent = film.title;
          section.appendChild(titre);
          const poster = document.createElement("img");
          const posterPath = urlPoster + film.poster_path;
          poster.setAttribute("src", posterPath);
          section.appendChild(poster);
        });
      }
    };
  });
};
