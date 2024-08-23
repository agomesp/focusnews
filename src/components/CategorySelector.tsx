import useNewsStore from "@/store/useNewsStore.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import CheckboxComponent from "@/components/CheckboxComponent.tsx";

const CategorySelector = () => {
    const {categories, selectedCategories, setSelectedCategories, source} = useNewsStore();

    const checkCategory = (checked: boolean, category: string) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, category])
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        }
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline">
                    Select categories
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <ScrollArea className="h-56 rounded-md border p-2">
                    {
                        source !== 'myfeed' ? (
                            <CheckboxComponent
                                items={categories[source]}
                                selectedItems={selectedCategories}
                                checkItem={checkCategory}
                            ></CheckboxComponent>
                        ) : null
                    }
                    {source === 'newsapi' && (<p>No categories for this source</p>)}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}

export default CategorySelector;