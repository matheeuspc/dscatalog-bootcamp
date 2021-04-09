import axios from 'axios';

export const api = axios.create ({
    baseURL: "https://matheeuspc-dscatalog.herokuapp.com",
});