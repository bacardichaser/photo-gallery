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
        src: 'img/rabbit3.jpg',
        alt: 'portrait bunny',
        caption: 'Bunny portrait',
        category: 'Bunny'
    },
    {
        id: 13,
        src: 'img/rabbit4.jpg',
        alt: 'brown bunny',
        caption: 'Brown bunny',
        category: 'Bunny'
    },
]
let category = document.getElementById('categories-ddl').value;
let photoContainer = document.getElementById("photo-container");
let paginationDiv = document.getElementById('pagination');
let info = document.getElementById('info');
let timer;

let photosToDisplay = photos;
let currentPage = 0;
let photosPerPage = 4;
let pages;

const infoDisplay = (display) => {
    if(display === '') {
        info.innerText = '';
        info.style.visibility = 'hidden';
        
    }
    else {
        info.innerText = 'No photos to display';
        info.style.visibility = 'visible';
        photoContainer.innerHTML = ''
        paginationDiv.innerHTML = ''
    }
}

const updateDom = () => {
    let paginationStart = currentPage * photosPerPage
    let paginationEnd = paginationStart + photosPerPage

    photoContainer.innerHTML = ''

    photosToDisplay.slice(paginationStart,paginationEnd).forEach(photo => {
        photoContainer.innerHTML +=  `<div class="item">
        <img src="${photo.src}" alt="${photo.alt}">
        <p class="caption">${photo.caption}</p>
        </div>`
    })
}

const displayPagination = () => {
    paginationDiv.innerHTML = ''
    pages = Math.ceil(photosToDisplay.length / photosPerPage);

    if(pages <= 1) {
        paginationDiv.innerHTML = ''
    }
    else {
        for(let i = 0; i < pages; i++) {
            document.getElementById('pagination').innerHTML += `<button class="${!i ? 'current' : '' }" id="${i}" onClick="setPagination(id)">${i+1} </button>`;
        }
    }
}

const setPagination = (selectedPage) => {
    currentPage = selectedPage;
    updateDom();

    let activeButton = document.getElementById(`${selectedPage}`);
    for(let i = 0; i < pages; i++) {
        selectedPage != i ? document.getElementById(`${i}`).classList.remove('current') : activeButton.classList.add('current');
    }
}

const setPhotoArray = (searchInput = '') => {
    if(category != 'none') {
        photosToDisplay = photos.filter(photo => {
            return photo.category === category
            }).filter(photo => photo.caption.toUpperCase().includes(searchInput.toUpperCase()))
    }

    else {
        photosToDisplay = photos.filter(photo => {
            return photo.caption.toUpperCase().includes(searchInput.toUpperCase())
        })
    }

    photosToDisplay.length ? infoDisplay('') : infoDisplay('no photos')

    displayPagination();
    updateDom()
}

setPhotoArray();

const setSearch = (input) => {
    console.log(input)
    let foundCaptions = []
    currentPage = 0;
    input.trim();

    if(input === '') {
        foundCaptions = []
        photosToDisplay = photos;
    };
    
    foundCaptions = photos.filter(photo => {
        return photo.caption.toUpperCase().includes(input.toUpperCase())
    })

    if(foundCaptions.length) {        
        infoDisplay('')
        setPhotoArray(input);
    }
    else {
        infoDisplay('no photos')
        foundCaptions = []
        photoContainer.innerHTML = ''
    }
}

const setCategory = (selectedCategory) => {
    category = selectedCategory;
    currentPage = 0;
    
    foundCaptions = [];
    document.getElementById('search-caption').value = '';

    setPhotoArray();
    updateDom();  
}

const printCategories = (categories) => {
    categories.forEach(category => {
        document.getElementById('categories-ddl').innerHTML += `<option value='${category}'>${category}</option>`
    })
}

const getCategories = () => {
    document.getElementById('categrories-ddl')
    const categories = [];

    photos.forEach(photo => {
        if(!categories.includes(photo.category)) categories.push(photo.category)
    })
    printCategories(categories)
}
getCategories();


const timeout = (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {setSearch(event.target.value)}, 750)
}