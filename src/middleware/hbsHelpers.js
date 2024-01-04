const Handlebars = require('handlebars')

Handlebars.registerHelper('page_amount', (props)=> {
    let pages = []
    for (let i = 1; i < props.length/24+1;i++)
    {
        pages.push(i);
    }
    return pages;
})

export default Handlebars;