const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bb2f5b7a99mshcd6441e8110b57dp14a975jsn48a3ed6b83b2',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};


let input = document.getElementById("inpu");
let html = document.querySelector("html"); 
let prueba = document.querySelector(".prueba");
let URL_search = `https://online-movie-database.p.rapidapi.com/title/v2/find?title=spider&titleType=movie&limit=20&sortArg=boxoffice_gross_us%2Casc`;

function buscar(){
    let palabra = input.value;
    let arrayP = palabra.split(" ");
    if(palabra != ""){
        if(arrayP.length == 1){
            URL_search = `https://online-movie-database.p.rapidapi.com/title/v2/find?title=${input.value}&titleType=movie&limit=20&sortArg=boxoffice_gross_us%2Casc`
            
        }
        else{
            let newstring = arrayP.join("%20");
            console.log(newstring)
            URL_search = `https://online-movie-database.p.rapidapi.com/title/v2/find?title=${newstring}&titleType=movie&limit=20&sortArg=boxoffice_gross_us%2Casc`
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
            <img src="${pelicula.image.url}" alt="">
            <div>
            <p class="tituloPeli">${pelicula.title}</p>
            <p class="añoPeli">${pelicula.year}</p>
            </div>
        </div>
            `
        )
        
        const main = document.querySelector(".containerPelis");
        main.append(article)
    })
    });
}