var searchBtn = document.getElementById('search');
var filmName = document.getElementById('film-name');
var API_KEY = 'f24a0fd18f52218851075901c5a108a0';
var listFilms;
var listItemBlock = document.getElementById('list-item');
searchFilm = (e) => {
    e.preventDefault();
    console.log(filmName.value);
    console.log(listItemBlock);
    listItemBlock.innerHTML = '';
    fetch('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + filmName.value)
        .then(response => {
                if (response.status == 200){
                    filmName.value ='';
                    return response.json();
                }
            throw new Error("Error fetching data");
            }
        ).then(data => {
        console.log("DATA", data);
        listFilms = data.results;
        console.log("listFilms",listFilms.length);

        if(data.results == 0){
            listItemBlock.innerHTML = '<p class="MovieList__msg"> SORRY, WE DIDN\'T FIND ANYTHING (⌣́_⌣̀)</p>';
        }else {
            for (var i = 0; i < listFilms.length; i++) {
                    listItemBlock.innerHTML +=
                        '<div class="MovieList__item">' +
                            '<div class="MovieCard">' +
                                '<span class="MovieCard__rating">' + listFilms[i].vote_average + '</span>' +
                                '<img class="MovieCard__poster"  src='+imgFullPath(listFilms[i].poster_path)+' alt="">' +
                                '<div class="MovieInfo__info">' +
                                    '<h2 class="MovieInfo__title">'+listFilms[i].title+'</h2>' +
                                    '<p class="MovieInfo__descr">'+filmDescription(listFilms[i].overview)+'</p>' +
                                    '<p class="MovieInfo__release">Release date:'+listFilms[i].release_date.split('-')[0]+'</p>' +
                                '</div>' +
                                '<button class="MovieCard__btn">+</button>'+
                            '</div>' +
                        '</div>'
            }
        }

    }).catch(error => {
        console.error("Error: ", error);
    });

};

searchBtn.addEventListener('click',searchFilm);

imgFullPath = (imgEl) =>{
    if(imgEl == null){
        imgEl = "https://upload.wikimedia.org/wikipedia/commons/9/9a/Нет_фото.png"
    }
    else{
        imgEl = "https://image.tmdb.org/t/p/w300/"+imgEl;
    }
    return imgEl;
};

filmDescription = (filmTex) =>{
    if(filmTex == ""){
        filmTex = "Описание отсутствует"
    }
    else{
        filmTex+=filmTex;
    }
    return filmTex.substr(0,100);
};


/*.then(function(data) {
 console.log(data);
 listFilms = data.results;
 console.log("test");
 if(data.results == 0){
 listItemBlock.innerHTML = '<p> No films</p>';
 console.log("NO FILMS!");
 }
 else {
 for (var i = 0; i < listFilms.length; i++) {
 console.log(listFilms[i].title);
 listItemBlock.innerHTML += listFilms[i].title
 }
 }

 }) })*/