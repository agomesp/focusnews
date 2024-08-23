import NewsCard from "@/components/NewsCard.tsx";
import useNewsData from "@/hooks/useNewsData.ts";

const NewsFeed = () => {
    const {isPending, error, data} = useNewsData();

    return (
        <div className="flex gap-2 w-full flex-wrap">
            {isPending && <div>Loading...</div>}
            {data && data.map((article: any, index: number) => {
                return <NewsCard key={index} news={article}></NewsCard>
            })}
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

export default NewsFeed;