import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, setValue } from '@/redux/slice'

function Education() {

    const { page, value } = useSelector((state) => state.data)
    const dispatch = useDispatch()

    const [educations, setEducations] = useState([
        { degree: "", university: "", cgpa: "", year: "" },
    ]);

    // Add new education field
    const handleAdd = () => {
        setEducations([...educations, { degree: "", university: "", cgpa: "", year: "" }]);
    };

    // Remove last education field
    const handleRemove = () => {
        if (educations.length > 1) {
            setEducations(educations.slice(0, -1));
        }
    };

    // Handle input change
    const handleChange = (index, field, value) => {
        const updated = [...educations];
        updated[index][field] = value;
        setEducations(updated);
    };

    // Handle Save Button
    const HandleSaveBtn = () => {
        for (let edu of educations) {
            if (
                (edu.degree || "").trim() === "" ||
                (edu.university || "").trim() === "" ||
                (edu.cgpa || "").trim() === "" ||
                (edu.year || "").trim() === ""
            ) {
                return toast.error("Please fill all fields before saving!");
            }
        }
        dispatch(setPage(page + 1))
        dispatch(setValue({ ...value, educations }));
        toast.success("Education data saved!");
    };

    return (
        <div>
            {/* Heading */}
            <div className="mb-3">
                <h1 className="text-lg font-bold">Education</h1>
            </div>

            {educations.map((edu, index) => (
                <div key={index} className="mb-5 border-b pb-4">

                    {/* Class and University field */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        { /* Class/Degree  */}
                        <div className="space-y-1.5">
                            <Label>Class/Degree</Label>
                            <Input
                                placeholder="ex- 10,12,BCA,B.Tech"
                                value={edu.degree}
                                onChange={(e) => handleChange(index, "degree", e.target.value)}
                            />
                        </div>

                        { /*  University/Board  */}
                        <div className="space-y-1.5">
                            <Label>University/Board</Label>
                            <Input
                                placeholder="ex- State Board, AKTU"
                                value={edu.university}
                                onChange={(e) => handleChange(index, "university", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Percentage and Year section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">

                        { /*  Percentage */}
                        <div className="space-y-1.5">
                            <Label>Percentage</Label>
                            <Input
                                placeholder="Percentage/CGPA"
                                value={edu.cgpa}
                                onChange={(e) => handleChange(index, "cgpa", e.target.value)}
                            />
                        </div>

                        { /* Year  */}
                        <div className="space-y-1.5">
                            <Label>Year</Label>
                            <Input
                                placeholder="passing year"
                                value={edu.year}
                                onChange={(e) => handleChange(index, "year", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Buttons fields */}
            <div className="flex items-center justify-between text-gray-800">

                { /*  Add New and remove button  */}
                <div className=" space-x-3">

                    { /* Add New  */}
                    <Button
                        onClick={handleAdd}
                        className="rounded px-5 cursor-pointer" variant="outline">
                        Add New
                    </Button>

                    { /*  Remove Button  */}
                    <Button
                        onClick={handleRemove}
                        className="rounded px-5 cursor-pointer" variant="outline">
                        Remove
                    </Button>
                </div>

                { /*  Save Button  */}
                <div>
                    <Button
                        onClick={HandleSaveBtn}
                        className="rounded px-8 bg-indigo-700 text-white cursor-pointer">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Education;