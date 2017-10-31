// sorry... I was getting tired of reading, and just took the 
// starting repl.it and implemented everything on my own without 
// reading the articles.... I will now read the articles

// I see the main difference between what I did is that they are
// using alternate 'js' versions of the classes, which I get, and
// the use of data-item-index attribute in the html, which I think 
// is bizarre, since the whole point of this exercise is take the
// state out of the DOM. Like, if you really want to store the 
// index value, just create an id in STORE, or by using the loop 
// index. Traversing the dom has GOT to be slower than simply 
// using the built in index of the array methods, or an index
// in the json.

const STORE = [
  {ID: 0, name: "apples", checked: false},
  {ID: 1, name: "oranges", checked: false},
  {ID: 2, name: "milk", checked: true},
  {ID: 3, name: "bread", checked: false}
];

function renderShoppingList() {
  // render the shopping list in the DOM
  
  let list = [];
  
  for(let item in STORE) {
    list.push(
      $(`<li class="js-item-index-element" data-item-index="${STORE[item].ID}">
            <span class="shopping-item
            ${STORE[item].checked ? 'shopping-item__checked': ''}
            ">${STORE[item].name}</span>
            <div class="shopping-item-controls">
              <button class="shopping-item-toggle">
                <span class="button-label">check</span>
              </button>
              <button class="shopping-item-delete">
                <span class="button-label">delete</span>
              </button>
            </div>
        </li>`)
      );
  }
  
  $('.js-shopping-list').html(list);
}


function handleNewItemSubmit() {
  // listen for users adding a new shopping list item, then add
  // to list and render list 
  
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    
    let field = $(this).find('.js-shopping-list-entry');
    
    if(/([A-z])\w/.test(field.val())) {
      STORE.push(
        {
          ID: STORE.length,
          name: field.val(), 
          checked: false
        });
      field.val('');
    }
    
    renderShoppingList();  
  });
}


function handleItemCheckClicked() {
  // listen for users checking/unchecking list items, and
  // render them checked/unchecked accordingly
  
  $('.shopping-list').on('click', '.shopping-item-toggle', function() {
    
    let field = $(this).closest('.js-item-index-element').attr('data-item-index');
    
    STORE[field].checked = !STORE[field].checked;
  
    renderShoppingList();  
  });
}


function handleDeleteItemClicked() {
  // Listen for when users want to delete an item and 
  // delete it
  
  
  $('.shopping-list').on('click', '.shopping-item-delete', function() {
    
    let field = $(this).closest('li').find('.shopping-item');
    
    STORE.forEach(
      (obj, i) => obj.name === field.text() ? STORE.splice(i, 1) : ''
    );
  
    renderShoppingList();  
  });
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);
