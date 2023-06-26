//permisos para consumir la api
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjRmYWNmMTBjNDY1N2U2YWI0YjJhYWQ2YTBjZTA3NyIsInN1YiI6IjY0OGU4Mjc3MmY4ZDA5MDBlMzg1YTg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PQtDV8AM3HocDZ_VMGdQ3WxlvFQNzhPmxCAV191I50M'
    }
};
///////

//DOM
const titulo = document.querySelector(".titulocategorico");
const main = document.querySelector(".containerPelis");
const info = document.querySelector(".infoPeliculas");
const botonPag = document.querySelector(".divBotonesCambioPagina");
const banner = document.querySelector(".pr");
const tituloPrincipal = document.querySelector(".tituloPag");
const flecha = document.querySelector(".flechAtras");
let input = document.getElementById("inpu");
/////////

//CREACION DE VARIABLES
let URL_search = '';
let textoT = '';
let linkcat = '';
let inerMain = '';
let inerTitle = '';
let inerBan = '';
let inerBoton = '';
let inerTitleP = tituloPrincipal.innerHTML;
let pelisPopulares = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
////////


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
///////

//FUNCION PARA HACER QUE NO SE VEA LA FLECHA SUPERIOR IZQ
function botonFlecha(){
    flecha.innerHTML = '<button class= "filtro"><img src="imagenes/left-arrow-alt-regular-24.png" alt="flecha return" ></button>'
}
///////




// MUESTRA LAS PELICULAS POPULARES
function pelisPop() {
    botonFlecha();
    function pedirPeliculas(done) {
        const results = fetch(pelisPopulares, options);
        results
            .then(response => response.json())
            .then(data => { done(data) });
    }


    pedirPeliculas(data => {
        titulo.innerHTML = '';
        titulo.innerHTML = `<h3 style="margin-top: 2rem">Popular movies</h3>`;
        inerTitle = titulo.innerHTML;
        main.innerHTML = '';
        let article = ""
        banner.innerHTML = '';
        data.results.forEach(pelicula => {
            if(pelicula.vote_average >= 8){
                banner.innerHTML = `<div class="bannerImg"><a href="#" type="button" id="${pelicula.id}" style="text-decoration:none" onclick="infoPelicula(this.id)"><img src="https://image.tmdb.org/t/p/original/${pelicula.backdrop_path}" alt="Pelicula mas votada"><p>${pelicula.title}</p></a></div>`
                inerBan = banner.innerHTML;
            }
            article +=
                `
                <a href="#" type="button" id="${pelicula.id}" style="text-decoration:none" onclick="infoPelicula(this.id)">
                    <div class="peli"> 
                        <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" alt="">
                        <div>
                            <p class="tituloPeli">${pelicula.title}</p>
                            <div class = "puntajeP">
                            <span class="${getColor(pelicula.vote_average)}">${(Math.round(pelicula.vote_average * 10) /10)}</span>
                            <img src="imagenes/star-solid-24.png">
                            </div>
                        </div>
                    </div>
                </a>
                `
                ;

            main.innerHTML = article;
        })
        inerBoton = botonPag.innerHTML;
    });
}
/////////







//funcion para buscar las peliculas con el input
function buscar() {
    let palabra = input.value;
    if (palabra != "") {
        botonFlecha();
        let guarda = '';
        info.innerHTML = '';
        tituloPrincipal.innerHTML = '';
        inerTitleP = tituloPrincipal.innerHTML;
        banner.innerHTML = '';
        inerBan = banner.innerHTML;
        let arrayP = palabra.split(" ");
            if (arrayP.length == 1) {
                URL_search = `https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1`
                guarda = `https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=`;
            }
            else {
                let newstring = arrayP.join("%20");
                URL_search = `https://api.themoviedb.org/3/search/movie?query=${newstring}&include_adult=false&language=en-US&page=1`
                guarda = `https://api.themoviedb.org/3/search/movie?query=${newstring}&include_adult=false&language=en-US&page=`
            }
        
        function getCharacters(done) {
            const results = fetch(URL_search, options);
            results
                .then(res => res.json())
                .then(data => { done(data) });
        }

        main.innerHTML = '';
        getCharacters(data => {
            titulo.innerHTML = `<h3 style="margin-top: 2rem">Search Results for: ${palabra}</h3>`;
            inerTitle = titulo.innerHTML;
            data.results.forEach(pelicula => {
                if (pelicula.poster_path != null) {
                    const article = document.createRange().createContextualFragment(
                        `
                    <a href="#" type="button" id="${pelicula.id}" style="text-decoration:none" onclick="infoPelicula(this.id)">
                        <div class="peli"> 
                            <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" alt="">
                            <div>
                                <p class="tituloPeli">${pelicula.title}</p>
                                <div class = "puntajeP">
                                <span class="${getColor(pelicula.vote_average)}">${(Math.round(pelicula.vote_average * 10) /10)}</span>
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
            <button class="anterior btn" type="button" onclick="mostrarAnterior('${guarda}',2)">Back</button>
            <button class="siguiente btn" type="button" onclick="mostrarSiguiente('${guarda}',2)">Next</button>
            `;
            inerBoton = botonPag.innerHTML;
        });
    }
}
///////////






//funcion para pedir peliculas segun la categoria
function pelisCat(query, cat) {
    flecha.innerHTML = '<button class= "filtro"><img src="imagenes/left-arrow-alt-regular-24.png" alt="flecha return" ></button>'
    tituloPrincipal.innerHTML = '';
    inerTitleP = tituloPrincipal.innerHTML;
    banner.innerHTML = '';
    inerBan = banner.innerHTML;
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
        titulo.innerHTML = '';
        info.innerHTML = '';
        
        if (cat === 'Documentarys') {
            textoT = `${cat}`;
        }else {
            textoT = `${cat} Movies`;
        }
        // titulo.innerHTML = textoT;
        titulo.innerHTML = `<h3 style="margin-top: 2rem">${textoT}</h3>`;
        data.results.forEach(pelicula => {
            if (pelicula.poster_path != null) {

                const article = document.createRange().createContextualFragment(
                    `
                        <a href="#" type="button" id="${pelicula.id}" style="text-decoration:none" onclick="infoPelicula(this.id)">
                        <div class="peli"> 
                            <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" alt="">
                        <div>
                            <p class="tituloPeli">${pelicula.title}</p>
                            <div class = "puntajeP">
                                <span class="${getColor(pelicula.vote_average)}">${(Math.round(pelicula.vote_average * 10) /10)}</span>
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
        <button class="anterior btn" type="button" onclick="mostrarAnterior('${guarda}',3)">Back</button>
        <button class="siguiente btn" type="button" onclick="mostrarSiguiente('${guarda}',3)">Next</button>
        `;
    })
}
//////////////////




//funcion para ver la info de las peliculas
function infoPelicula(id) {
    flecha.innerHTML = '<button><img src="imagenes/left-arrow-alt-regular-24.png" alt="flecha return" ></button>'
    tituloPrincipal.innerHTML = '';
    banner.innerHTML = '';
    let infoDePeli = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

    function getCharacters(done) {
        const results = fetch(infoDePeli, options)
        results
            .then(response => response.json())
            .then(data => {
                done(data)
            })
    }
    inerMain = main.innerHTML;
    inerTitle = titulo.innerHTML;
    main.innerHTML = '';
    botonPag.innerHTML = '';
    getCharacters(data => {
        textoT = `${data.title}`
        titulo.innerHTML = `<h3 style="margin-top: 2rem" class="titulocategorico">${textoT}</h3>`;
        let genres = data.genres;
        let generos = '';
        for(let y = 0; y < genres.length; y++){
            if(y == genres.length-1){
                generos += genres[y].name;
            }else{
                generos += genres[y].name + "," + " ";
            }
        }
        const article = document.createRange().createContextualFragment(
            `
            <div class="infoPeli"> 
                <div class="bannerImg">
                <img src="https://image.tmdb.org/t/p/original/${data.backdrop_path}" alt="">
                </div>
                <div class="poster">
                <img src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="">                
                </div>
                <div class="miniInfo">
                    <div class = "puntajeP">
                        <span class="${getColor(data.vote_average)}">${(Math.round(data.vote_average * 10) / 10)}</span>
                        <img src="imagenes/star-solid-24.png">
                    </div>
                    <button class="trailer" id="${data.id}" onclick="verTrailer(this.id)"> Trailer </button>
                </div>
                    <div class="datosPe">
                    <h4>GENRES</h4>
                    <p>${generos}</p>
                    <h4>RUNTIME</h4>
                    <p>${data.runtime}MIN</p>
                    <h4>RELEASE DATE</h4>
                    <p>${data.release_date}</p>
                    <h4>THE SYNOPSIS</h4>
                    <p>${data.overview}</p>
                    </div>
            </div>
        `
        )
        
        info.append(article)
    })
}
/////////
