import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

interface CheckboxComponentProps {
    items: Array<{ id: string; title: string }>;
    selectedItems: Array<string>;
    checkItem: (checked: boolean, item: string) => void;
}

const CheckboxComponent = ({ items, selectedItems, checkItem }: CheckboxComponentProps) => {

    return (
        <div className="flex gap-2 flex-wrap">
            {items.map((item) => (
                <div className="flex items-center space-x-2" key={item.id}>
                    <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(c: boolean) => checkItem(c, item.id)}
                        id={item.id}
                    />
                    <Label htmlFor={item.id}>{item.title}</Label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxComponent;