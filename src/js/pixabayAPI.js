export default class PixabayAPI {
    constructor() { 
        this.searchQuery = "";
        this.page = 1;
    }

    fetchArticles(BASE_URL, KEY, searchQuery) {
        
  const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
  
 return fetch(url)
  .then(response => response.json())
      .then(data => {
      console.log(this);
      this.page += 1;
          console.log(data);
          return data.hits;
     });
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
}