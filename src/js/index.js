import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const KEY = "29252112-5cfbcf527b6aa7a1ff4768ca5";
// const BASE_URL = https://pixabay.com/api/;

// https://pixabay.com/api/?key=29252112-5cfbcf527b6aa7a1ff4768ca5&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1

{/* <div class="photo-card">
        <img src="" alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p class="info-item">
            <b>Views</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
          </p>
        </div>
      </div> */}

// Якщо бекенд повертає порожній масив, значить нічого підходящого не було знайдено. 
// У такому разі показуй повідомлення з текстом "Sorry, there are no images matching your search query. Please try again."

// У відповіді бекенд повертає властивість totalHits - загальна кількість зображень, які відповідають критерію пошуку (для безкоштовного акаунту). 
// Якщо користувач дійшов до кінця колекції, ховай кнопку і виводь повідомлення з текстом "We're sorry, but you've reached the end of search results.".

// Після першого запиту з кожним новим пошуком отримувати повідомлення, в якому буде написано,
//  скільки всього знайшли зображень(властивість totalHits).Текст повідомлення - "Hooray! We found totalHits images."

