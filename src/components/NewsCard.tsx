import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";

const NewsCard = ({news}: any) => {

    const dateFormater = (d: any) => {
        const date = new Date(d);
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    }

    const openNews = () => {
        window.open(news.url, '_blank');
    }

    return (
        <Card onMouseDown={openNews} className="flex-1 min-w-96 text-left hover:shadow-2xl hover:transition-shadow cursor-pointer">
            <CardHeader>
                <img alt="Article Image" src={news.urlToImage}
                     className="aspect-square w-full rounded-md object-cover h-40"/>
                <CardTitle className="text-lg">{news.title}</CardTitle>
                <CardDescription>{news.description}</CardDescription>
            </CardHeader>

            <CardFooter className="flex gap-1">
                <Badge variant="outline">{dateFormater(news.publishedAt)}</Badge>
                <Badge variant="secondary">{news.author || 'N/A'}</Badge>
                <Badge>{news.source || 'N/A'}</Badge>
            </CardFooter>
        </Card>
    )
}

export default NewsCard;