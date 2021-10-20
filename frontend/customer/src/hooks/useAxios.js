/**
 * @author yashkasera
 * Created 04/10/21 at 6:59 PM
 */
import {useEffect, useState} from 'react';
import API from '../util/api';

const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = (params) => {
        API.request(params).then((res) => {
            setResponse(res.data);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []);

    return {response, error, loading};
};

export default useAxios;