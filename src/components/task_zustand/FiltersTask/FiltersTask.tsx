import { useTaskStore } from "@/store/task.store";
import { Label, Select } from "flowbite-react";

export function FiltersTask() {
    const filter = useTaskStore((state) => state.filter);
    const setFilter = useTaskStore((state) => state.setFilter);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    return (
        <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="filtertodo">Filter tasks</Label>
            <Select
                value={filter}
                id="filtertodo"
                className="hover:cursor-pointer"
                onChange={handleSelectChange}
                required
            >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
            </Select>
        </div>
    );
}
