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
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        const field = $(this).find('.js-shopping-list-entry');
        if (field.val() != false) {
            $('.shopping-list').append(_itemMaker(field.val()));
            field.val('');
        }
    });

    $('.shopping-list').on('click', '.shopping-item-toggle', function() {
        $(this).closest('li').find('.shopping-item')
            .toggleClass('shopping-item__checked');
    });

    $('.shopping-list').on('click', '.shopping-item-delete', function() {
        $(this).closest('li').remove();
    });
}

$(myCoolFunction);