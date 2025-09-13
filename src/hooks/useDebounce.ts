import { useState, useEffect } from 'react';

function useDebounce(value: string) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
}

export default useDebounce;