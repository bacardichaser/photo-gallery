let photos = [
    {
        id: 0,
        src: 'img/dog1.jpg',
        alt: 'labrador puppy',
        caption: 'Labrador puppy',
        category: 'Dog'
    },
    {
        id: 1,
        src: 'img/dog2.jpg',
        alt: 'cute dog',
        caption: 'Border Collie dog',
        category: 'Dog'
    },
    {
        id: 2,
        src: 'img/dog3.jpg',
        alt: 'cocker spaniel puppy',
        caption: 'Cocker Spaniel puppy',
        category: 'Dog'
    },
    {
        id: 3,
        src: 'img/dog4.jpg',
        alt: 'maltese dog',
        caption: 'Maltese puppy',
        category: 'Dog'
    },
    {
        id: 4,
        src: 'img/cat1.jpg',
        alt: 'cute cat',
        caption: 'Cute kitten',
        category: 'Cat'
    },
    {
        id: 5,
        src: 'img/cat2.jpg',
        alt: 'cute cat',
        caption: 'Happy kitten',
        category: 'Cat'
    },
    {
        id: 6,
        src: 'img/cat3.jpg',
        alt: 'cute cat',
        caption: 'Sleepy kitten',
        category: 'Cat'
    },
    {
        id: 7,
        src: 'img/cat4.jpg',
        alt: 'cute cat',
        caption: 'Funny kitten',
        category: 'Cat'
    },
    {
        id: 8,
        src: 'img/rabbit1.jpg',
        alt: 'bunny',
        caption: 'Smol bunny',
        category: 'Bunny'
    },
    {
        id: 9,
        src: 'img/rabbit2.jpg',
        alt: 'cute bunny',
        caption: 'Garden bunny',
        category: 'Bunny'
    },

    {
        id: 10,
        src: 'img/rabbit3.jpg',
        alt: 'portrait bunny',
        caption: 'Bunny portrait',
        category: 'Bunny'
    },
    {
        id: 11,
        src: 'img/rabbit4.jpg',
        alt: 'brown bunny',
        caption: 'Brown bunny',
        category: 'Bunny'
    },
    {
        id: 12,
        src: 'img/rabbit4.jpg',
        alt: 'brown bunny',
        caption: 'Brown bunny',
        category: 'Bunny'
    },
    {
        id: 13,
        src: 'img/rabbit4.jpg',
        alt: 'brown bunny',
        caption: 'Brown bunny',
        category: 'Bunny'
    }
]


let info = document.getElementById('info');
let selectedCategory = document.getElementById('categories-ddl').value;
let photoContainer = document.getElementById('photo-container');
let currentPage = 0;
let photosToDisplay = [];
let searchValue = ''

let categoryArr = [];
let photoCount;
let pages;
let perPage = 4;

const displayPagination = () => {
    let writeInDoc = '';
    pages = photosToDisplay.length / perPage;
    if(pages <= 1) return document.getElementById("pagination").innerHTML = "";
    for(let i = 0; i < pages; i++) {
        writeInDoc += `<button class="page${i} ${i === 0 ? 'current': ''}" onClick = "setPagination(${i})">${i+1}</button>`
    } 
    document.getElementById("pagination").innerHTML = writeInDoc;
}
displayPagination();


const setPagination = (selectedPage) => {
    currentPage = selectedPage;
    updateDom()

    
    let activeButton = document.getElementsByClassName(`page${selectedPage}`)[0];
    for(let i = 0; i < pages; i++) {
        selectedPage != i ? document.getElementsByClassName(`page${i}`)[0].classList.remove('current') : activeButton.classList.add('current');
    }
}

const updateDom = () => {
    let writeInDoc = '';
    const info = document.getElementById('info');

    let paginationStart =  currentPage * perPage;
    let paginationEnd = paginationStart + perPage;

    if(!photosToDisplay.length) {
        info.innerHTML = 'No photos to display'
        info.style.visibility = 'visible'
    }
    else {
        info.innerHTML = ''
    }
    
    photosToDisplay.slice(paginationStart,paginationEnd).forEach(photo => {
        writeInDoc += `<div class="item">
        <img src="${photo.src}" alt="${photo.alt}">
        <p class="caption">${photo.caption}</p>
        </div>`
    })

    photoContainer.innerHTML = writeInDoc;
    displayPagination()
}

const displayPhotos = () => {
        if(selectedCategory != 'none') {
            photosToDisplay = photos.filter(photo => {
            return photo.category === selectedCategory
            }).filter(photo => photo.caption.toLowerCase().includes(searchValue.toLowerCase()))

        }
        else {
            photosToDisplay = photos.filter(photo => photo.caption.toLowerCase().includes(searchValue.toLowerCase()))
        }

        updateDom();

}
displayPhotos();

const printCategories = () => {
    for(item of Object.values(photos)) {
        if(!categoryArr.includes(item.category)){
            categoryArr.push(item.category);
        }
    }
    for(category of categoryArr) {
        document.getElementById('categories-ddl').innerHTML += `<option value='${category}'> ${category} </option>`
    }
}
printCategories();

const setCategory = () => {

    //onChange iz htmla
    selectedCategory = document.getElementById('categories-ddl').value; 
    document.getElementById('search-caption').value = ''
    searchValue = ''
    info.innerHTML = ''
    currentPage = 0;
    displayPhotos()
}

const searchByCaption = (e) => {
    searchValue = e.target.value.trim()
    displayPhotos()
}

document.getElementById('search-caption').addEventListener('keyup', searchByCaption);