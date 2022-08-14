import '../css/styles.css';
import Pixabay from './pixabayAPI'; "./pixabayAPI"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector(".search-form"),
  // inputForm: document.querySelector(".input"),
  // btnSubmit: document.querySelector(".btn-submit"),
  btnLoadMore: document.querySelector(".load-more"),
  gallery: document.querySelector(".gallery"),

};

const pixabay = new Pixabay();

const KEY = "29252112-5cfbcf527b6aa7a1ff4768ca5";
const BASE_URL = "https://pixabay.com/api/";

refs.searchForm.addEventListener("submit", onSearch);
refs.btnLoadMore.addEventListener("click", onLoadMore);

function onSearch(evt) {
  evt.preventDefault();
  // removeData();

  pixabay.searchQuery = evt.currentTarget.elements.searchQuery.value;
  pixabay.resetPage();
  pixabay.fetchArticles(BASE_URL, KEY).then(renderGallery);
}

function onLoadMore() {
  pixabay.fetchArticles(BASE_URL, KEY).then(renderGallery);
} 

function renderGallery(hits) {
 console.log("dani", hits);
  const markupPictures = hits.reduce((acc, item) => (acc += `
      <div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
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

       refs.gallery.insertAdjacentHTML ("beforeend", markupPictures);
}


// function removeData() {
//     refs.gallery.innerHTML = "";
// }


// Якщо бекенд повертає порожній масив, значить нічого підходящого не було знайдено. 
// У такому разі показуй повідомлення з текстом "Sorry, there are no images matching your search query. Please try again."

// У відповіді бекенд повертає властивість totalHits - загальна кількість зображень, які відповідають критерію пошуку (для безкоштовного акаунту). 
// Якщо користувач дійшов до кінця колекції, ховай кнопку і виводь повідомлення з текстом "We're sorry, but you've reached the end of search results.".

// Після першого запиту з кожним новим пошуком отримувати повідомлення, в якому буде написано,
//  скільки всього знайшли зображень(властивість totalHits).Текст повідомлення - "Hooray! We found totalHits images."

