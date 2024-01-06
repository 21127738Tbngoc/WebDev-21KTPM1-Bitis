function createElement(string)
{
    let parser = new DOMParser();
    let HTMLdocument = parser.parseFromString(string,'text/html');
    return  HTMLdocument.body.firstElementChild;
}

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

    for (let i =0; i < Data.length; i++) {

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
        // let product_card = html(partial)
        // let parser = new DOMParser();
        // let HTMLdocument = parser.parseFromString(data,'text/html');
        // let partial = HTMLdocument.getElementsByClassName('col-3')[0]
        let partial = createElement(data)
        allProducts.push(partial);

    }
    return allProducts;
}

async function loadProductPage(query,page)
{
    let container = document.getElementById('product-container');
    while (container.firstChild) {container.removeChild(container.firstChild)}
    for (let i = 18*page; i < 18*(page+1); i++)
    {
        container.append(allProducts[i])
    }
}

async function createPageButtons(query)
{
    let container = document.getElementById('page-bar');
    while (container.firstChild) {container.removeChild(container.firstChild)}
    for (let i = 1; i <= allProducts.length/18;i++)
    {
        let button = createElement(`<li><button>${i}</button></li>`)
        button.addEventListener('click', loadProductPage(allProducts,i-1))
        container.append(button)
    }
}
