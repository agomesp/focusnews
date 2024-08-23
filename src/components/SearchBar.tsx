import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import useNewsStore from "@/store/useNewsStore.ts";

const SearchBar = () => {
    const { setSearch } = useNewsStore();
    const [timeoutId, setTimeoutId] = useState(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeoutId as any);

        const timeout = setTimeout(() => {
            setSearch(event.target.value);
        }, 400);

        setTimeoutId(timeout as any);
    };

    return (
        <div className="relative ml-auto flex-1 min-w-36">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input onChange={handleSearch} type="search" placeholder="Search..."
                   className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"></Input>
        </div>
    )
}

export default SearchBar;