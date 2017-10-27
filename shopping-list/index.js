const myCoolFunction = () => {
    
    // in the style of C#, I will place private functions at top, 
    // and public at bottom. event listeners at the very bottom
    
    // input type is string, return type is jquery object
    const _itemMaker = function(item) {
        const itemElement = 
            $(`<li>
                <span class="shopping-item">${item}</span>
                <div class="shopping-item-controls">
                  <button class="shopping-item-toggle">
                    <span class="button-label">check</span>
                  </button>
                  <button class="shopping-item-delete">
                    <span class="button-label">delete</span>
                  </button>
                </div>
            </li>`);
        
        return itemElement;
    } 
    
    $('#js-shopping-list-form').on('submit', function( event ) {
       event.preventDefault();
       console.log('hellllllo');
    });
    
}

$(myCoolFunction);