const axios = require("axios");

async function ProductQuery(filter)
{
    let response = await axios.get('http://localhost:3000/product/', {params: filter});
    response = response.data;
    return response;
}