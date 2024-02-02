import User from "./modules/User";

// Pour récupérer de l'API que le titre, prénom, nom, email, ville, code postal, pays, numéro de téléphone, cellulaire, date de naissance, âge, genre, photo de profil, et nationalité
// Tableau vide pour stocker les utilisateurs
const tableauUser = [];

// Fonction pour récupérer les utilisateurs depuis l'API
const getUsers = () => {

    //🙋‍♀️ Récupérer des profils utilisateurs depuis une API (6 points)
    // Appel à l'API pour obtenir 20 utilisateurs aléatoires
    const users = fetch("https://randomuser.me/api/?results=20").then((resutlat) => resutlat.json());

    // Traitemnt des données une fois qu'elles sont récupérers
    users.then((data) => {
        const { results } = data;
        // pour chaque élément (utilisateur) dans le tableau results provenant de l'API, un nouvel objet User est créé.
        // Boucle pour récupérer les données souhaitées
        results.forEach((element) => {
            tableauUser.push(
                new User(
                    element.name.title,
                    element.name.first,
                    element.name.last,
                    element.email,
                    element.location.city,
                    element.location.postcode,
                    element.location.country,
                    element.phone,
                    element.cell,
                    element.dob.date,
                    element.dob.age,
                )

            );
        });

        //  Tri du tableauUser par ordre alphabétique des noms, trie de A-Z
        tableauUser.sort((a, b) => {
            //  compare les noms (nom) de deux utilisateurs (a et b) en utilisant localeCompare pour effectuer un tri sensible à la casse et aux accents.
            return a.nom.localeCompare(b.nom);
        });
        // Affichage de chaque utilisateur dans le document HTML
        tableauUser.forEach((element) => {
            element.render();
        });
    });
};

// Appel de la fonction pour récupérer les utilisateurs
getUsers();


// Gestionnaire d'événements pour le tri des utilisateurs
document.querySelector(".filters").addEventListener("click", (event) => {
    // Vérification si la cible de l'événement n'a pas déjà la classe "selected"
    if (!event.target.classList.contains("selected")) {
        // Vérification de l'ID de la cible de l'événement pour déterminer le type de tri
        if (event.target.id === "sort--name") {
            // Suppression de la classe "selected" de l'élément actuellement sélectionné
            document.querySelector(".selected").classList.remove("selected");
            // Ajout de la classe "selected" à l'élément sur lequel l'utilisateur a cliqué
            event.target.classList.add("selected");

            // Tri du tableauUser par ordre alphabétique des noms
            tableauUser.sort((a, b) => {
                return a.nom.localeCompare(b.nom);
            });
            // Effacement du contenu principal dans le document HTML
            document.querySelector("main").innerHTML = "";

            // Affichage de chaque utilisateur dans le document HTML
            tableauUser.forEach((element) => {
                element.render();
            });

        } else if (event.target.id === "sort--age") {
            // Suppression de la classe "selected" de l'élément actuellement sélectionné
            document.querySelector(".selected").classList.remove("selected");
            // Ajout de la classe "selected" à l'élément sur lequel l'utilisateur a cliqué
            event.target.classList.add("selected");

            // Tri du tableauUser par ordre croissant des âges
            tableauUser.sort((a, b) => {
                return a.age - b.age;
            });
            // Effacement du contenu principal dans le document HTML
            document.querySelector("main").innerHTML = "";

            // Affichage de chaque utilisateur dans le document HTML
            tableauUser.forEach((element) => {
                element.render();
            });
        }

    }
});
