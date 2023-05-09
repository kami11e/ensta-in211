
api_key=522d421671cf75c2cba341597d86403a
url=https://api.themoviedb.org/3/movie
local_url=http://localhost:8080/api
# page=1
# rm input.json
for page in {1..10}
do
    curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET "$url/popular?api_key=$api_key&page=$page"  >input.json
    sed -i "s/\\\\\"/'/g" input.json
    # sed -i "s/\\\\\"/'/g" input.json
    sleep 1
    jq -c '.results[]' input.json | while read i; do
        # do stuff with $i
        curl -s --header "Content-Type: application/json" \
        --request POST \
        --data "$i" \
        http://localhost:8080/api/movies/news -:
        echo $page
        # sleep 1
    done
    # sleep 1
done


