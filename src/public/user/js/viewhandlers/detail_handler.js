function create_Element(string) {
    let parser = new DOMParser();
    let HTMLdocument = parser.parseFromString(string, 'text/html');
    return HTMLdocument.body.firstElementChild;
}

const loadingElement = create_Element(`<div id="loading-container" class="justify-content-center" style="display:block; z-index: 9999;">
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

async function CommentsLoading(query) {
    const Filter = query.filter || {};
    const Sort = query.sort || {name: "ascending"};
    const Limit = query.limit || 2 ** 32;
    let Data = await $.ajax(
        {
            url: 'http://localhost:3000/feedbacks/',
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

async function loadCommentsPage(query, page) {
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

