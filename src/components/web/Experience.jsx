import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { setPage, setValue } from '@/redux/slice'
import { useState } from 'react';
import Editor, {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnUnderline,
    BtnUndo,
    Toolbar
} from 'react-simple-wysiwyg';
import toast from "react-hot-toast";

function Experience() {

    const dispatch = useDispatch()
    const { page, value } = useSelector((state) => state.data)

    const [experiences, setExperiences] = useState([
        {
            company: '',
            position: '',
            from: '',
            to: '',
            description: ''
        }
    ]);

    // Handle Add Form
    const handleAddExperience = () => {
        setExperiences([
            ...experiences,
            { company: '', position: '', from: '', to: '', description: '' }
        ]);
    };

    // Handle Remove Form
    const handleRemoveExperience = () => {
        if (experiences.length > 1) {
            setExperiences(experiences.slice(0, -1))
        }
    };

    // Handle form input
    const handleChange = (index, field, value) => {
        const updated = [...experiences];
        updated[index][field] = value;
        setExperiences(updated);
    };

    // Save Button Handle
    const HandleSaveBtn = () => {
        toast.success("Experience data saved!");
        dispatch(setValue({ ...value, experiences }))
        dispatch(setPage(page + 1))
    }

    return (
        <div>
            { /* Heading  */}
            <div className="mb-3">
                <h1 className="text-lg font-bold">Experience</h1>
            </div>

            { /* form map */}
            {experiences.map((exp, index) => (
                <div key={index} className="border rounded p-4 mb-4">

                    { /*  Company Name and Working Position  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">

                        { /* Company Name */}
                        <div className="space-y-1.5">
                            <Label>Company Name</Label>
                            <Input
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={(e) => handleChange(index, 'company', e.target.value)}
                            />
                        </div>

                        { /* working Position  */}
                        <div className="space-y-1.5">
                            <Label>Position</Label>
                            <Input
                                placeholder="Position"
                                value={exp.position}
                                onChange={(e) => handleChange(index, 'position', e.target.value)}
                            />
                        </div>
                    </div>

                    { /* From and To Date  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 my-3">

                        { /*  From date  */}
                        <div className="space-y-1.5">
                            <Label>From</Label>
                            <Input
                                type="date"
                                value={exp.from}
                                onChange={(e) => handleChange(index, 'from', e.target.value)}
                            />
                        </div>

                        { /*  To Date */}
                        <div className="space-y-1.5">
                            <Label>To</Label>
                            <Input
                                type="date"
                                value={exp.to}
                                onChange={(e) => handleChange(index, 'to', e.target.value)}
                            />
                        </div>
                    </div>

                    { /* Rich text */}
                    <div className="space-y-1.5 my-3">
                        <Label>Description</Label>
                        <Editor
                            value={exp.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                        >
                            <Toolbar>
                                <BtnBold />
                                <BtnItalic />
                                <BtnUnderline />
                                <BtnNumberedList />
                                <BtnBulletList />
                                <BtnLink />
                                <BtnUndo />
                                <BtnRedo />
                            </Toolbar>
                        </Editor>
                    </div>
                </div>
            ))}

            { /* Bottom Buttons  */}
            <div className="flex items-center justify-between text-gray-800">

                { /*  Add or remove form */}
                <div className="space-x-3">
                    { /*  Add new form */}
                    <Button className="rounded px-5 cursor-pointer" variant="outline" onClick={handleAddExperience}>
                        Add New
                    </Button>

                    { /* Remove Form  */}
                    <Button
                        className="rounded px-5 cursor-pointer"
                        variant="outline"
                        onClick={handleRemoveExperience}
                    >
                        Remove
                    </Button>
                </div>

                { /* Save Button */}
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

export default Experience;
