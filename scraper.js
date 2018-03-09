const fetch = require('node-fetch');
const cheerio = require('cheerio')



const searchUrl="http://www.imdb.com/find?q=star%20wars&s=tt&ref_=fn_al_tt_mr";
const movieUrl = 'https://www.imdb.com/title/';

function searchMovies(searchTerm){
    return fetch(`${searchUrl}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
        const movies = [];
        const $ = cheerio.load(body);
        $('.findResult').each(function(i, element){
            const $element = $(element);
            const $image = $element.find('td a img')
            const $title = $element.find('td.result_text a');

            const imdbID= $title.attr('href').match(/title\/(.*)\//)[1]; // reg ex match for imdb id
            const movie = {
                image: $image.attr('src'),
                title: $title.text(),
                imdbID
            };
            movies.push(movie)
        });
            return movies
    });
}
function getMovie(imdbID){
    return fetch (`${movieUrl}${imdbID}`)
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $title = $('.title_wrapper h1');

            const title = $title.first().contents().filter(function(){
                return this.type === 'text';
            }).text().trim();

            const rating = $('meta[itemProp="contentRating"]').attr('contents')
            return {
                title,
                rating
            };
        })
}

module.exports = {
    searchMovies,
    getMovie
};
