import TabsFeed from "@/components/TabsFeed.tsx";

const Header = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-sm">FocusNews</h1>
            <TabsFeed></TabsFeed>
        </div>
    )
}

export default Header;