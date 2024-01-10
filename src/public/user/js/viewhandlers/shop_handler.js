const currency = (data) => {
    return parseInt(data).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
}

const rating = (stars) => {
    return `https://res.cloudinary.com/dxsvumas8/image/upload/v1703921412/rating-${Math.round(stars)}.png`
}

const pStatus = (quantity) => {
    return (quantity === 0 ? 'Hết hàng' : 'Còn hàng')
}

const time = (fromDate) => {
    const now = new Date();
    const difference = now - new Date(fromDate);
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years + (years === 1 ? ' year' : ' years') + " ago";
    } else if (months > 0) {
        return months + (months === 1 ? ' month' : ' months') + " ago";
    } else if (days > 0) {
        return days + (days === 1 ? ' day' : ' days') + " ago";
    } else if (hours > 0) {
        return hours + (hours === 1 ? ' hour' : ' hours') + " ago";
    } else if (minutes > 0) {
        return minutes + (minutes === 1 ? ' minute' : ' minutes') + " ago";
    } else {
        return seconds + (seconds === 1 ? ' second' : ' seconds') + " ago";
    }
}

const productCard = (product) => `
<div class="col-3 g-4 product-card-container">
    <div class="product-card">
        <!-- Thumbnail -->
        <div class="product-thumbnail">
            <div class="product-label-new">${product.tags}</div>
            <div class="product-favorite">
                <div class="icon-wishlist"></div>
            </div>
            <div class="figure">
                <img class="Sirv image-main" src='${product.images[0]}' id="active">
                <img class="Sirv image-hover" data-src=${product.images[1]}>
            </div>
        </div>
        <!-- Info -->
        <div class="product-info">
            <!-- Properties -->
            <div class="product-property d-flex align-items-center justify-content-between">
                <div class="product-number-size"> 6 Size</div>
            </div>

            <!-- Name -->
            <div class="product-name border-bottom" style="height: 3rem">
                <a href="/detail/${product._id}" style=" overflow: auto; text-overflow: ellipsis">${product.name}</a>
            </div>

            <!-- Price -->
            <div class="product-price d-flex align-items-center justify-content-end">${currency(product.price)}</div>

            <!-- Swatch -->
            <div class="w-100 product-colors d-flex align-items-center justify-content-center flex-wrap">
                <img src='${product.images[0]}' alt="picture-1" class="active">
                <img src='${product.images[1]}' alt="picture-2">
                <img src='${product.images[2]}' alt="picture-3">
            </div>
        </div>
    </div>
</div>
`

function createElement(string) {
    let parser = new DOMParser();
    let HTMLdocument = parser.parseFromString(string, 'text/html');
    return HTMLdocument.body.firstElementChild;
}

async function DataLoading(query) {
    const Filter = query.filter || {};
    const Sort = query.sort || {name: "ascending"};
    const Limit = query.limit || 2 ** 32;
    let allProducts = await $.ajax(
        {
            url: 'http://localhost:3000/product/',
            method: 'GET',
            data:
                {
                    filter: Filter,
                    sort: Sort,
                    limit: Limit,
                },
            success: (data, status) => {
                return {data: data, status: status}
            },
            error: (errors) => errors
        })
    console.log(allProducts.length)
    return allProducts;
}

async function loadProductPage(query, page) {

    let container = document.getElementById('product-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    let allProducts = await DataLoading(query)
    for (let i = 18 * page; i < 18 * (page + 1); i++) {
        if (allProducts[i]) {
            container.append(createElement(productCard(allProducts[i])))
        }
    }
    container.scrollIntoView({behavior: "smooth"});
}

async function createPageButtons(query) {
    let allProducts = await DataLoading(query);
    let container = document.getElementById('page-bar');
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    for (let i = 0; i <= (allProducts.length / 18); i++) {
        let button = createElement(`<li><button onclick=loadProductPage(query,${i})>${i + 1}</button></li>`)
        container.append(button)
    }
}

async function filtering(category) {
    categories.push(category)
    console.log(categories)
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

