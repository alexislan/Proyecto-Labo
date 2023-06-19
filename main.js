const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjRmYWNmMTBjNDY1N2U2YWI0YjJhYWQ2YTBjZTA3NyIsInN1YiI6IjY0OGU4Mjc3MmY4ZDA5MDBlMzg1YTg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PQtDV8AM3HocDZ_VMGdQ3WxlvFQNzhPmxCAV191I50M'
    }
  };


let input = document.getElementById("inpu");
let html = document.querySelector("html"); 
let prueba = document.querySelector(".prueba");
let URL_search = `https://api.themoviedb.org/3/search/movie?query=fast%20x&include_adult=false&language=en-US&page=1`;

function buscar(){


    let palabra = input.value;
    let arrayP = palabra.split(" ");
    if(palabra != ""){
        if(arrayP.length == 1){
            URL_search = `https://api.themoviedb.org/3/search/movie?query=${palabra}&include_adult=false&language=en-US&page=1`
            
        }
        else{
            let newstring = arrayP.join("%20");
            console.log(newstring)
            URL_search = `https://api.themoviedb.org/3/search/movie?query=${newstring}&include_adult=false&language=en-US&page=1`
        }
    }
    function getCharacters(done){
        const results = fetch(URL_search,options);
        results
        .then(response => response.json())
        .then(data => {done(data)});
    }


    getCharacters(data => {
    console.log(data);
    data.results.forEach(pelicula => {
        const article = document.createRange().createContextualFragment(
            `
        <div class="peli"> 
            <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" alt="">
            <div>
            <p class="tituloPeli">${pelicula.title}</p>
            <p class="añoPeli">${pelicula.release_date}</p>
            </div>
        </div>
            `
        )
        
        const main = document.querySelector(".containerPelis");
        main.append(article)
    })
    });
}