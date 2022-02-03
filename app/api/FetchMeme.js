import axios from 'axios';
const baseUrl = 'https://api.imgflip.com/get_memes';
class FetchMeme{

    fetchData() {
            const response =   axios.get(baseUrl)
            return response;
    }
}

const b = new FetchMeme();
export default b;
