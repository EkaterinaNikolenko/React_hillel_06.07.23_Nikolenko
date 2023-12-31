import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    let abortController = new AbortController();

    const getData = async () => {
        setIsLoading(true);
        setError("");
        setData([]);
        try {
            const response = await fetch(url, {
                signal: abortController.signal
            });

            if(!response.ok) {
                throw new Error('Failed fetch users');
            }

            const data = await response.json();
            setData(data);
        } catch(error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
        return () => {
            abortController.abort();
        }
    }, [url])

    return [data, error, isLoading, getData];
}

export default useFetch;