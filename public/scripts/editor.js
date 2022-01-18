const blogTitleField = document.querySelector('.title')
const articleFeild = document.querySelector('.article')
const bannerFeild = document.querySelector('.banner')
const randomizer = document.querySelector('.randomizer')

const publishBtn = document.querySelector('.publish-btn')

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


publishBtn.addEventListener('click', () => {
    if(articleFeild.value.length && blogTitleField.value.length && bannerFeild.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz'
        let blogTitle = blogTitleField.value.split(" ").join("-")
        let id = ''
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)]
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`
        let date = new Date(); // for published at info

        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            banner: bannerFeild.value,
            random: randomizer.checked,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        }
        )
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        })
    }
})