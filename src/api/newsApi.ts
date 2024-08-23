const API_KEY_NEWSAPI = import.meta.env.VITE_NEWSAPI_KEY;
const API_KEY_NY = import.meta.env.VITE_NY_KEY;
const API_KEY_GUARDIAN = import.meta.env.VITE_GUARDIAN_KEY;

const dateFormater = (date: Date, source: string) => {
    if (source === 'nytimes') {
        return date.toISOString().split('T')[0].split('-').join('');
    }

    return date.toISOString().split('T')[0];
};

const getSourceUrl = (source: string, search: string, dateRange: {
    from: Date;
    to: Date
}, currentPage: number, selectedCategories: Array<string>) => {
    const from = dateFormater(dateRange.from, source);
    const to = dateFormater(dateRange.to, source);
    const joinedCategories = selectedCategories.join('|');

    switch (source) {
        case 'newsapi':
            return `https://newsapi.org/v2/everything?q=${search || 'a'}&from=${from}&to=${to}&pageSize=10&page=${currentPage}&apiKey=${API_KEY_NEWSAPI}`;
        case 'nytimes':
            return `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=(${search})${selectedCategories.length > 0 ? ` AND news_desk:(${selectedCategories.map(cat => `"${encodeURIComponent(cat)}"`)})` : ''}&facet_fields=day_of_week,news_desk&facet=true&begin_date=${from}&end_date=${to}&news_desk=${joinedCategories}&page=${currentPage}&api-key=${API_KEY_NY}`;
        case 'guardian':
            return `https://content.guardianapis.com/search?q=${search}&page=${currentPage}${joinedCategories && `&section=${joinedCategories}`}&from-date=${from}&to-date=${to}&show-references=author&show-fields=all&api-key=${API_KEY_GUARDIAN}`;
        default:
            return '';
    }
}


const treatNewsData = (data: any, source: string) => {
    let articles = [];
    let totalPages = 1;

    if (source === 'nytimes') {
        console.log('test', data.response.docs);
        totalPages = data.response.docs.length / 10;
        articles = data.response.docs.map((article: any) => {
            return {
                author: article.byline.original ? article.byline.original : 'NYT',
                title: article.headline.main,
                description: article.abstract,
                url: article.web_url,
                urlToImage: article.multimedia[0] ? `https://www.nytimes.com/${article.multimedia[0].url}` : 'https://ui.shadcn.com/placeholder.svg',
                publishedAt: article.pub_date,
                source: article.source,
            }
        });
    } else if (source === 'newsapi') {
        totalPages = data.totalResults < 10 ? data.totalResults / 10 : 10;
        articles = data.articles.map((article: any) => {
            return article.title !== "[Removed]" && {
                author: `By ${article.author || article.source.name}`,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage || 'https://ui.shadcn.com/placeholder.svg',
                publishedAt: article.publishedAt,
                source: article.source.name,
            }
        }).filter((article: any) => article);
    } else if (source === 'guardian') {
        totalPages = data.response.pages;
        articles = data.response.results.map((article: any) => {
            return {
                author: article.fields.byline || 'Guardian',
                title: article.webTitle,
                description: article.fields.trailText || '',
                url: article.webUrl,
                urlToImage: article.fields.thumbnail || 'https://ui.shadcn.com/placeholder.svg',
                publishedAt: article.webPublicationDate,
                source: "Guardian",
            }
        });
    }

    return {totalPages, articles};
}

export const fetchNews = async (search: string, dateRange: {
    from: Date;
    to: Date
}, source: string, currentPage: number, selectedCategories: Array<string>, preferences: {
    sources: Array<string>,
    nytimesCategories: Array<string>,
    guardianCategories: Array<string>
}) => {
    let articles;
    if (source === 'myfeed') {
        let datas: any = preferences.sources.map(async (source) => {
            let categories = [''];

            if(source === 'nytimes') {
                categories = preferences.nytimesCategories;
            } else if (source === 'guardian') {
                categories = preferences.guardianCategories;
            }

            let result = await fetch(getSourceUrl(source, search, dateRange, currentPage, categories)).then(
                (res) => {
                    return res.json()
                }
            ).catch((err) => {
                console.log('err', err)
            });

            if(result.fault || result?.status === "error") {
                return;
            }

            return treatNewsData(result, source);
        });

        let news = await Promise.all(datas);
        articles = news.reduce((acc: any, val: any) => {
            if(val) {
                val.totalPages > acc.totalPages ? acc.totalPages = val.totalPages : acc.totalPages;
                acc.articles = [...acc.articles, ...val.articles];
            }
            return acc;
        }, {totalPages: 0, articles: []});

    } else {
        let response = await fetch(getSourceUrl(source, search, dateRange, currentPage, selectedCategories)).then(
            (res) => {
                return res.json()
            }
        ).catch((err) => {
            console.log('err', err)
        });

        articles = treatNewsData(response, source);
    }
    articles.articles.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return articles;
};

export const fetchGuardianCategories = async () => {
    const guardianCategories = await fetch(`https://content.guardianapis.com/sections?api-key=${API_KEY_GUARDIAN}`);
    const guardianCategoriesJson = await guardianCategories.json();

    return guardianCategoriesJson.response.results.map((category: any) => {
        return {
            id: category.id,
            title: category.webTitle,
        }
    })
}