const fetch = require('node-fetch');

const url="http://www.imdb.com/title/tt7388562/";

function searchMovies(searchTerm){
    return fetch(`${url}${searchTerm}`)
    .then(response => response.text());
}


searchMovies('Paul, Apostle of Christ')
    .then(body => {
        console.log(body)
    });
