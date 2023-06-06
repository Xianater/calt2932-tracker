// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("bookform");
// Two booklists: Fiction & Non-Fiction
const booklist = document.getElementById("booklist");
const booklist2 = document.getElementById("booklist2");

// Setting submit button to create book record with all relevant elements
form.addEventListener("submit", function(event) {
  event.preventDefault();

  addBook(
    form.elements.bookTitle.value,
    form.elements.bookAuthor.value,
    form.elements.bookCategory.value,
    form.elements.bookGenre.value,
    form.elements.bookRating.value,
    form.elements.bookComment.value,
    form.elements.bookReadTime.value,
  )
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

// Function that sets up and displays the booklists
function displayBooks() {
  // innerHTML for Fiction & Non-Fiction
  booklist.innerHTML = "";
  booklist2.innerHTML = "";

  let localBooks = JSON.parse(localStorage.getItem('books'));
  
  if (localBooks !== null) {

    localBooks.forEach((book) => {

      // Create book items for the DOM and add to the list
      let item = document.createElement("li");
      item.setAttribute("data-id", book.id);
      // Setting what each ul element displays
      item.innerHTML =
        `<p><strong>${book.title}</strong> by <strong>${book.author}</strong>
        <br>Genre: <strong>${book.genre}</strong>
        <br>Rating: <strong>${book.rating}</strong>
        <br>Read Time: <strong>${book.readtime}</strong>
        <br>Finished on ${book.date}
        <br><br>${book.comment}</p>`;
      
      // Setting books in either booklist or booklist2 depending on their category
      if (book.category == 'Fiction') { 
        booklist.appendChild(item);
      }
      else if (book.category == 'Non-Fiction'){
        booklist2.appendChild(item);
      }

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

  // Function to add books into localStorage
  function addBook(title, author, category, genre, rating, comment, readtime) {

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
// addBook("Hail Mary", "Andy Weir", "Non-Fiction", "Fantasy", 5, 5, "Google");

// Calling the display book function
displayBooks();

// let localBooks = JSON.parse(localStorage.getItem('books'));
// Log the array to the console.
// console.log(localBooks);