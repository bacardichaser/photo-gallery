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
]

let writeInDoc = '';
let info = document.getElementById('info');
let categoryArr = [];
let photoCount = photos.length;
let pages = photoCount / 4;
let perPage = 4;

const displayPagBtns = () => {
    writeInDoc = '';
    for(let i = 0; i < pages; i++) {
        writeInDoc += `<button class="page${i}" id="${i}" onClick = "displayPhotos(id)">${i+1}</button>`
    }

    document.getElementById("pagination").innerHTML = writeInDoc;
}
displayPagBtns();

const displayPhotos = (page = 0) => {
    writeInDoc = '';
        let paginationStart =  page * perPage;
        let paginationEnd = paginationStart + perPage;
        let photoArr = photos.slice(paginationStart, paginationEnd);
        
        for(item of photoArr) {
            writeInDoc += `<div class="item">
            <img src="${item.src}" alt="${item.alt}">
            <p class="caption">${item.caption}</p>
            </div>`
        }
    
    document.getElementById('photo-container').innerHTML = writeInDoc;
    info.style.visibility = 'hidden';
    
}
displayPhotos();

const displayCategories = () => {
    writeInDoc = '';
    writeInDoc += '<option value="0">Categories</option>'

    for(item of Object.values(photos)) {
        if(!categoryArr.includes(item.category)){
            categoryArr.push(item.category);
        }
    }

    for(category of categoryArr) {
        writeInDoc += `<option value='${category}'> ${category} </option>`
    }

    document.getElementById('categories-ddl').innerHTML = writeInDoc;
}
displayCategories();

const displayPhotosByCategory = (category) => {
    writeInDoc = '';
    const photosWithCategory = photos.filter(photo => {
        return photo.category === category
    })

    for(item of photosWithCategory) {
        writeInDoc += `<div class="item">
        <img src="${item.src}" alt="${item.alt}">
        <p class="caption">${item.caption}</p>
        </div>`
    }

    document.getElementById('photo-container').innerHTML = writeInDoc;
}

const filterByCategories = () => {
    let selectCategories = document.getElementById('categories-ddl');
    let optionValue = selectCategories.options[selectCategories.selectedIndex].value;

    if(optionValue === '0') return displayPhotos()
    displayPhotosByCategory(optionValue)

}

const displayPhotosByCaption = (list) => {
    writeInDoc = '';
    for(item of list) {
        writeInDoc += `<div class="item">
        <img src="${item.src}" alt="${item.alt}">
        <p class="caption">${item.caption}</p>
        </div>`
        
    }
    document.getElementById('photo-container').innerHTML = writeInDoc;
}

const searchByCaption = () => {
    let searchInput = document.getElementById("search-caption").value;
    info.innerText = '';

    if(!searchInput) return displayPhotos();
    
    const found = photos.filter(photo => {
        return photo.caption.toUpperCase().includes(searchInput.toUpperCase())
    });

    if(found.length) return displayPhotosByCaption(found);

    displayPhotos();
    info.innerText = `No photos were found`;
    info.style.visibility = 'visible';

}

document.getElementById('categories-ddl').addEventListener('change', filterByCategories);
document.getElementById('search-caption').addEventListener('keyup', searchByCaption);