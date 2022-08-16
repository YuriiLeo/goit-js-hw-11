import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios').default;

const KEY = "29252112-5cfbcf527b6aa7a1ff4768ca5";
const BASE_URL = "https://pixabay.com/api/";
    
export default class PixabayAPI {
    
    constructor() { 
        this.searchQuery = "";
        this.page = 1;
        this.totalHitsThis = 0;
    }

  async  fetchArticles() {
        
  const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
  
      const response = await fetch(url);
      const data = await response.json();

          this.totalHitsThis = data.totalHits;
          if (data.hits.length === 0) {
             Notify.warning("Sorry, there are no images matching your search query. Please try again.");
          }
            this.page += 1;
          return data;
   
    }
    
    resetPage() {
    this.page = 1;
   }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    //  get page() {
    //     return this.page;
    // }

    // set page(newPage) {
    //     this.page = newPage;
    // }
}