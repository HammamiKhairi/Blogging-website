let blogId = decodeURI(location.pathname.split("/").pop())

let docRef = db.collection("blogs").doc(blogId)


docRef.get().then((doc) => {
  if(doc.exists){
      setupBlog(doc.data())
  } else{
      location.replace("/")
  }
})


const setupBlog = (data) => {
  const titleElement = document.querySelector('.title')
  const publishedElement = document.querySelector('.published')
  const articleElement = document.querySelector('.article')
  const titleTag = document.querySelector('title')
  const bannerElement = document.querySelector('.banner')
  
  bannerElement.style.backgroundImage = `url(${data.banner})`
  titleTag.innerHTML += titleElement.innerHTML = data.title;
  publishedElement.innerHTML += data.publishedAt;


  addArticle(articleElement, data.article);
}


const addArticle = (ele, data) => {
  data = data.split("\n").filter(item => item.length);
  // console.log(data);

  data.forEach(item => {
      // check for heading
      if(item[0] == '#'){
          let hCount = 0;
          let i = 0;
          while(item[i] == '#'){
              hCount++;
              i++;
          }
          let tag = `h${hCount}`;
          ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
      } 
      //checking for image format
      else if(item[0] == "!" && item[1] == "["){
          let seperator;

          for(let i = 0; i <= item.length; i++){
              if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                  seperator = i;
              }
          }

          let alt = item.slice(2, seperator);
          let src = item.slice(seperator + 2, item.length - 1);
          ele.innerHTML += `
          <img src="${src}" alt="${alt}" class="article-image">
          `;
      }

      else{
          ele.innerHTML += `<p>${item}</p>`;
      }
  })
}

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
    <a  class="link" href="/${blog.id}">  
    <div class="blog-card">
      <div class="blog-img"><img width="100%" src="${data.banner}" alt=""></div>
      <div class="blog-description">
        <div class="card-title">${data.title.substring(0, 100) + '...'}</div>
        <div class="card-descripton">${data.article.substring(0, 200) + '...'}</div>
      </div>
    </div>
    </a>
    `
  }