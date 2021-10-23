let moveiTemplate = document.querySelector("#movie-template").content
let bookmarkTempletes = document.querySelector("#bookmar-teplete").content

let movieList = document.querySelector(".movie-list")
let form = document.querySelector("form")
let ganreSelect = document.querySelector(".ganreSelect")
let searchInput = document.querySelector(".searchInput")
let sortSelect = document.querySelector(".sortSelect")
let modal = document.querySelector(".modal")
let modalBtn = document.querySelector(".modal-btn")
let bookmarkBtn = document.querySelector(".bookmark-btn")
let bookMadal = document.querySelector(".book-madal")
let bookRomove = document.querySelector(".book-romove-btn")
let bookmarkList = document.querySelector(".bookmark-list")

let ganerArr = []
let bookmarkArr = JSON.parse(window.localStorage.getItem("bookmarks") )|| []

let sortAaZz = (a, b)=>{
    if (a.title >b.title) {
        return 1
    }
    if (b.title > a.title) {
        return -1
    }

    return 0
}
let sortZzAz = (a, b)=>{
    if (a.title > b.title) {
        return -1
    }
    if (b.title > a.title) {
        return 1
    }

    return 0
}
let newOld =  (a, b)=>{
    return a.release_date- b.release_date
}
let oldNew =  (a, b)=>{
    return b.release_date - a.release_date
}

let sortFunt = {
    0: sortAaZz,
    1: sortZzAz,
    2: newOld,
    3:oldNew,
}

function createMovie(movie) {
    let elMovie = moveiTemplate.cloneNode(true)
    elMovie.querySelector(".movie-img").src = movie.poster
    elMovie.querySelector(".movie-name").textContent = movie.title
    elMovie.querySelector(".movie-age").textContent = new Date(movie.release_date).getFullYear()

    movie.genres.forEach(element => {
        let newLi = document.createElement("li")
        newLi.textContent = element
        elMovie.querySelector(".movie-genre").appendChild(newLi)

        if (!ganerArr.includes(element)) {
            ganerArr.push(element)
            let newOption = document.createElement("option")
            newOption.textContent = element
            ganreSelect.appendChild(newOption)
        }
    });

    
    elMovie.querySelector(".movie-genre")
    elMovie.querySelector(".movie-btn").dataset.id = movie.id
    elMovie.querySelector(".movie-bookmarks").dataset.id = movie.id

    movieList.appendChild(elMovie)

}




films.forEach(element => {
    createMovie(element)
});


function searchMavie(e) {
    e.preventDefault()

    movieList.innerHTML = ""

    let ganreSelectValue = ganreSelect.value
    let searchInputValue = searchInput.value
    let sortSelectValue = sortSelect.value

  
    let newRejact = new RegExp(searchInputValue, "gi")
    
    let foudFilm

    if (ganreSelectValue === "All") {
        foudFilm = films
    } else {
        foudFilm= films.filter((film) => film.genres.includes(ganreSelectValue))
    }
    
    foudFilm.sort(sortFunt[sortSelectValue])
    
    foudFilm.forEach(element => {
        if (element.title.match(newRejact)) {
            createMovie(element)
        }
});

}

function createBookmark(movie) {
    let ElBookmark = bookmarkTempletes.cloneNode(true)

    ElBookmark.querySelector(".bookmar-h3").textContent = movie.title
    ElBookmark.querySelector(".bookmark-btn-dalite").dataset.id = movie.id

    bookmarkList.appendChild(ElBookmark)

}

form.addEventListener("submit", searchMavie)

movieList.addEventListener("click", function (evt) {
    if (evt.target.matches(".movie-btn")) {
        modal.classList.add("modal-open")

        let foundMovie = films.find((movie)=> movie.id === evt.target.dataset.id)
        modal.querySelector(".modal-name").textContent = foundMovie.title
        modal.querySelector(".modal-des").textContent = foundMovie.overview
        document.addEventListener("keyup", function (evt) {
            if (evt.keyCode === 27 ) {
             modal.classList.remove("modal-open")
                
            }
        })

        modal.addEventListener("click", function (evt) {
            if (evt.target === modal) {
             modal.classList.remove("modal-open")
                
            }
        })
        
        modalBtn.addEventListener("click", function () {
            modal.classList.remove("modal-open")
        })
        
    }

    if (evt.target.matches(".movie-bookmarks")) {
        let foundMovie = films.find((movie) => movie.id === evt.target.dataset.id)
        
        if (!bookmarkArr.includes(foundMovie)) {
            bookmarkArr.push(foundMovie)

           window.localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr) )
        }
        bookmarkList.innerHTML = " "

        

        bookmarkArr.forEach(element => {
            createBookmark(element)
        });
        
    }
   
})
bookmarkArr.forEach(element => {
    createBookmark(element)
});


bookmarkBtn.addEventListener("click", function () {
    bookMadal.classList.add("modal-open")
    bookRomove.addEventListener("click", function () {
        bookMadal.classList.remove("modal-open")
        
     
    })
    document.addEventListener("keyup", function (evt) {
        if (evt.keyCode === 27 ) {
            bookMadal.classList.remove("modal-open")
            
        }
    })
    bookMadal.addEventListener("click", function (evt) {
        if (evt.target === bookMadal) {
            bookMadal.classList.remove("modal-open")
        }
    })
})


bookmarkList.addEventListener("click", function (evt) {
    if (evt.target.matches(".bookmark-btn-dalite")) {
        let foudIndex = bookmarkArr.findIndex((item) => item.id === evt.target.dataset.id)
        
        bookmarkArr.splice(foudIndex, 1)

        bookmarkList.innerHTML = ""

        bookmarkArr.forEach(element => {
            createBookmark(element)
        });

        window.localStorage.setItem("bookmarks",JSON.stringify(bookmarkArr))
    }
})