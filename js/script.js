'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll(".promo__adv img");
    const promoBG = document.querySelector(".promo__bg");
    const genre = document.querySelector(".promo__genre");
    const movieList = document.querySelector(".promo__interactive-list");
    const addForm = document.querySelector("form.add");
    const addInput = document.querySelector(".adding__input");
    const favorite = document.querySelector("[type='checkbox']");

    //замена изображения, замена жанра
    const makeChanges = () => {
        promoBG.style.background = "url('img/bg.jpg')";
        genre.textContent = "Драма";
    };

    //удаление рекламы
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    //сортировка фильмов в блоке "просмотренные фильмы"
    const sortArr = (arr) => {
        arr.sort();
    };

    //добавление нового фильма в блок "просмотренные фильмы"
    addForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let newFilm = addInput.value;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite.checked) {
                console.log("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    //формирование списка фильмов в блоке "просмотренные фильмы"
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);
        films.forEach((movie, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1}. ${movie}
                    <div class="delete"></div>
                </li>`;
        });

        document.querySelectorAll(".delete").forEach((btn, i) => {
            btn.addEventListener("click", () => {
                btn.parentElement.remove();
                films.splice(i, 1);
                createMovieList(movieDB.movies, movieList);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});