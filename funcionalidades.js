const btnSwitch = document.querySelector('#switch')

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
});


let cont1 = 1;
let cont2 = 1;
let cont3 = 1;
let aver = " ";
let seG = 0;
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
        console.log(data)//borrar
       
        topFunction()
        main.innerHTML = '';
        let article = ""
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
    mostrarUOcultarAnterior(prueb);
    // window.history.forward();
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
            console.log(data)//borrar despues
            
            topFunction()
            main.innerHTML = '';
            let article = ""
            data.results.forEach(pelicula => {
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
    mostrarUOcultarAnterior(prueb);
    // window.history.back();
}

//funcion para mostrar el boton anterior en base a la pagina que se encuentra
function mostrarUOcultarAnterior(prueb) {
    if (prueb == 1) {
        console.log("CONTADOR EN EL IF: ", cont1, cont2, cont3)//borrar
        document.querySelector(".anterior").style.display = "none";
    }
    else {
        console.log("CONTADOR en el else: ", cont1, cont2, cont3)//borrar
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

/*MODIFICAR LO DEL JS PARA QUE AL ABRIR UNA PELI TE LA MUESTRE "BIEN"*/
/*ARREGLAR EL TEMA DEL PAGINADO*/