const btnSwitch = document.querySelector('#switch')

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
});


let cont = 1;


function mostrarSiguiente() {
    cont++;
    URL_search = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${cont}`;

    function getCharacters(done){
        const results = fetch(URL_search, options)
        results
        .then(response => response.json())
        .then(data => {
            done(data)
        })
    }

    getCharacters(data => {
        console.log(data)
        console.log(cont)

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
    if(cont > 1){
        cont--;
        URL_search = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${cont}`;
        function getCharacters(done){
            const results = fetch(URL_search, options)
            results
            .then(response => response.json())
            .then(data => {
                done(data)
            })
        }

        getCharacters(data => {
            console.log(data)
            console.log(cont)
    
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
    if(cont == 1){
        console.log("CONTADOR EN EL IF: ", cont)
        document.querySelector(".anterior").style.display = "none";
    }
    else {
        console.log("CONTADOR en el else: ", cont)
        document.querySelector(".anterior").style.display = "block";
    }
}



/*VER PARA AGREGAR UN BOTON PARA VOLVER ARRIBA DE TODO*/
/*MODIFICAR LO DEL JS PARA QUE AL ABRIR UNA PELI TE LA MUESTRE "BIEN"*/
/*ARREGLAR Q EL HOVER DE LAS PELIS SE SOBREPONE CON EL HEADER*/

/*DESPUES HACER RESPONSIVE*/