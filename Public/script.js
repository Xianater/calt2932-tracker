// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("bookform");
const booklist = document.getElementById("booklist");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  // console.log(form.elements.bookCategory.value)

  addBook(
    form.elements.bookTitle.value,
    form.elements.bookAuthor.value,
    form.elements.bookCategory.value,
    form.elements.bookGenre.value,
    form.elements.bookRating.value,
    form.elements.bookComment.value,
    form.elements.bookReadTime.value,
  )
  // console.log(bookList)
})

// Event listener listening for what is written in the categories input box
document.addEventListener("DOMContentLoaded", () =>{
  let category = document.getElementById("bookCategory");
  category.addEventListener("input", categorySelected);
});
// Function that changes genre options between two datalists depending on category choice
function categorySelected(ev) {
  let categoryName = ev.target.value.toLowerCase();
  if (!document.getElementById(categoryName)) return;

  let genre = document.getElementById("bookGenre");
  genre.setAttribute("list", categoryName);
}


function displayBooks() {

  booklist.innerHTML = "";

  let localBooks = JSON.parse(localStorage.getItem('books'));
  // console.log(localBooks);
  if (localBooks !== null) {

    localBooks.forEach((book) => {

      // console.log(book)

      // Create book items for the DOM and add to the list
      let item = document.createElement("li");
      item.setAttribute("data-id", book.id);
      item.innerHTML = `<p><strong>${book.title}<br>${book.author}</strong><br>${book.genre}</p>`;
      booklist.appendChild(item);

      // Clear the value of the input once the book has been added to the page
      form.reset();

      // Setup delete button DOM elements
      let delButton = document.createElement("button");
      let delButtonText = document.createTextNode("Delete");
      delButton.appendChild(delButtonText);
      item.appendChild(delButton); // Adds a delete button to every book

      // Listen for when the delete button is clicked
      delButton.addEventListener("click", function(event) {

        localBooks.forEach(function(bookArrayElement, bookArrayIndex) {
          if (bookArrayElement.id == item.getAttribute('data-id')) {
            localBooks.splice(bookArrayIndex, 1)
          }
        })

        localStorage.setItem('books', JSON.stringify(localBooks));


        item.remove(); // Remove the book item from the page when button clicked
        // Because we used 'let' to define the item, this will always delete the right element

      })

    }) // Closing brackets for for loop
  } // Closing bracket for if statement
  
}




// Create an object called 'book'
// Populate the properties based on the provided data model

// Commented out now the object creation is included in the function

// var book = {
//   title: "Initial Sketches",
//   category: "Fiction",
//   id: Date.now(),
//   date: new Date().toISOString(),
//   rating: 50,
//   comment: 5,
//   readtime: "Google"
// }

// console.log(books);


// Create a function called 'addBook'
// Give the function input parameters for: title, author, category, rating, comment, readtime
// Paste your object definition from above in the function
// Replace the property values with the input paramaters
// Add the object to the bookList array

  function addBook(title, author, category, genre, rating, comment, readtime) {

    // Creating the object with the usual property:value syntax
    // Create book object 
    // let book = {
    //   title: title,
    //   category: category,
    //   id: Date.now(),
    //   date: new Date().toISOString(),
    //   rating: rating,
    //   comment: comment,
    //   readtime: readtime
    // }

    // Creating the object, directly passing in the input parameters
    let book = {
      title,
      author,
      category,
      genre,
      id: Date.now(),
      date: new Date().toISOString(),
      rating,
      comment,
      readtime
    }

    // fetching and parse localStorage value
    let localBooks = JSON.parse(localStorage.getItem('books'));

    if (localBooks == null){
      localBooks = [book];
    } else {
      // Check to see if there is an existing book
      if (localBooks.find(element => element.id === book.id)) {
        console.log('Books ID already exists');
      } else {
        localBooks.push(book);
      }
    }

    localStorage.setItem('books', JSON.stringify(localBooks))

    displayBooks();

  }

// Call the function with test values for the input paramaters
addBook("Hail Mary", "Andy Weir", "Fiction", "Fantasy", 50, 5, "Google");
displayBooks();

let localBooks = JSON.parse(localStorage.getItem('books'));
// Log the array to the console.
console.log(localBooks);