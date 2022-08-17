import '../css/styles.css';
import Pixabay from './pixabayAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  searchForm: document.querySelector(".search-form"),
  btnLoadMore: document.querySelector(".load-more"),
  gallery: document.querySelector(".gallery"),

};

const pixabay = new Pixabay();

isHidden();

const lightbox = new SimpleLightbox(".galerry-item");

function isHidden() {
  refs.btnLoadMore.classList.add("is-hidden");
}

refs.searchForm.addEventListener("submit", onSearch);
refs.btnLoadMore.addEventListener("click", onLoadMore);

 function onSearch(evt) {
  evt.preventDefault(pixabay.searchQuery);
  
  pixabay.searchQuery = evt.currentTarget.elements.searchQuery.value;
   pixabay.resetPage();
   removeData();
   
  if (pixabay.searchQuery === "") {
    return Notify.warning("Please enter a more specific name.");
  }
  refs.btnLoadMore.classList.remove("is-hidden");
  //  Notify.warning(`Hooray! We found ${pixabay.totalHitsThis}images.`);
   
  fetchArticlesAndRender();
  return;
}


function onLoadMore() {
  fetchArticlesAndRender();
  totalHitsCaunter();
  return;
} 

async function fetchArticlesAndRender() {
  try {
    const fetchArticles = await pixabay.fetchArticles();
    await renderGallery(fetchArticles);

  } catch (error) {
    console.log(error);
    
  }
}

function renderGallery(data) {
  
  const markupPictures = data.hits.reduce((acc, item) => (acc += `
      <div class="photo-card"> 
      <a href="${item.largeImageURL}" class="galerry-item">
      <img class="gallery-img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
      </a>
        <div class="info">
          <p class="info-item">
            <b>Likes <font size="2px" color="#eaee3c" face="Arial">${item.likes}</font> </b>
          </p>
          <p class="info-item">
            <b>Views <font size="2px" color="#eaee3c" face="Arial">${item.views}</font> </b>
          </p>
          <p class="info-item">
            <b>Comments <font size="2px" color="#eaee3c" face="Arial">${item.comments}</font></b>
          </p>
          <p class="info-item">
            <b>Downloads <font size="2px" color="#eaee3c" face="Arial">${item.downloads}</font></b>
          </p>
        </div>
      </div>
       `), "");

  refs.gallery.insertAdjacentHTML("beforeend", markupPictures);
  lightbox.refresh();
}



function removeData() {
    refs.gallery.innerHTML = "";
}

function totalHitsCaunter() {
  let maxHits = (pixabay.page) * 40;
  let totalHits = pixabay.totalHitsThis;
  
  if (maxHits >= totalHits) {
    Notify.warning("We're sorry, but you've reached the end of search results.");
    isHidden();
  }
  return; 
}


// Після першого запиту з кожним новим пошуком отримувати повідомлення, в якому буде написано,
//  скільки всього знайшли зображень(властивість totalHits).Текст повідомлення - "Hooray! We found totalHits images."

