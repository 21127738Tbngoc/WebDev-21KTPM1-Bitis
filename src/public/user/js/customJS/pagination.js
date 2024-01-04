function pagination(props, page) {
    const PageData = [];
    for (let i = process.env.PAGE_SIZE * page; i < process.env.PAGE_SIZE * (page + 1); i++) {
        if (props[i]) {
            PageData.push(props[i])
        }
    }
    return PageData;
}

function jQuery(props,page)
{
    const PageData = [];
    for (let i = process.env.PAGE_SIZE * page; i < process.env.PAGE_SIZE * (page + 1); i++) {
        if (props[i]) {
            PageData.push(props[i])
        }
    }
    // const view = Handlebars.partials["paging"]({Products: props});
        $('#page-content').innerHTML("Hello World")
}