import create from 'zustand';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import nytcategories from "@/mocks/nytcategories.ts";

interface NewsState {
    search: string;
    date: DateRange | undefined;
    source: 'myfeed' | 'newsapi' | 'nytimes' | 'guardian';
    currentPage: number;
    totalPages: number;
    categories: Categories;
    selectedCategories: Array<string>;
    preferences: { sources: Array<string>, nytimesCategories: Array<string>, guardianCategories: Array<string> };
    setSearch: (search: string) => void;
    setDate: (date: DateRange | undefined) => void;
    setSource: (source: string) => void;
    setCurrentPage: (page: number) => void;
    setTotalPages: (total: number) => void;
    setCategories: (categories: Categories) => void;
    setSelectedCategories: (selectedCategories: Array<string>) => void;
    setPreferences: (preferences: { sources: Array<string>, nytimesCategories: Array<string>, guardianCategories: Array<string> }) => void;
}

interface Preferences {
    sources: Array<string>;
    nytimesCategories: Array<string>;
    guardianCategories: Array<string>;
}

interface Categories {
    newsapi: Array<any>;
    nytimes: Array<any>;
    guardian: Array<any>;
}

const getInitialPreferences = (): Preferences => {
    const storedPreferences = localStorage.getItem('preferences');
    return storedPreferences ? JSON.parse(storedPreferences) : {
        sources: ['newsapi', 'nytimes', 'guardian'],
        nytimesCategories: [],
        guardianCategories: [],
    };
};

const initialState = (set: Function): NewsState => ({
    search: 'a',
    date: {
        from: subDays(new Date(), 10),
        to: new Date(),
    },
    source: 'myfeed',
    currentPage: 1,
    totalPages: 1,
    categories: {
        newsapi: [],
        nytimes: nytcategories,
        guardian: [],
    },
    selectedCategories: [],
    preferences: getInitialPreferences(),
    setSearch: (search) => set({ search, currentPage: 1 }),
    setDate: (date) => set({ date, currentPage: 1 }),
    setSource: (source) => set({ source, currentPage: 1 }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setTotalPages: (total) => set({ totalPages: Math.floor(total) }),
    setCategories: (categories) => set({ categories }),
    setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
    setPreferences: (preferences) => set({ preferences }),
});

const useNewsStore = create<NewsState>((set) => initialState(set));

export default useNewsStore;