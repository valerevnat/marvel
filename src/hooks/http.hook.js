// Файл для собственных хуков

import { useState, useCallback } from "react";


// Для избавления повторяющегося кода
// loading, error

export const useHttp = () => {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);

    // изменение состояиний будет происходить во время запросов
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true);
        try {
            const response = await fetch(url, {method, body, headers}); // это промис
            // провекра res
            if(!response.ok) {
                throw new Error(`code error: ${response.status}`);
            }
            const data = await response.json(); // для получение данных

            // Если данные загрузились
            setLoading(false);
            return data; // Чистые данные от API

        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error; // Выкидываем ошибку
        }

    }, []);

    // Функция чистит ошибку
    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
}