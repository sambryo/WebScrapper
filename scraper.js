const fetch = require('node-fetch');
const cheerio = require('cheerio')



const url="http://www.imdb.com/find?q=star%20wars&s=tt&ref_=fn_al_tt_mr";

function searchMovies(searchTerm){
    return fetch(`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
        const movies = [];
        const $ = cheerio.load(body);
        $('.findResult').each(function(i, element){
            const $element = $(element);
            const $image = $element.find('td a img')
            const $title = $element.find('td.result_text a');
            const movie = {
                image: $image.attr('src'),
                title: $title.text()
            };
            movies.push(movie)
        });
            return movies
    });
}


searchMovies('Star wars')


module.exports = {
    searchMovies
};
