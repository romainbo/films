// On sélectione le bouton search et l'input pour appliquer un event listener sur change et blur
// On lance les requêtes pour avoir le film et l'image
// On crée un tableau de films et on affiche les films
// Des que le changement de l'input est validé on supprime l'ancien tableau et on en crée un nouveau puis on l'affiche

const search = document.getElementById("search");
search.addEventListener("change", function(e) {
  query = e.target.value;
  reqQueryUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=a67bbdd7cdc8b68c4d9ff436799ac8a8&page=1&language=fr-FR&query=" +
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

    const urlPoster = config.images.base_url + config.images.poster_sizes[3];
    console.log(urlPoster);

    const currentTableau = document.getElementsByClassName("currentTableau");
    console.log("TCL: Tableau -> hideFilms -> currentSearch", currentTableau);
    const currentSearch = document.getElementsByClassName("currentSearch");
    console.log("TCL: Tableau -> hideFilms -> currentSearch", currentSearch);

    req.onload = function() {
      const tableau = new Tableau(req.responseText, req.status, urlPoster);
    };
  };
});
