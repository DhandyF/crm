import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const ping = () => {
    axios.get(`${baseUrl}/ping`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}
