// C'est dans un tableau qu'on va afficher tous les films qui seront le résultat de la recherche

class Tableau {
  constructor(rep, status, urlPoster) {
    //  On initie le tableau avec :
    // - La réponse de la requête
    // - Le status de la requête
    // - L'url de l'image
    this.rep = rep;
    this.status = status;
    this.urlPoster = urlPoster;

    // On ajoute les résultats de la requete dans la variable films
    this.films = JSON.parse(this.rep).results;
    console.log("TCL: Tableau -> constructor ->  this.films", this.films);

    // On affiche les films en réponse à la requête
    this.showFilms();
  }

  hideFilms() {
    // Utilisation de jQuery pour supprimer les films déjà affichés
    $(".currentSearch").remove();
  }

  showFilms() {
    console.log("TCL: Tableau -> showFilms -> this.rep", this.rep);
    console.log("TCL: Tableau -> showFilms -> this.status", this.status);

    // Si la variable films n'est pas vide, on cache les films déjà affichés
    if (this.films.length > 0) {
      this.hideFilms();
    }

    // On crée un tableau pour stocker les films
    const tableau = document.createElement("div");
    tableau.classList.add("currentTableau");
    document.body.appendChild(tableau);

    // $("body").append("<div>{class: 'currentTableau'}</div>");

    this.films.forEach(film => {
      // Pour chaque éléments présents dans films on crée une section, un titre on ajoute l'image et les notes et le synopsis
      const section = document.createElement("section");
      const header = document.createElement("div");
      const titre = document.createElement("h2");
      const releaseDate = document.createElement("p");
      const titreOrihinal = document.createElement("h3");
      const poster = document.createElement("img");
      const posterPath = this.urlPoster + film.poster_path;
      const ratings = document.createElement("p");
      const overview = document.createElement("p");

      section.classList.add("currentSearch");
      header.classList.add("containerTitreFilm");
      poster.setAttribute("src", posterPath);
      titre.textContent = film.title;
      releaseDate.textContent = film.release_date.substring(0, 4);
      ratings.textContent = film.vote_average + "/10";
      overview.textContent = film.overview;

      tableau.appendChild(section);
      section.appendChild(header);
      header.appendChild(titre);
      header.appendChild(releaseDate);
      section.appendChild(titreOrihinal);
      section.appendChild(poster);
      section.appendChild(ratings);
      section.appendChild(overview);

      console.log(film.title);
      if (film.original_title === film.title) {
        titreOrihinal.textContent = "";
      } else {
        titreOrihinal.textContent = "(" + film.original_title + ")";
      }
    });
  }
}
