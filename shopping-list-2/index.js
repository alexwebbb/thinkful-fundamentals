const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log(STORE);
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
      
      console.log('submit clicked');
    }
    
  });
  
  renderShoppingList();
  console.log(`handleNewItemSubmit ran`);
}


function handleItemCheckClicked() {
  // listen for users checking/unchecking list items, and
  // render them checked/unchecked accordingly
  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
  // Listen for when users want to delete an item and 
  // delete it
  console.log('`handleDeleteItemClicked` ran')
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);
