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