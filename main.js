const searchBtn = document.getElementById('search');
const filmName = document.getElementById('film-name');
const API_KEY = 'f24a0fd18f52218851075901c5a108a0';
const listItemBlock = document.getElementById('list-item');

const imgFullPath = (imgEl) =>{

    (imgEl == null) ? imgEl = 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Нет_фото.png' : imgEl = 'https://image.tmdb.org/t/p/w300'+imgEl;
   /* console.log(imgEl);*/
    return imgEl;
};

const filmDescription = (filmTex) =>{
    (filmTex == "") ? filmTex = "Описание отсутствует" : filmTex;
    return filmTex.substr(0,100);
};

const searchFilm = (e) => {
    e.preventDefault();
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
                    listItemBlock.innerHTML +=
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
                        </div>`
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