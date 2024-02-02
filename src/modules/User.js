// Créez un module User.js qui exporte une classe User
//avec les propriétés et les méthodes suivantes. À vous de les nommer et de les implémenter
//- Une ou plusieurs propriétés contenant les informations d’un utilisateur (nom, âge, email, photo etc…).
//Une propriété indiquant si l’utilisateur est présent ou non. Celle-ci devrait être `false` par défaut.
// Une propriété se référant à l’élément utilisateur qui sera généré par la méthode décrite directement **ci-dessous.**

// propriété privées de la classe
class User {
    #titre;
    #prenom;
    nom;
    #ville;
    #pays;
    age;
    #email;
    #photo;
    #present;
    #element;

    // Propriété statique pour compter le nombre de personnes présentes
    static compteurPresence = 0;

    constructor(titre, prenom, nom, ville, pays, age, email, photo) {
        // Initialisation des propriétés privées et publiques
        this.#titre = titre;
        this.#prenom = prenom;
        this.nom = nom;
        this.#ville = ville;
        this.#pays = pays;
        this.age = age;
        this.#email = email;
        this.#photo = photo;
        this.#present = false;
        this.#element = this.#generateElement();

        // Ajout d'un écouteur d'événements pour gérer le clic sur l'élément utilisateur
        this.#element.addEventListener("click", (event) => {
            this.#togglePresence(event.currentTarget);
        });

    }

    // Méthode pour générer un élément utilisateur, 
    // elle est utilisée pour créer et générer un élément HTML représentant les informations d'un utilisateur. 
    #generateElement() {
        // un nouvel élément div est créé
        const div = document.createElement("div");
        // ajout de la classe user
        div.classList.add("user");
        // ajout de l'attribut data-present
        div.dataset.present = this.#present;
        // construction du contenu HTML à l'intéreiur de la div
        /* Un bloc de texte est créé avec des balises HTML. Il contient une image, des informations de l'utilisateur telles que le nom, l'âge, la ville et le pays, ainsi qu'un lien de messagerie électronique.
        Les informations de l'utilisateur sont obtenues à partir des propriétés privées (#titre, #prenom, nom, age, #ville, #pays, #email) de l'objet User.  */
        const contenu = `
        <img src="${this.#photo}">
		<div class="user--info">
				<h1>${this.#titre} ${this.#prenom} ${this.nom}</h1>
				<p>${this.age} years old</p>
				<p>${this.#ville}, ${this.#pays}</p>
		</div>
        <a href="mailto:${this.#email}">
			<span class="mail">✉️</span>
		</a>`;
        // Le contenu HTML construit est inséré dans l'élément <div> nouvellement créé. L'option "afterbegin" signifie que le contenu sera inséré au début de l'élément.
        div.insertAdjacentHTML("afterbegin", contenu);

        return div;
    }

    // Méthode d’affichage des éléments utilisateurs
    render() {
        document.querySelector("main").appendChild(this.#element);
    }


    // Méthode d’inversion de présence
    #togglePresence(div) {
        // Vérification de l'état de présence actuel
        if (this.#present) {
            // Changement de l'état de présence et mise à jour du compteur
            // La propriété dataset.present de l'élément <div> est mise à jour pour refléter le nouvel état.
            div.dataset.present = false;
            // La propriété privée #present de l'objet User est mise à jour.
            this.#present = false;
            User.compteurPresence--;
        } else {
            // Changement inverse de l'état de présence et mise à jour du compteur
            div.dataset.present = true;
            this.#present = true;
            User.compteurPresence++;
        }
        // Mise à jour du compteur d'utilisateurs présents
        document.querySelector(
            ".counter"
        ).textContent = `${User.compteurPresence}/20 people are here`;
    }

}

export default User;


