//These are the important links to the API
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=43d71ee63abcb0dbdaabeac7acf7678e&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

//These are used to create html elements to which JS will be applied
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)
//This method fetches APILink as the url and returns a response that gets converted to json data. 
function returnMovies(url)
{
    
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(element => {

            //For each of the elements inside each card we are changing the values as per what is in the response sent by the API.
            //For each of these elements we are setting the attributes such as class and id as per what is mentioned in html.
            const div_card = document.createElement('div');
            div_card.setAttribute('class','card');

            const div_column = document.createElement('div');
            div_column.setAttribute('class','column');

            const div_row = document.createElement('div');
            div_row.setAttribute('class','row');

            const image = document.createElement('img');
            image.setAttribute('class','thumbnail');
            image.setAttribute('id','image');

            const title = document.createElement('h3');
            title.setAttribute('id','title');

            const center = document.createElement('center');
            //title will be changed to the respective movies title and image source will also be changed.
            // title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
            title.innerHTML = `
            <h3 class="movie-title">${element.title}</h3>
            <a href="movie.html?id=${element.id}&title=${element.title}" class="reviews-link">Reviews</a>`;

            image.src = IMG_PATH + element.poster_path;
            
            //Since the image tag is inside the center tage we append it inside the image tag. Same logic for rest
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
            main.appendChild(div_row);

            
        });
    });
}
//Create an event listener that listents to the submit action given by the user (Clicking enter)
//e is the event object and preventing default is done to prevent the default action done by submit which is reload
form.addEventListener("submit",(e) =>{
    e.preventDefault();
    main.innerHTML='';
    //Whatever is the searchterm will be inside this
    const searchItem = search.value;
    if(searchItem){
        //running a query with the search term that gives us result
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
}
);


