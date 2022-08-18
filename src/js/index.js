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

function notHidden() {
  refs.btnLoadMore.classList.remove("is-hidden");
}

refs.searchForm.addEventListener("submit", onSearch);
refs.btnLoadMore.addEventListener("click", onLoadMore);

 async function onSearch(evt) {
  evt.preventDefault(pixabay.searchQuery);
  pixabay.searchQuery = evt.currentTarget.elements.searchQuery.value;
   pixabay.resetPage();
   removeData();
   notHidden();
   if (pixabay.searchQuery === "") {
     isHidden();
     return  Notify.failure("Please enter a more specific name.");
   }
  await fetchArticlesAndRender();
  
   await notifyTotalHits();
  // await notifyInvalidRequest();
  return;
}

// function notifyNoReqyest() {
//   if (pixabay.searchQuery === "") {
//      isHidden();
//      return  Notify.failure("Please enter a more specific name.");
//    }
// }

// function notifyInvalidRequest() {
//    if (pixabay.hitsLength === 0) {
//       isHidden();
//       return Notify.warning("Sorry, there are no images matching your search query. Please try again.");
//   }
// }

function notifyTotalHits() {
  if (pixabay.hitsLength !== 0) {
        return Notify.success(`Hooray! We found ${pixabay.totalHitsThis} images.`);
      }
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
    Notify.failure('Qui timide rogat docet negare');
    console.log(error);
    
  }
}

function renderGallery(data) {
  if (pixabay.hitsLength === 0) {
      isHidden();
      return Notify.warning("Sorry, there are no images matching your search query. Please try again.");
  }
  const markupPictures = data.hits.reduce((acc, item) => (acc += `
      <div class="photo-card"> 
      <a href="${item.largeImageURL}" class="galerry-item">
      <img class="gallery-img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
      </a>
        <div class="info">
          <p class="info-item">
            <b>Likes <br><font size="2px" color="#eaee3c" face="Arial">${item.likes}</font> </b>
          </p>
          <p class="info-item">
            <b>Views <br><font size="2px" color="#eaee3c" face="Arial">${item.views}</font> </b>
          </p>
          <p class="info-item">
            <b>Comments <br><font size="2px" color="#eaee3c" face="Arial">${item.comments}</font></b>
          </p>
          <p class="info-item">
            <b>Downloads <br><font size="2px" color="#eaee3c" face="Arial">${item.downloads}</font></b>
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
    Notify.info("We're sorry, but you've reached the end of search results.");
    isHidden();
  }
  return; 
}
