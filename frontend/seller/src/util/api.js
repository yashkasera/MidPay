/**
 * @author yashkasera
 * Created 05/10/21 at 11:02 PM
 */

import axios from 'axios';

// TODO: 12/10/21 Change BaseURL
export default axios.create({
    baseURL: `http://localhost:3000/`,
    headers: {
        Authorization: sessionStorage.getItem("idToken")
    }
});