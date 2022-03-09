import {Post} from "./post";
const axios = require("axios");

export class SupermetricsAPI {

    url: string;
    client_id: string;
    email: string;
    name: string;
    sl_token: string | null = null;

    constructor(url: string, client_id: string, email: string, name: string) {
        this.url = url;
        this.client_id = client_id;
        this.email = email;
        this.name = name;
    }

    async connectToSupermetricsAPI() {

        const response = await axios.post(`${this.url}/assignment/register`, {
            client_id: this.client_id,
            email: this.email,
            name: this.name
        });
        const status: number = response.status;
        if (status === 200)
            this.sl_token = response.data.data.sl_token;
        return status;
    }


    async getDataFromSupermetricsAPI(page: number): Promise<Array<Post>> {
        const response = await axios.get(`${this.url}/assignment/posts?sl_token=${this.sl_token}&page=${page}`);
        return response.data.data.posts;
    }

}