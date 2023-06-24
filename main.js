const main = document.querySelector(".containerPelis");
let html = document.querySelector("html"); 
let prueba = document.querySelector(".prueba");
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
function pelisPop(){

    function pedirPeliculas(done){
        const results = fetch(pelisPopulares,options);
        results
        .then(response => response.json())
        .then(data => {done(data)});
    }
    
    
    pedirPeliculas(data => {
        console.log(data);//hay que borrar esto al final
        const main = document.querySelector(".containerPelis");
        const titulo = document.querySelector(".titulocategorico");
        let textoT = "Peliculas populares";
        titulo.innerHTML = textoT;
        main.innerHTML = '';
        let article = ""
        //<p class="añoPeli">${pelicula.release_date}</p>
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
    function getColor(vote){
        if(vote >= 8){
            return 'green'
        }else if(vote >= 5){
            return 'orange'
        }else{
            return 'red';
        }
    }
function buscar(){
        
    let URL_search = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    let input = document.getElementById("inpu");
    let palabra = input.value;
    let arrayP = palabra.split(" ");
    if(palabra != ""){
        if(arrayP.length == 1){
            URL_search = `https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1`
        }
        else{
            let newstring = arrayP.join("%20");
            URL_search = `https://api.themoviedb.org/3/search/movie?query=${newstring}&include_adult=false&language=en-US&page=1`
        }
    }
    function getCharacters(done){
        const results = fetch(URL_search,options);
        results
        .then(res => res.json())
        .then(data => {done(data)});
    }

    main.innerHTML = '';
    getCharacters(data => {
    console.log(data);//hay que borrar esto al final
    data.results.forEach(pelicula => {
        if(pelicula.poster_path != null){
            const article = document.createRange().createContextualFragment(
                `
                <a href="#"  type="button" id="${pelicula.id}" onclick="infoPelicula(this.id)">
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
    });
}

function infoPelicula(id){

console.log(id);//despues borrar
let infoDePeli = `https://api.themoviedb.org/3/movie/${id}?language=es-MX`;

function getCharacters(done){
    const results = fetch(infoDePeli,options)
    results
    .then(response => response.json())
    .then(data => {
        done(data)
    })
}
main.innerHTML = '';

getCharacters(data => {
    console.log(data)
    const article = document.createRange().createContextualFragment(
        `
            <div class="peli"> 
                <img src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="">
                <div>
                    <p class="tituloPeli">${data.title}</p>
                    <p class="añoPeli">${data.release_date}</p>
                </div>
                <button class="trailer" id="${data.id}"> Trailer </button>
            </div>
            <p>${data.overview}</p>
        `
    )
    
        main.append(article)
        //hace que vuelva atras en la pagina
    window.addEventListener('popstate', function (e) {
        window.location.assign("index.html");        
    });
    document.getElementById(id).addEventListener('click',()=>{
         openNav(data)
    })
})

}

const overlayContent = document.getElementById('overlay-content')
function openNav(data) {
    let id=data.id
    fetch('https://api.themoviedb.org/3/movie/'+id+'/videos?'+'api_key=bb4facf10c4657e6ab4b2aad6a0ce077').then(res=>res.json())
    .then(videoData=>{
        console.log(videoData)
        if(videoData){
            document.getElementById("myNav").style.width = "100%";
            if(videoData.results.length>0){
              var embed=[];
              videoData.results.forEach(video=>{
                let {name, key, site}=video;
                if(site == 'YouTube'){
                    embed.push(`
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" 
                title="${name}" class="embed hide" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture; 
                web-share" allowfullscreen></iframe>
                    `)

                }            
              })             
              overlayContent.innerHTML=embed.join('')
              activeSlide=0;
              showVideos();
            }else{
               overlayContent.innerHTML=`<h1>No Results Found</h1>`
            }
        }
    })
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    const iframes = document.getElementsByTagName('iframe');
    if (iframes !== null) {
      for (let i = 0; i < iframes.length; i++) {
        iframes[i].src = iframes[i].src;
      }
    }
  }

  var activeSlide=0;
  var totalVideos=0;

function showVideos(){
    let embedClasses=document.querySelectorAll('.embed')
    totalVideos= embedClasses.length;
    embedClasses.forEach((embedTag, idx)=>{
      if(activeSlide==idx){
        embedTag.classList.add('show')
        embedTag.classList.remove('hide')
      }else{
        embedTag.classList.add('hide')
        embedTag.classList.remove('show')
      }
    })
}
const leftArrow=document.getElementById('left-arrow')
const rightArrow=document.getElementById('right-arrow')
leftArrow.addEventListener('click',()=>{
    if(activeSlide>0){
        activeSlide--;
    }else{ 
           activeSlide=totalVideos-1;
    }
    showVideos();
})
rightArrow.addEventListener('click',()=>{
    if(activeSlide<(totalVideos-1)){
        activeSlide++;
    }else{ 
           activeSlide=0;
    }
    showVideos();
})
linkcat = '';
function pelisCat(query){

    let linkcat = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=10&sort_by=vote_count.desc&with_genres=${query}&with_original_language=en`;

    function getCharacters(done){
        const results = fetch(linkcat,options)
        results
        .then(response => response.json())
        .then(data => {
            done(data)
        })
    }
    main.innerHTML = '';
    getCharacters(data => {
        console.log(data)//despues borrar
        
            data.results.forEach(pelicula => {
                if(pelicula.poster_path != null){

                    const article = document.createRange().createContextualFragment(
                        `
                        <a href="#"  type="button" id="${pelicula.id}" onclick="infoPelicula(this.id)">
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
    })
}

