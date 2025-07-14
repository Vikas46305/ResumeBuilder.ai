import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { setPage, setValue } from '@/redux/slice'

function Skills() {

    const dispatch = useDispatch()
    const { page, value } = useSelector((state) => state.data)

    const starCount = 5;
    const starIcon = "★";

    const [data, setData] = useState([
        { skill: "", rating: 0 }
    ]);
    const [hoverIndex, setHoverIndex] = useState(null);

    // Handle Add new skill
    const handleAddSkill = () => {
        setData([...data, { skill: "", rating: 0 }]);
    };

    // Handle Remove Skill
    const handleRemoveSkill = () => {
        if (data.length > 2) {
            setData(data.slice(0, -1));
        }
    };

    // Handle Input Change
    const handleInputChange = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value;
        setData(updated);
    };

    // Handle Rating Change
    const handleRatingChange = (index, value) => {
        const updated = [...data];
        updated[index].rating = value + 1;
        setData(updated);
    };

    // Handle Save Button
    const HandleSaveBtn = () => {
        for (let newData of data) {
            if (!newData.skill || !newData.rating) {
                return toast.error("All fieds are required")
            }
        }
        dispatch(setValue({ ...value, skills: data }))
        toast.success("Skill data saved!");
        dispatch(setPage(page + 1))
    }

    return (
        <div>

            { /* Handle Save Button  */}
            <div>
                <h1 className="text-lg font-bold">Skills</h1>
            </div>

            {  /* Form Map function  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center">

                        { /* Skills */}
                        <div className="w-full">
                            <Input
                                value={item.skill}
                                onChange={(e) => handleInputChange(index, "skill", e.target.value)}
                                placeholder="e.g., HTML, CSS, JavaScript"
                            />
                        </div>

                        { /* Rating */}
                        <div className="flex items-center gap-0.5 px-1.5">
                            {[...Array(starCount)].map((_, starIndex) => (
                                <Button
                                    key={starIndex}
                                    variant="none"
                                    className={`text-2xl cursor-pointer p-0 ${starIndex < (hoverIndex !== null ? hoverIndex : item.rating)
                                        ? "text-amber-600"
                                        : "text-gray-400"
                                        }`}
                                    onClick={() => handleRatingChange(index, starIndex)}
                                    onMouseEnter={() => setHoverIndex(starIndex + 1)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                >
                                    {starIcon}
                                </Button>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between my-4 text-gray-800">

                { /* Add and remove button  */}
                <div className="space-x-3">

                    { /* Add new form */}
                    <Button
                        onClick={handleAddSkill}
                        className="rounded px-5 cursor-pointer" variant="outline">
                        Add New
                    </Button>

                    { /* Remove Button */}
                    <Button
                        onClick={handleRemoveSkill}
                        className="rounded px-5 cursor-pointer" variant="outline">
                        Remove
                    </Button>
                </div>

                { /* Save Button */}
                <div>
                    <Button
                        onClick={HandleSaveBtn}
                        className="rounded px-8 bg-indigo-700 text-white cursor-pointer">Save</Button>
                </div>
            </div>
        </div >
    );
}
export default Skills;