// refactor of my original take on shopping list 2

// I follow convention of declaring return type in comment preceding function

const STORE = [
  {ID: 0, name: "apples", checked: false},
  {ID: 1, name: "oranges", checked: false},
  {ID: 2, name: "milk", checked: true},
  {ID: 3, name: "bread", checked: false}
];


// returns an object
function _getItem ( that ) {
  
  let ID =  parseInt($(that)
              .closest('.js-item-ID-element')
              .attr('data-item-ID'));
  
  return STORE.find(obj => obj.ID === ID);
}

// boolean return
function _addItem ( that ) {
  
  let field = $(that).find('.js-shopping-list-entry');
    
  if(/([A-z])\w/.test(field.val())) {
    STORE.push(
      {
        // ensures an original ID no matter what, 
        // as long as order isnt changed
        ID: ++STORE[STORE.length - 1].ID,
        name: field.val(), 
        checked: false
      });
    field.val('');
    
    return true;
  }
  
  return false;
}

// void return
function renderShoppingList() {
  // render the shopping list in the DOM
  
  let list = [];
  
  for(let item in STORE) {
    list.push(
      $(`<li class="js-item-ID-element" data-item-ID="${STORE[item].ID}">
            <span class="shopping-item
            ${STORE[item].checked ? 'shopping-item__checked': ''}
            ">${STORE[item].name}</span>
            <div class="shopping-item-controls">
              <button class="shopping-item-toggle js-item-toggle">
                <span class="button-label">check</span>
              </button>
              <button class="shopping-item-delete js-item-delete">
                <span class="button-label">delete</span>
              </button>
            </div>
        </li>`)
      );
  }
  
  $('.js-shopping-list').html(list);
}

// The following functions have no return value 
// because they create event listeners

// void return
function handleNewItemSubmit() {
  // listen for users adding a new shopping list item, then add
  // to list and render list 
  
  $('#js-shopping-list-form').submit(function(event) {
    
    event.preventDefault();
    
    if(_addItem(this)) {
      renderShoppingList();
    }
  });
}

// void return
function handleItemCheckClicked() {
  // listen for users checking/unchecking list items, and
  // render them checked/unchecked accordingly
  
  $('.js-shopping-list').on('click', '.js-item-toggle', function() {
    
    let item = _getItem(this);
    
    item.checked = !item.checked;
  
    renderShoppingList();  
  });
}

// void return
function handleDeleteItemClicked() {
  // Listen for when users want to delete an item and 
  // delete it
  
  
  $('.js-shopping-list').on('click', '.js-item-delete', function() {
    
    let item = _getItem(this);

    STORE.splice(STORE.indexOf(item), 1);
    
    renderShoppingList();  
  });
}


// The 'main' function, which calls other functions
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  
  // C convention... a program in C returns 0
  // alternatively, could make it return true
  return 0;
}

$(handleShoppingList);
