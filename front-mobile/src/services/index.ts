import axios from 'axios';

export const TOKEN = 'Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==';

export const api = axios.create ({
    baseURL: "https://matheeuspc-dscatalog.herokuapp.com",
});

export function getProducts() {
    const res = api.get(`/products?page=0&linesPerPage=12&direction=ASC&orderBy=name`);
    return res;
}

