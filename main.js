const titulo = document.querySelector(".titulocategorico");
const main = document.querySelector(".containerPelis");
const info = document.querySelector(".infoPeliculas");
const botonPag = document.querySelector(".divBotonesCambioPagina");
const banner = document.querySelector(".pr");
const tituloPrincipal = document.querySelector(".tituloPag");
let URL_search = '';
let textoT = '';
let linkcat = '';
let pelisPopulares = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"


//permisos para consumir la api
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjRmYWNmMTBjNDY1N2U2YWI0YjJhYWQ2YTBjZTA3NyIsInN1YiI6IjY0OGU4Mjc3MmY4ZDA5MDBlMzg1YTg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PQtDV8AM3HocDZ_VMGdQ3WxlvFQNzhPmxCAV191I50M'
    }
};




//peliculas populares 
function pelisPop() {

    function pedirPeliculas(done) {
        const results = fetch(pelisPopulares, options);
        results
            .then(response => response.json())
            .then(data => { done(data) });
    }


    pedirPeliculas(data => {
        console.log(data);//hay que borrar esto al final
        const main = document.querySelector(".containerPelis");
        titulo.innerHTML = '';
        textoT = "Peliculas populares";
        titulo.innerHTML = textoT;
        main.innerHTML = '';
        let article = ""
        banner.innerHTML = '';
        data.results.forEach(pelicula => {
            if(pelicula.vote_average >= 8){
                banner.innerHTML = `<a href="#" type="button" id="${pelicula.id}" onclick="infoPelicula(this.id)"><img src="https://image.tmdb.org/t/p/original/${pelicula.backdrop_path}" alt="Pelicula mas votada"></a>`;
            }
            article += //agregar la funcion al onclick
                `
                <a href="#" type="button" id="${pelicula.id}" onclick="infoPelicula(this.id)">
                    <div class="peli"> 
                        <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" alt="">
                        <div>
                            <p class="tituloPeli">${pelicula.title}</p>
                            <div class = "puntajeP">
                            <span class="${getColor(pelicula.vote_average)}">${pelicula.vote_average}</span>
                            <img src="imagenes/star-solid-24.png">
                            </div>
                        </div>
                    </div>
                </a>
                `
                ;

            main.innerHTML = article;
        })
    });


}

//funcion para cambiar de color el puntaje
function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red';
    }
}


//funcion para buscar las peliculas con el input
function buscar() {
    let guarda = '';
    tituloPrincipal.innerHTML = '';
    banner.innerHTML = '';
    let input = document.getElementById("inpu");
    let palabra = input.value;
    let arrayP = palabra.split(" ");
    if (palabra != "") {
        if (arrayP.length == 1) {
            URL_search = `https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1`
            guarda = `https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=`;
        }
        else {
            let newstring = arrayP.join("%20");
            URL_search = `https://api.themoviedb.org/3/search/movie?query=${newstring}&include_adult=false&language=en-US&page=1`
            guarda = `https://api.themoviedb.org/3/search/movie?query=${newstring}&include_adult=false&language=en-US&page=`
        }
    }
    function getCharacters(done) {
        const results = fetch(URL_search, options);
        results
            .then(res => res.json())
            .then(data => { done(data) });
    }

    main.innerHTML = '';
    getCharacters(data => {
        console.log(data);//hay que borrar esto al final
        titulo.innerHTML = "Resultados para: "+ palabra;
        data.results.forEach(pelicula => {
            if (pelicula.poster_path != null) {
                const article = document.createRange().createContextualFragment(
                    `
                <a href="#" type="button" id="${pelicula.id}" onclick="infoPelicula(this.id)">
                    <div class="peli"> 
                        <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" alt="">
                        <div>
                            <p class="tituloPeli">${pelicula.title}</p>
                            <div class = "puntajeP">
                            <span class="${getColor(pelicula.vote_average)}">${pelicula.vote_average}</span>
                            <img src="imagenes/star-solid-24.png">
                            </div>
                        </div>
                    </div>
                </a>
                `
                )

                main.append(article)
            }

        })
        botonPag.innerHTML = `
        <button class="anterior btn" type="button" onclick="mostrarAnterior('${guarda}',2)">Anterior</button>
        <button class="siguiente btn" type="button" onclick="mostrarSiguiente('${guarda}',2)">Siguiente</button>
        `;
    });
}



//funcion para ver la info de las peliculas
function infoPelicula(id) {
    tituloPrincipal.innerHTML = '';
    banner.innerHTML = '';
    console.log(id);//despues borrar
    let infoDePeli = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

    function getCharacters(done) {
        const results = fetch(infoDePeli, options)
        results
            .then(response => response.json())
            .then(data => {
                done(data)
            })
    }
    main.innerHTML = '';

    getCharacters(data => {
        console.log(data)
        textoT = `${data.title}`
        titulo.innerHTML =textoT;
        const article = document.createRange().createContextualFragment(
            `
            <div class="infoPeli"> 
                <div class="banner">
                <img src="https://image.tmdb.org/t/p/original/${data.backdrop_path}" alt="">
                </div>
                <div class="poster">
                <img src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="">
                </div>
                <div>
                    <div class = "puntajeP">
                        <span class="${getColor(data.vote_average)}">${data.vote_average}</span>
                        <img src="imagenes/star-solid-24.png">
                    </div>
                    <p>Duracion: ${data.runtime}min</p>
                    <p class="añoPeli">Fecha de lanzamiento: ${data.release_date}</p>
                </div>
                    <button class="trailer" id="${data.id}" onclick="verTrailer(this.id)"> Trailer </button>
                    <div>
                        <p>${data.overview}</p>
                    </div>
            </div>
        `
        )
        
        info.append(article)
        
    })

}





//funcion para ver el trailer de la peli
function verTrailer(ide){
    URL_search = `https://api.themoviedb.org/3/movie/${ide}/videos?language=en-US`;

    function getCharacters(done) {
        const results = fetch(URL_search, options)
        results
            .then(response => response.json())
            .then(data => {
                done(data)
            })
    }
    getCharacters(data => {
        console.log(data);
        data.results.forEach(video => {
            if(video.type === "Teaser"){
                window.location.href = `https://www.youtube.com/embed/${video.key}`
            }
        })
        
    })
}


//funcion para pedir peliculas segun la categoria
function pelisCat(query, cat) {
    tituloPrincipal.innerHTML = '';
    banner.innerHTML = '';
    linkcat = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${query}&with_original_language=en`;
    guarda = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page= &sort_by=vote_count.desc&with_genres=${query}&with_original_language=en`;
    function getCharacters(done) {
        const results = fetch(linkcat, options)
        results
            .then(response => response.json())
            .then(data => {
                done(data)
            })
    }
    main.innerHTML = '';
    getCharacters(data => {
        console.log(data)//despues borrar
        console.log(cat)//borrar
        titulo.innerHTML = '';
        if (cat === 'Bélicas') {
            textoT = `Peliculas ${cat}`;
        } else if (cat === 'Documentales') {
            textoT = `${cat}`;
        } else if (cat === 'Familiares') {
            textoT = `Peliculas ${cat}`;
        }
        else {
            textoT = `Peliculas de ${cat}`;
        }
        titulo.innerHTML = textoT;
        data.results.forEach(pelicula => {
            if (pelicula.poster_path != null) {

                const article = document.createRange().createContextualFragment(
                    `
                        <a href="#" type="button" id="${pelicula.id}" onclick="infoPelicula(this.id)">
                        <div class="peli"> 
                            <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" alt="">
                        <div>
                            <p class="tituloPeli">${pelicula.title}</p>
                            <div class = "puntajeP">
                                <span class="${getColor(pelicula.vote_average)}">${pelicula.vote_average}</span>
                                <img src="imagenes/star-solid-24.png">
                            </div>
                        </div>
                        </div>
                        </a>
                        `
                )
                main.append(article)
            }
        })
        botonPag.innerHTML = `
        <button class="anterior btn" type="button" onclick="mostrarAnterior('${guarda}',3)">Anterior</button>
        <button class="siguiente btn" type="button" onclick="mostrarSiguiente('${guarda}',3)">Siguiente</button>
        `;
    })
}