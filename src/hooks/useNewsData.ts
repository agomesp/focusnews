import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {fetchGuardianCategories, fetchNews} from "@/api/newsApi.ts";
import useNewsStore from "@/store/useNewsStore.ts";
import { useEffect } from "react";

const fetchNewsData = async (
    search: string,
    date: any,
    source: string,
    currentPage: number,
    selectedCategories: string[],
    preferences: any,
    setTotalPages: (totalPages: number) => void
) => {
    const news = await fetchNews(search, { from: date.from!, to: date.to! }, source, currentPage, selectedCategories, preferences);
    setTotalPages(news.totalPages);
    return news.articles;
};

const useNewsData = () => {
    const queryClient = useQueryClient();
    const { search, date, source, currentPage, categories, selectedCategories, preferences, setTotalPages, setCurrentPage, setCategories, setSelectedCategories } = useNewsStore();

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData', search, date],
        queryFn: () => fetchNewsData(search, date, source, currentPage, selectedCategories, preferences, setTotalPages),
    });

    useQuery({
        queryKey: ['guardianCategories'],
        queryFn: async () => {
            const guardianCategories = await fetchGuardianCategories();
            setCategories({...categories, guardian: guardianCategories});
            return guardianCategories;
        },
    });

    const mutation = useMutation({
        mutationFn: () => fetchNewsData(search, date, source, currentPage, selectedCategories, preferences, setTotalPages),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['repoData'] });
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, [search, date, source, currentPage, selectedCategories, preferences]);

    useEffect(() => {
        setCurrentPage(1);
    }, [source, search, date]);

    useEffect(() => {
        setSelectedCategories([]);
    }, [source]);

    useEffect(() => {
        localStorage.setItem('preferences', JSON.stringify(preferences));
    }, [preferences])

    return { isPending, error, data };
};

export default useNewsData;