const btnSwitch = document.querySelector('#switch')

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
});


let cont = 1;


function mostrarSiguiente() {
    cont++;
    URL_search = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${cont}`;

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
        console.log(cont)//borrar
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
    mostrarUOcultarAnterior();
    // window.history.forward();
}


function mostrarAnterior() {
    if (cont > 1) {
        cont--;
        URL_search = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${cont}`;
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
            console.log(cont)//borrar
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
    mostrarUOcultarAnterior();
    // window.history.back();
}

//funcion para mostrar el boton anterior en base a la pagina que se encuentra
function mostrarUOcultarAnterior() {
    if (cont == 1) {
        console.log("CONTADOR EN EL IF: ", cont)
        document.querySelector(".anterior").style.display = "none";
    }
    else {
        console.log("CONTADOR en el else: ", cont)
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
/*ARREGLAR ERRORES AL HACER CLICK EN EL BOTON TRAILER*/
/*ARREGLAR EL TEMA DEL PAGINADO*/