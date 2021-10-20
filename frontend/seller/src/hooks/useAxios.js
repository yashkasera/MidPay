/**
 * @author yashkasera
 * Created 04/10/21 at 6:59 PM
 */
import {useEffect, useState} from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
const authHeader = {
    Authorization: "Bearer " + sessionStorage.getItem("idToken")
}
const useAxios = ({url, method, body = null, headers = authHeader}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        axios[method](url, headers, JSON.parse(body))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return {response, error, loading};
};

export default useAxios;