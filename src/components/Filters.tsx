import DatePicker from "@/components/DatePicker.tsx";
import SourceSelector from "@/components/SourceSelector.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import CategorySelector from "@/components/CategorySelector.tsx";
import PreferencesDrawer from "@/components/PreferencesDrawer.tsx";
import useNewsStore from "@/store/useNewsStore.ts";

const Filters = () => {
    const {source} = useNewsStore();

    return (
        <div className='flex gap-2 flex-wrap'>
            <PreferencesDrawer></PreferencesDrawer>

            <DatePicker/>

            {source !== "myfeed" &&
                <>
                    <SourceSelector/>

                    <CategorySelector/>
                </>
            }

            <SearchBar/>
        </div>
    )
}

export default Filters;