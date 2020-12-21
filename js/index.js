// document.addEventListener("DOMContentLoaded", function() {});
let titleList = document.querySelector('#list')
let showPanel = document.querySelector('#show-panel')
let bookDiv = document.createElement('div')


fetch(`http://localhost:3000/books`)
.then(response => response.json())
.then((data => renderBooks(data)))

function renderBooks(books) {
    books.forEach(book => renderBookName(book))
}

function renderBookName(book) {
    titleDiv = document.createElement('li')
    titleDiv.textContent = book.title;
    titleDiv.dataset.id = book.id
    titleList.appendChild(titleDiv)
}

titleList.addEventListener("click", (event) => {
    bookId = (event.target.dataset.id)
    fetch(`http://localhost:3000/books/${bookId}`)
    .then(response => response.json())
    .then(data => bookData(data))
})

function bookData(book){
    bookDiv.innerHTML = `
    <img src=${book.img_url}>
    <h4>${book.title}</h4>
    <h5>${book.subtitle}</h5>
    <p>${book.description}</p>
    <h5>Users who have liked this title include:</h5>
    <ul class="users-who-liked"> </ul>
    <button class="like-button" data-id=${book.id}>Like</button>
    `
    showPanel.appendChild(bookDiv)
    addUsersWhoLiked(book.users)

    let likeButton = document.querySelector('.like-button')
     alreadyLikedUserArray = book.users  //starting with a global var, look into this

    likeButton.addEventListener("click", event => {
        likedId = event.target.dataset.id
        alreadyLikedUserArray.push({id:1, username:"pouros"})
        likeObj = {
         users: alreadyLikedUserArray
        }

        fetch(`http://localhost:3000/books/${likedId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Allowed": "application/json"
            },
            body: JSON.stringify(likeObj)
        })
        .then(res => res.json())
        //need to add refresh here, look at old rendering. remove what is there already....
        .then(data => clearLikesList(alreadyLikedUserArray))

    })

}

function clearLikesList(alreadyLikedUserArray){
    likedList =  document.querySelector('.users-who-liked')
    likedList.textContent = ""
    addUsersWhoLiked(alreadyLikedUserArray)
}

function addUsersWhoLiked(users){
    users.forEach(user => renderUserName(user) )
}

function renderUserName(user){
    //  could do inerHtml.  
    likedList =  document.querySelector('.users-who-liked')
    oneUsername = document.createElement('li')
    oneUsername.textContent = user.username
    likedList.appendChild(oneUsername)
}

//like/unlike button 
//if username 1 is already in the list, then toggle like button, patch request?


