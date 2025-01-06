# Cahier des charges

**Client :** Center Of Data Analysis _(CODA)_  
**Projet :** Coda Bank  
**Délai accordé :** 3 jours _(fin le : mercredi 8 janvier 2025 à 23h59)_

## Contexte

Coda _(pas l'école, vous avez bien compris que c'est fictif hein ? 😉)_ vous propose un test technique avant de vous embaucher.  
Vous devez réaliser le prototype d'une application web qui permet de gérer des comptes bancaires.

Cette application doit être développée avec Typescript, et doit être exécutable dans un terminal _(NodeJS)_. Aucune interface graphique n'est requise, tout se fera au travers du terminal.

---

## Fonctionnalités attendues

### Connexion

- L'utilisateur doit pouvoir se connecter uniquement avec son code personnel _(PIN)_
- Il n'y a pas de base de données, vous pouvez stocker les données en mémoire _(pas de persistance)_
- La connexion est obligatoire pour accéder à l'application
- Si le code PIN est incorrect, l'utilisateur doit être notifié
- Après 3 tentatives invalides, l'application doit se fermer

### Liste des choix possibles

- Il faudra cependant compléter les fonctions pour qu'ils fassent ce qui est attendu !
- Les choix possibles sont :
  - Déposer de l'argent
  - Retirer de l'argent
  - Voir l'historique
  - Voir le solde
  - Quitter _(automatiquement généré par l'application)_

### Déposer de l'argent

- L'utilisateur doit pouvoir déposer de l'argent sur son compte
- Il doit renseigner le montant à déposer, au travers d'un prompt numérique
- Le montant doit être un entier positif _(pas de décimales)_

### Retirer de l'argent

- L'utilisateur doit pouvoir retirer de l'argent de son compte
- Il doit renseigner le montant à retirer, au travers d'un prompt numérique
- Le montant doit être un entier positif _(pas de décimales)_, qui sera déduit du solde

### Voir l'historique

- L'utilisateur doit pouvoir voir l'historique de ses opérations
- L'historique doit contenir la date, le type d'opération _(dépôt ou retrait)_, le montant, le solde après l'opération ainsi que la validité de l'opération _(réussie ou non)_
- L'historique doit afficher les 10 dernières opérations, mais doit tout de même enregistrer toutes les opérations effectuées sans limite

### Voir le solde

- L'utilisateur doit pouvoir voir le solde de son compte

### Quitter

**Cette fonctionnalité est déjà implémentée, vous n'avez rien à faire !**

- L'utilisateur doit pouvoir quitter l'application

## Contraintes

### Technologies

- Les choix de l'utilisateur sont gérés par la bibliothèque `prompts`, il faudra installer cette dépendance _(`npm install prompts`)_ pour que l'application fonctionne
- Vous devez utiliser Typescript _(interdiction d'utiliser un fichier Javascript)_
- L'utilisation du type `any` est interdite
- Le projet doit utiliser à minima la version 18 de NodeJS

### Versionning

- Vous devez utiliser Git pour versionner votre code
- Les répertoires `dist` et `node_modules` _(par exemple)_ ne doivent pas être versionnés

### Conventions

- Vous devez respecter les conventions de nommage que vous avez vous-même définies
- Un fichier `README.md` doit être présent à la racine du projet, expliquant comment installer et exécuter l'application

### Sécurité

- Vous devez respecter les principes de sécurité _(pas de stockage en clair du code PIN, utilisez un algorithme de hachage comme bcrypt ou argon2 par exemple)_

### Architecture

- Le découpage et la lisibilité du code sont importants
- Chaque fonctionnalité doit être dans un fichier différent
- L'architecture du projet doit être modulaire

### Choix utilisateur

- Le format des choix utilisateurs via la bibliothèque `prompts` doit être respecté :
  - Chaque choix doit être un objet avec une propriété `title`, une propriété `value` et une méthode `action` qui sera appelée si l'utilisateur choisit ce choix
  - Exemple :
    ```typescript
    {
      title: 'Déposer de l\'argent',
      value: 'deposit',
      action: () => {
        console.log("Déposer de l'argent");
      },
    }
    ```
- Attention, on ne peut pas lancer un CLI dans un autre CLI _(pas de `prompt` dans une fonction qui est déjà appelée par un `prompt`)_

### Autres

- L’utilisation d’une IA pour générer ou rédiger le code est interdite, mais elle peut être utilisée pour clarifier des concepts
- Les messages d'erreur doivent être explicites, sans donner d'informations sensibles ou compromettant la sécurité de l'application

---

## Bonus

Tu as terminé toutes les fonctionnalités ? Bravo ! 🎉  
Tu peux maintenant ajouter des fonctionnalités supplémentaires pour gagner des points bonus :

- Intégrer des tests unitaires _(Jest ou Mocha)_
- Ajouter un système de découvert _(un découvert autorisé, qui ne peut pas être dépassé)_
- Ajouter un système de placement _(transfert d'argent vers un compte épargne, lié au compte principal)_
- Rendre les données persistantes _(stockage dans un fichier JSON ou dans une base de données)_
- Ajouter un système de notification _([ntfy](https://ntfy.sh/) est très simple à utiliser !)_

---

**Bon courage !** 🚀
