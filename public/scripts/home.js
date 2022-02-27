
async function getNewImage() {
 let randomNumber = Math.floor(Math.random() * 10);
 fetch(`https://api.unsplash.com/search/photos?query=blog&client_id={insert api key here}`)
  .then( response => response.json())
  .then( data => {
    const endpoint = data.results[randomNumber].urls.regular;
    document.querySelector(".main-container").style.backgroundImage = "url(" + endpoint + ")"
  });
}
getNewImage()


db.collection("blogs").get().then((blogs) => {
  blogs.forEach(blog => {
    if(blog.id != decodeURI(location.pathname.split("/").pop())){
      createBlog(blog);
    }
  })
})


const createBlog = (blog) => {
  let data = blog.data()
  document.getElementById('blogs-container').innerHTML +=
  `
  <a class="link" href="/${blog.id}">  
  <div class="blog">
    <div class="blog-img"><img width="100%" src="${data.banner}" alt=""></div>
    <div class="blog-description">
      <div class="title">${data.title.substring(0, 100) + '...'}</div>
      <div class="descripton">${data.article.substring(0, 200) + '...'}</div>
    </div>
  </div>
  </a>
  `
}
