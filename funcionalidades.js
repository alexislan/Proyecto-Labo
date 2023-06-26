//VARIABLES
let cont1 = 1;
let cont2 = 1;
let cont3 = 1;
let aver = " ";
let seG = 0;

//FUNCIONALIDAD DE LOS BOTONES SIGUIENTE Y ANTERIOR
function mostrarSiguiente(query,int) {
    if(int === 1){
        cont1++;
        URL_search = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${cont1}`;
        prueb = cont1;
        cont2 = 1;
        cont3 = 1;
    }else if(int === 2){
        cont2++;
        URL_search = query+cont2;
        prueb = cont2;
        cont1 = 1;
        cont3 = 1;
    }else if(int === 3){
        cont3++;
        let prueba = query.split(" ");
        let nuevo = prueba.join(cont3);
        URL_search = nuevo;
        prueb = cont3;
        cont2 = 1;
        cont1 = 1;
    }
    

    function getCharacters(done) {
        const results = fetch(URL_search, options)
        results
            .then(response => response.json())
            .then(data => {
                done(data)
            })
    }

    getCharacters(data => {
        topFunction()
        main.innerHTML = '';
        let article = ""
        data.results.forEach(pelicula => {
            
            article += 
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
    mostrarUOcultarAnterior(prueb);
}

let prueb;
function mostrarAnterior(query,int) {
    if (cont1 > 1 || cont2 > 1 || cont3 > 1) {
        if(int === 1){
            cont1--;
            URL_search = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${cont1}`;
            prueb = cont1;
            cont2 = 1;
            cont3 = 1;
        }else if(int === 2){
            cont2--;
            URL_search = query+cont2;
            prueb = cont2;
            cont1 = 1;
            cont3 = 1;
        }else if(int === 3){
            cont3--;
            let prueba = query.split(" ");
            let nuevo = prueba.join(cont3);
            URL_search = nuevo;
            prueb = cont3;
            cont1 = 1;
            cont2 = 1;
        }
        function getCharacters(done) {
            const results = fetch(URL_search, options)
            results
                .then(response => response.json())
                .then(data => {
                    done(data)
                })
        }

        getCharacters(data => {
            topFunction()
            main.innerHTML = '';
            let article = ""
            data.results.forEach(pelicula => {
                
                article +=
                    `
                    <a href="#" type="button" id="${pelicula.id}" style="text-decoration:none" onclick="infoPelicula(this.id)">
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
    mostrarUOcultarAnterior(prueb);
    // window.history.back();
}

//funcion para mostrar el boton anterior en base a la pagina que se encuentra
function mostrarUOcultarAnterior(prueb) {
    if (prueb == 1) {
        document.querySelector(".anterior").style.display = "none";
    }
    else {
        document.querySelector(".anterior").style.display = "block";
    }
}


let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}


function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}




//flecha para volver atras
flecha.addEventListener('click', function(){
    flecha.innerHTML = '';
    main.innerHTML = inerMain;
    titulo.innerHTML = inerTitle;
    info.innerHTML = '';
    banner.innerHTML = inerBan;
    tituloPrincipal.innerHTML = inerTitleP;
    botonPag.innerHTML = inerBoton;
})
///////////////



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