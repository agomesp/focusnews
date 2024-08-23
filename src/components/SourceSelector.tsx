import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import useNewsStore from "@/store/useNewsStore";

const SourceSelector = () => {
    const {source, setSource} = useNewsStore();

    return (
        <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a source"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sources</SelectLabel>
                    <SelectItem value="newsapi">NewsAPI</SelectItem>
                    <SelectItem value="nytimes">New York Times</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SourceSelector;