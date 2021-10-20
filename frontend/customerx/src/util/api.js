/**
 * @author yashkasera
 * Created 05/10/21 at 11:02 PM
 */

import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:3001/`,
    headers: {
        Authorization: sessionStorage.getItem("idToken")
    }
});