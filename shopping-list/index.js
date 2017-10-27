const myCoolFunction = () => {

    // I am going to place private functions at top, 
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

    // event listeners
    $('#js-shopping-list-form').on('submit', function(event) {
        event.preventDefault();
        const field = $(this).find('.js-shopping-list-entry');
        if (field.val() != false) {
            $('.shopping-list').append(_itemMaker(field.val()));
            field.val('');
        }
    });

    $('.shopping-item-toggle')


}

$(myCoolFunction);