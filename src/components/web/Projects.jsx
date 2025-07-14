import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { setPage, setValue } from '@/redux/slice'
import { toast } from 'react-hot-toast'
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

function Projects() {

    const dispatch = useDispatch()
    const { page, value } = useSelector((state) => state.data)

    const [data, setData] = useState([{
        title: "",
        tech: "",
        gitHub: "",
        url: "",
        description: ""
    }])

    // Handle Remove Form 
    const HandleRemoveBtn = () => {
        if (data.length > 1) {
            setData(data.slice(0, -1))
        }
    }

    // Handle Add form
    const HandleAddBtn = () => {
        setData([...data, {
            title: "", tech: "", gitHub: "",
            url: "", description: ""
        }])
    }

    // Handle input change
    const HandleChange = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value
        setData(updated)
    }

    // Handle Save Button
    const HandleSaveBtn = () => {
        dispatch(setValue({ ...value, Projects: data }))
        toast.success("Project saved success !")
        dispatch(setPage(page + 1))
    }

    return (
        <div>

            { /*  Heading  */}
            <div className="mb-3">
                <h1 className="text-lg font-bold">Projects</h1>
            </div>

            {  /* Form Map  */}
            <div className="space-y-4">
                {
                    data.map((_, index) => (
                        <div key={index}>

                            { /*  Title and Technologies */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                                { /* Title */}
                                <div className="space-y-1.5">
                                    <Label>Title</Label>
                                    <Input
                                        value={data[index].title}
                                        onChange={(e) => HandleChange(index, "title", e.target.value)}
                                        placeholder="Title"
                                    />
                                </div>

                                { /* Technologies */}
                                <div className="space-y-1.5">
                                    <Label>Technologies</Label>
                                    <Input
                                        value={data[index].tech}
                                        onChange={(e) => HandleChange(index, "tech", e.target.value)}
                                        placeholder="Technologies" />
                                </div>
                            </div>

                            { /* Github and Url  */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">

                                { /* Github */}
                                <div className="space-y-1.5">
                                    <Label>GitHub link</Label>
                                    <Input
                                        value={data[index].gitHub}
                                        onChange={(e) => HandleChange(index, "gitHub", e.target.value)}
                                        placeholder="GitHub Link" />
                                </div>

                                { /* Hosted Url */}
                                <div className="space-y-1.5">
                                    <Label>Hosted Url</Label>
                                    <Input
                                        onChange={(e) => HandleChange(index, "url", e.target.value)}
                                        value={data[index].url}
                                        placeholder="Hosted Url"
                                    />
                                </div>
                            </div>

                            { /* Description ( Rich text ) */}
                            <div className="space-y-1.5 w-full">
                                <Label>Description</Label>
                                <Editor value={data[index].description} onChange={(e) => HandleChange(index, "description", e.target.value)}>
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
                    ))
                }
            </div>

            { /* Buttons fields */}
            <div className="flex items-center justify-between my-3 text-gray-800">
                <div className=" space-x-3">

                    { /*  Add new form */}
                    <Button
                        onClick={HandleAddBtn}
                        className="rounded px-5 cursor-pointer" variant="outline">
                        Add New
                    </Button>

                    { /*  Remove Form  */}
                    <Button
                        onClick={HandleRemoveBtn}
                        className="rounded px-5 cursor-pointer" variant="outline">
                        Remove
                    </Button>
                </div>

                { /*  Save Button */}
                <div>
                    <Button
                        onClick={HandleSaveBtn}
                        className="rounded px-8 bg-indigo-700 text-white cursor-pointer">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Projects;