import { useEffect, useState } from "react";

export function useMockdata<T> (
    fetcher: () => Promise<T>,
    delay: 500
) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
    
        const timer = setTimeout(() => {
            fetcher()
            .then(result => {
                if (mounted) {
                    setData(result);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (mounted) {
                setError(err);
                setLoading(false);
                }
            });
        }, delay);
    
        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [fetcher, delay]);

    return { data, isLoading, error };
}