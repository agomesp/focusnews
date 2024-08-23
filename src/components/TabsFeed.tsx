import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import useNewsStore from "@/store/useNewsStore.ts";

const TabsFeed = () => {
    const {setSource} = useNewsStore();

    return (
        <Tabs defaultValue="myfeed" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="myfeed" onClick={() => setSource('myfeed')}>My Feed</TabsTrigger>
                <TabsTrigger value="focused" onClick={() => setSource('newsapi')}>Focused</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default TabsFeed;