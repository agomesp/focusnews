import './App.css'
import Header from "@/components/Header.tsx";
import NewsFeed from "@/components/NewsFeed.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Filters from "@/components/Filters.tsx";
import NewsPagination from "@/components/NewsPagination.tsx";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col gap-2">
                <Header></Header>
                <Filters></Filters>
                <NewsFeed></NewsFeed>
                <NewsPagination></NewsPagination>
            </div>
        </QueryClientProvider>
    )
}

export default App
