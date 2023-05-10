# ensta-in211
## Introduction


## Todolist
1. change the home page (replaced by yu'ang's ), load more
2. login page amelioration, jwt, logout
3. user page list of movies, add/del movies to/from my list
4. comments
5. system de recommendation
6. add more info to movie page (filmDetail)


## Répartition de travail
1. Yu'ang: 1+3
2. Jia: 2+4
3. Timothé: 5+6


## To generate public/private key pair, use the following command in /backend:
openssl genrsa  -out private.key 2048
openssl rsa -in private.key -outform PEM -pubout -out public.key

npm install moment  
npm install jsonwebtoken 
npm install bcypt
 <!-- npm install js-md5 -->



 Exigence:
 - **ETQU, sur la page d'accueil je vois une liste de 100 films ou plus triés selon un critère au choix**

- **ETQU, j'ai accès à une page ou je peux manuellement ajouter des films sur mon site**

- **ETQU, sur la page d'accueil je peux faire une recherche par nom sur les films**

- **ETQU, sur la page d'accueil quand je clique sur un film, j'arrive sur une page dédiée qui me présente les détails du film / ETQU, sur la page d'accueil je peux directement voir les détails d'un film**

- **ETQU, sur la page de détails d'un film, je peux ajouter un commentaire qui contient une note au nom d’un user**

- **ETQU, sur la page d’accueil je vois une liste de films triés par nombre de likes**

Bonus:
**ETQDev je peux filtrer la liste des films via l'input de recherche**

**ETQU, je vois un message me disant qu'aucun résultat n'a été trouvé si le tableau de films est vide**

### ETQDev je peux faire un script pour peupler ma base de données

### ETQDev je peux connecter mon front avec le backend via un formulaire d'ajout de films