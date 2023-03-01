let fetchData = [];
const fetchCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    showCategories(data);
}
const showCategories = data => {
    const newsArray = data.data.news_category;
    const categoriesContainer = document.getElementById('categories-container');
    newsArray.forEach(singleCategory => {
        // loadAllNews(singleCategory.category_id);
        let listContainer = document.createElement('div');
        listContainer.classList.add('btn');
        listContainer.addEventListener("mouseenter", function() {
            listContainer.style.color = "purple";
        });
        listContainer.addEventListener('mouseleave', function(){
            listContainer.style.color = "black";
        });
        listContainer.innerHTML = `<a onclick="loadAllNews('${singleCategory.category_id}', '${singleCategory.category_name}')" class="nav-link" href="#">${singleCategory.category_name}</a> `
        categoriesContainer.appendChild(listContainer);
        // console.log(singleCategory);
    });
    // console.log(newsArray)
}
const loadAllNews = async (category_id, category_name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    fetchData = data.data;
    showAllNews(data.data, category_name);
}
const showAllNews = async (data, category_name) =>{
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
    const allNewsContainer = document.getElementById('all-news');
    allNewsContainer.innerHTML = '';
    data.forEach(singleNews =>{
        const {_id, image_url, title, details, author, total_view,rating } = singleNews;
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `<div class="row g-0">
      <div class="col-md-4">
      <img src=${image_url} class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8 d-flex flex-column">
      <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">
            ${details.slice(0, 200)}...
            </p>
            </div>
            <div class="card-footer border-0 bg-body d-flex justify-content-between">
            <div class="d-flex gap-2">
            <img src=${
            author.img
        } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
        <div>
        <p class="m-0 p-0">${author.name ? author.name : "Not available" }</p>
        <p class="m-0 p-0">${author.published_date}</p>
          </div>
          
          </div>
          <div class="d-flex align-items-center">
          <i class="fas fa-eye"></i>
          
          <p class="m-0 p-0">${total_view ? total_view : "Not available"}</p>
          </div>
          <div class="d-flex gap-2">
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-half"></i>
          
          <p>${rating.number}</p>
          </div>
          <div>
          
          <i class="bi bi-arrow-right" onclick="loadNewsDetail('${_id}')" data-bs-toggle="modal"
          data-bs-target="#exampleModal"></i>
          </div>
          </div>
          </div>
          </div>`;
          allNewsContainer.appendChild(card);
        // console.log(singleNews)
    })
}
const loadNewsDetail = async (newsId) =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetailNews(data.data[0])
    // console.log(data)
}
// fetchCategories();
const showDetailNews = async (data) => {
    const { image_url, title, details, author, total_view, others_info } = data;

    document.getElementById("modal-body").innerHTML = `
    <div class= "card mb-3">
  
    <div class="row g-0">
      <div class="col-md-12">
        <img src=${image_url} class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-12 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title} <span class="badge text-bg-warning">
          ${others_info.is_trending ? "Trending" : "Not trending"}</span></h5>
          <p class="card-text">
            ${details}
          </p>
          
        </div>
        <div class="card-footer border-0 bg-body d-flex justify-content-between">
          <div class="d-flex gap-2">
          <img src=${
            author.img
          } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
          <div>
          <p class="m-0 p-0">${author.name ? author.name : "Not available"}</p>
          <p class="m-0 p-0">${author.published_date}</p>
          </div>
          
          </div>
          <div class="d-flex align-items-center">
              <i class="fas fa-eye"></i>
              
              <p class="m-0 p-0">${total_view}</p>
          </div>
          <div>
              <i class="bi bi-star"></i>
          
          </div>
          
        </div>
      </div>
    </div>
    </div>
    `;
    console.log(data);
}
const showTrending=()=>{
    const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
    const category_name = document.getElementById("category-name").innerText;
    showAllNews(trendingNews, category_name);
}
const showTodaysPick = () =>{
    const todaysPickNews = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
    const category_name = document.getElementById("category-name").innerText;
    showAllNews(todaysPickNews, category_name);
}