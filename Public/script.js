// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("bookform");
const booklist = document.getElementById("booklist");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  console.log(form.elements.bookType.value)

  addBook(
    form.elements.bookName.value,
    form.elements.bookType.value,
    form.elements.bookRate.value,
    form.elements.bookTime.value,
    form.elements.bookClient.value,
  )
  // console.log(bookList)
})

function displayBooks() {

  booklist.innerHTML = "";

  let localBooks = JSON.parse(localStorage.getItem('books'));

  if (localBooks !== null) {

    localBooks.forEach((book) => {

      console.log(book)

      // Create book items for the DOM and add to the list
      let item = document.createElement("li");
      item.setAttribute("data-id", book.id);
      item.innerHTML = `<p><strong>${book.name}</strong><br>${book.type}</p>`;
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

        // Make sure the deletion worked by logging out the whole array
        // console.log(bookList)

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
//   name: "Initial Sketches",
//   type: "Concept Ideation",
//   id: Date.now(),
//   date: new Date().toISOString(),
//   rate: 50,
//   time: 5,
//   client: "Google"
// }

// console.log(books);


// Create a function called 'addBook'
// Give the function input parameters for: name, type, rate, time, client
// Paste your object definition from above in the function
// Replace the property values with the input paramaters
// Add the object to the bookList array

  function addBook(name, type, rate, time, client) {

    // Creating the object with the usual property:value syntax
    // Create book object 
    // let book = {
    //   name: name,
    //   type: type,
    //   id: Date.now(),
    //   date: new Date().toISOString(),
    //   rate: rate,
    //   time: time,
    //   client: client
    // }

    // Creating the object, directly passing in the input parameters
    let book = {
      name,
      type,
      id: Date.now(),
      date: new Date().toISOString(),
      rate,
      time,
      client
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
addBook("Initial Sketches", "Concept Ideation", 50, 5, "Google");
displayBooks();
// Log the array to the console.
console.log(localBooks);