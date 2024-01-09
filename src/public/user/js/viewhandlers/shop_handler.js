function createElement(string) {
    let parser = new DOMParser();
    let HTMLdocument = parser.parseFromString(string, 'text/html');
    return HTMLdocument.body.firstElementChild;
}

const loadingElement = createElement(`<div id="loading-container" class="justify-content-center" style="display:block; z-index: 9999;">
    <div class="loading-divider" aria-hidden="true"></div>
    <p class="loading-text" aria-label="Loading">
        <span class="loading-letter" aria-hidden="true">L</span>
        <span class="loading-letter" aria-hidden="true">o</span>
        <span class="loading-letter" aria-hidden="true">a</span>
        <span class="loading-letter" aria-hidden="true">d</span>
        <span class="loading-letter" aria-hidden="true">i</span>
        <span class="loading-letter" aria-hidden="true">n</span>
        <span class="loading-letter" aria-hidden="true">g</span>
    </p>
</div>`)

async function DataLoading(query) {
    const Filter = query.filter || {};
    const Sort = query.sort || {name: "ascending"};
    const Limit = query.limit || 2 ** 32;
    let Data = await $.ajax(
        {
            url: 'http://localhost:3000/product/',
            method: 'GET',
            data: {
                filter: Filter,
                sort: Sort,
                limit: Limit,
            },
            success: (data, status) => {
                return {data: data, status: status}
            },
            error: (errors) => errors
        });

    let allProducts = []

    for (let i = 0; i < Data.length; i++) {
        if (Data[i]) {
            let data = await $.ajax(
                {
                    url: 'http://localhost:3000/hbs/partials/',
                    method: 'POST',
                    data:
                        {
                            partial: 'product_card',
                            data: Data[i],
                        },
                    success: (data, status) => {
                        return {data: data, status: status}
                    },
                    error: (errors) => errors
                })
            let partial = createElement(data)
            allProducts.push(partial);
        }
    }
    return allProducts;
}

async function loadProductPage(query, page) {
    document.getElementById("product-page").append(loadingElement)
    let allProducts = await DataLoading(query);
    let container = document.getElementById('product-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    for (let i = 18 * page; i < 18 * (page + 1); i++) {
        if (allProducts[i])
        {
            container.append(allProducts[i])
        }
    }
    document.getElementById("loading-container").remove()
    container.scrollIntoView({behavior: "smooth"});
}

async function createPageButtons(query) {
    let allProducts = await DataLoading(query);
    let container = document.getElementById('page-bar');
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    for (let i = 0; i <= (allProducts.length / 18); i++) {
        let button = createElement(`<li><button onclick=loadProductPage(query,${i})>${i+1}</button></li>`)
        container.append(button)
    }
}

(function($){

    var paginate = {
        startPos: function(pageNumber, perPage) {
            // determine what array position to start from
            // based on current page and # per page
            return pageNumber * perPage;
        },

        getPage: function(items, startPos, perPage) {
            // declare an empty array to hold our page items
            var page = [];

            // only get items after the starting position
            items = items.slice(startPos, items.length);

            // loop remaining items until max per page
            for (var i=0; i < perPage; i++) {
                page.push(items[i]); }

            return page;
        },

        totalPages: function(items, perPage) {
            // determine total number of pages
            return Math.ceil(items.length / perPage);
        },

        createBtns: function(totalPages, currentPage) {
            // create buttons to manipulate current page
            var pagination = $('<div class="pagination" />');

            // add a "first" button
            pagination.append('<span class="pagination-button">&laquo;</span>');

            // add pages inbetween
            for (var i=1; i <= totalPages; i++) {
                // truncate list when too large
                if (totalPages > 5 && currentPage !== i) {
                    // if on first two pages
                    if (currentPage === 1 || currentPage === 2) {
                        // show first 5 pages
                        if (i > 5) continue;
                        // if on last two pages
                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                        // show last 5 pages
                        if (i < totalPages - 4) continue;
                        // otherwise show 5 pages w/ current in middle
                    } else {
                        if (i < currentPage - 2 || i > currentPage + 2) {
                            continue; }
                    }
                }

                // markup for page button
                var pageBtn = $('<span class="pagination-button page-num" />');

                // add active class for current page
                if (i == currentPage) {
                    pageBtn.addClass('active'); }

                // set text to the page number
                pageBtn.text(i);

                // add button to the container
                pagination.append(pageBtn);
            }

            // add a "last" button
            pagination.append($('<span class="pagination-button">&raquo;</span>'));

            return pagination;
        },

        createPage: function(items, currentPage, perPage) {
            // remove pagination from the page
            $('.pagination').remove();

            // set context for the items
            var container = items.parent(),
                // detach items from the page and cast as array
                items = items.detach().toArray(),
                // get start position and select items for page
                startPos = this.startPos(currentPage - 1, perPage),
                page = this.getPage(items, startPos, perPage);

            // loop items and readd to page
            $.each(page, function(){
                // prevent empty items that return as Window
                if (this.window === undefined) {
                    container.append($(this)); }
            });

            // prep pagination buttons and add to page
            var totalPages = this.totalPages(items, perPage),
                pageButtons = this.createBtns(totalPages, currentPage);

            container.after(pageButtons);
        }
    };

    // stuff it all into a jQuery method!
    $.fn.paginate = function(perPage) {
        var items = $(this);

        // default perPage to 5
        if (isNaN(perPage) || perPage === undefined) {
            perPage = 5; }

        // don't fire if fewer items than perPage
        if (items.length <= perPage) {
            return true; }

        // ensure items stay in the same DOM position
        if (items.length !== items.parent()[0].children.length) {
            items.wrapAll('<div class="pagination-items" />');
        }

        // paginate the items starting at page 1
        paginate.createPage(items, 1, perPage);

        // handle click events on the buttons
        $(document).on('click', '.pagination-button', function(e) {
            // get current page from active button
            var currentPage = parseInt($('.pagination-button.active').text(), 10),
                newPage = currentPage,
                totalPages = paginate.totalPages(items, perPage),
                target = $(e.target);

            // get numbered page
            newPage = parseInt(target.text(), 10);
            if (target.text() == '«') newPage = 1;
            if (target.text() == '»') newPage = totalPages;

            // ensure newPage is in available range
            if (newPage > 0 && newPage <= totalPages) {
                paginate.createPage(items, newPage, perPage); }
        });
    };

})(jQuery);

async function filtering(category) {
    categories[1] = category
    query.filter.categories = {$all: categories};
    await createPageButtons(query)
    await loadProductPage(query, 0)
}

async function sortOption(option) {
    switch (option) {
        case "A-Z":
            query.sort = {name: "ascending"};
            break;
        case "Z-A":
            query.sort = {name: "descending"};
            break;
        case "price+1":
            query.sort = {price: "ascending"};
            break;
        case "price-1":
            query.sort = {price: "descending"};
            break;
    }
    await createPageButtons(query)
    await loadProductPage(query, 0)
}

