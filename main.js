const searchBtn = document.getElementById('search');
const popularBtn = document.getElementById('popular');
const topRated = document.getElementById('top-rated');
const upComing = document.getElementById('up-coming');
const filmName = document.getElementById('film-name');
const API_KEY = 'f24a0fd18f52218851075901c5a108a0';
const listItemBlock = document.getElementById('list-item');

const imgFullPath = imgEl =>{
    return (imgEl === null) ? 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Нет_фото.png' : `https://image.tmdb.org/t/p/w300${imgEl}`;
};

const filmDescription = (filmTex) =>{
    return (filmTex === "") ? "Описание отсутствует" : filmTex.substr(0,100);
};



const searchFilm = (e) => {
    e.preventDefault();
    let allFilms = "";
    console.log(filmName.value);
    console.log(listItemBlock);
    listItemBlock.innerHTML = '';
    if (filmName.value !== '') {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + filmName.value)
            .then(response => {
                    if (response.status == 200) {
                        return response.json();
                    }
                    throw new Error("Error fetching data");
                }
            ).then(data => {
            console.log("DATA", data);
            const listFilms = data.results;
            console.log("listFilms", listFilms.length);

            if (listFilms.length === 0) {
                listItemBlock.innerHTML = '<p class="MovieList__msg"> SORRY, WE DIDN\'T FIND ANYTHING (⌣́_⌣̀)</p>';
            } else {
                listFilms.forEach (function (el) {
                    console.log("EL",el);
                    allFilms += `<div class="MovieList__item">
                            <div class="MovieCard">
                                <span class="MovieCard__rating">${el.vote_average}</span>
                                <img class="MovieCard__poster"  src='${imgFullPath(el.poster_path)}' alt="">
                                <div class="MovieInfo__info">
                                    <h2 class="MovieInfo__title">${el.title}</h2>
                                    <p class="MovieInfo__descr">${filmDescription(el.overview)}</p>
                                    <p class="MovieInfo__release">Release date:${el.release_date.split('-')[0]}</p>
                                </div>
                                <button class="MovieCard__btn">+</button>
                            </div>
                        </div>`;
                    listItemBlock.innerHTML = allFilms;

                });
            }

        }).catch(error => {
            console.error("Error: ", error);
        });

    }
    else{
        alert("Введите название фильма!");
    }
    filmName.value = '';
};
searchBtn.addEventListener('click',searchFilm);



const filmRating = (param) => {
    listItemBlock.innerHTML = '';
    let films ="";
    fetch(`https://api.themoviedb.org/3/movie/${param}?api_key=` + API_KEY)
        .then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                throw new Error("Error fetching data");
            }
        ).then(data => {
        const listFilms = data.results;
        console.log("listFilms", listFilms.length);
        listFilms.forEach (function (el) {
            console.log("EL",el);
            films +=
                `<div class="MovieList__item">
                            <div class="MovieCard">
                                <span class="MovieCard__rating">${el.vote_average}</span>
                                <img class="MovieCard__poster"  src='${imgFullPath(el.poster_path)}' alt="">
                                <div class="MovieInfo__info">
                                    <h2 class="MovieInfo__title">${el.title}</h2>
                                    <p class="MovieInfo__descr">${filmDescription(el.overview)}</p>
                                    <p class="MovieInfo__release">Release date:${el.release_date.split('-')[0]}</p>
                                </div>
                                <button class="MovieCard__btn">+</button>
                            </div>
                        </div>`;
            listItemBlock.innerHTML = films;
        });
    });
};

popularBtn.addEventListener('click',function(){filmRating("popular")});
topRated.addEventListener('click',function(){filmRating("top_rated")});
upComing.addEventListener('click',function(){filmRating("upcoming")});




