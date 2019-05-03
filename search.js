// On sélectione le bouton search et l'input pour appliquer un event listener sur change et blur
const search = document.getElementById("search");
search.addEventListener("change", function(e) {
  // On détermine la recherche en fonction des informations rentrées par l'utilisateur
  query = e.target.value;

  // On lance les requêtes pour avoir le film
  reqQueryUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=a67bbdd7cdc8b68c4d9ff436799ac8a8&page=1&language=fr-FR&query=" +
    query;

  // On lance les requêtes pour avoir l'image
  req1QueryUrl =
    "https://api.themoviedb.org/3/configuration?api_key=a67bbdd7cdc8b68c4d9ff436799ac8a8&page=1&query=" +
    query;

  // On déclare la requête pour récupérer la configuration des images de films
  const req1 = new XMLHttpRequest();
  req1.open("GET", req1QueryUrl);
  req1.send(null);

  // Quand la configuration des images est reçue on lance la requête pour obtenir les films
  req1.onload = () => {
    const req = new XMLHttpRequest();
    req.open("GET", reqQueryUrl);
    req.send(null);

    const config = JSON.parse(req1.responseText);
    console.log(config);

    const urlPoster = config.images.base_url + config.images.poster_sizes[3];
    console.log(urlPoster);

    req.onload = function() {
      // On crée un tableau de films lorsqu'on a récupéré les réultats de la requete de films
      const tableau = new Tableau(req.responseText, req.status, urlPoster);
    };
  };
});
