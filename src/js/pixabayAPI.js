import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
// const axios = require('axios').default;

const KEY = "29252112-5cfbcf527b6aa7a1ff4768ca5";
const BASE_URL = "https://pixabay.com/api/";
    
export default class PixabayAPI {
    
    constructor() { 
        this.searchQuery = "";
        this.page = 1;
        this.totalHitsThis = 0;
        this.hitsLength;
    }

  async  fetchArticles() {
        
  const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
  
      const response = await axios.get(url);
      const data = await response.data;
      
      this.totalHitsThis = data.totalHits;
      this.hitsLength = data.hits.length;
      
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

    get totalH() {
        return this.searchQuery;
    }

    set totalH(newTotal) {
        this.totalHitsThis = newTotal;
    }
}
