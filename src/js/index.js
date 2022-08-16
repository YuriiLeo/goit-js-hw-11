import '../css/styles.css';
import Pixabay from './pixabayAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector(".search-form"),
  btnLoadMore: document.querySelector(".load-more"),
  gallery: document.querySelector(".gallery"),

};

const pixabay = new Pixabay();

isHidden();

function isHidden() {
  refs.btnLoadMore.classList.add("is-hidden");
}

refs.searchForm.addEventListener("submit", onSearch);
refs.btnLoadMore.addEventListener("click", onLoadMore);

 function onSearch(evt) {
  evt.preventDefault(pixabay.searchQuery);
  refs.btnLoadMore.classList.remove("is-hidden");
  pixabay.searchQuery = evt.currentTarget.elements.searchQuery.value;
  
  if (pixabay.searchQuery === "") {
    return Notify.warning("Please enter a more specific name.");
  }
  
  //  Notify.warning(`Hooray! We found ${pixabay.totalHitsThis}images.`);
   
  pixabay.resetPage();
  fetchArticlesAndRender();
  removeData();
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
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
        <div class="info">
          <p class="info-item">
            <b>Likes${item.likes}</b>
          </p>
          <p class="info-item">
            <b>Views${item.views}</b>
          </p>
          <p class="info-item">
            <b>Comments${item.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads${item.downloads}</b>
          </p>
        </div>
      </div>
       `), "");

  refs.gallery.insertAdjacentHTML("beforeend", markupPictures);
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

