import {
    Drawer,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.tsx";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Button} from "@/components/ui/button.tsx";
import {UserRoundCog} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import useNewsStore from "@/store/useNewsStore.ts";
import CheckboxComponent from "@/components/CheckboxComponent.tsx";

const PreferencesDrawer = () => {
    const {categories, preferences, setPreferences} = useNewsStore();

    const checkCategory = (checked: boolean, category: string, source: 'nytimesCategories' | 'guardianCategories' | 'sources') => {
        if (checked) {
            preferences[source].push(category);
        } else {
            preferences[source] = preferences[source].filter((c) => c !== category);
        }
        setPreferences({...preferences});
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline"><UserRoundCog/></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm max-h-[70vh] overflow-auto">
                    <DrawerHeader>
                        <DrawerTitle>Preferences</DrawerTitle>
                        <DrawerDescription>Set your news preferences.</DrawerDescription>
                    </DrawerHeader>
                    <div>
                        <h4 className="text-sm font-medium leading-none">Preferred Sources</h4>
                        <Separator className="my-2"/>
                        <CheckboxComponent
                            items={[
                                {id: "newsapi", title: "NewsAPI"},
                                {id: "nytimes", title: "New York Times"},
                                {id: "guardian", title: "Guardian"}
                            ]}
                            selectedItems={preferences.sources}
                            checkItem={(checked, category) => checkCategory(checked, category, 'sources')}
                        ></CheckboxComponent>

                        <h4 className="text-sm font-medium leading-none mt-8">Preferred New York Times Categories</h4>
                        <Separator className="my-2"/>
                        <ScrollArea className="h-56 rounded-md border p-2">
                            <CheckboxComponent
                                items={categories.nytimes}
                                selectedItems={preferences.nytimesCategories}
                                checkItem={(checked, category) => checkCategory(checked, category, 'nytimesCategories')}
                            ></CheckboxComponent>
                        </ScrollArea>

                        <h4 className="text-sm font-medium leading-none mt-8">Preferred Guardian Categories</h4>
                        <Separator className="my-2"/>
                        <ScrollArea className="h-56 rounded-md border p-2">
                            <CheckboxComponent
                                items={categories.guardian}
                                selectedItems={preferences.guardianCategories}
                                checkItem={(checked, category) => checkCategory(checked, category, 'guardianCategories')}
                            ></CheckboxComponent>
                        </ScrollArea>
                    </div>
                    <DrawerFooter>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default PreferencesDrawer;