// sorry... I was getting tired of reading, and just took the 
// starting repl.it and implemented everything on my own without 
// reading the articles.... I will now read the articles


const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];

function renderShoppingList() {
  // render the shopping list in the DOM
  
  let list = [];
  
  for(let item in STORE) {
    list.push(
      $(`<li>
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
    
    let field = $(this).closest('li').find('.shopping-item');
    
    STORE.forEach(
      obj => obj.name === field.text() ? obj.checked = !obj.checked : ''
    );
  
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
