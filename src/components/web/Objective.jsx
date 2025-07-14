import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { setPage, setValue, setLoading } from '@/redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

//  Import Gemeni Ai Here
import GeminiAi from "../../gemini/GeminiAi.js"

function Objective() {

    const dispatch = useDispatch()
    const { page, value, loading } = useSelector((state) => state.data)

    const [open, setOpen] = useState(false)
    const [data, setData] = useState({
        experience: "",
        tech: "",
        summery: ""
    })

    // Handle Form input
    const onChange = (field, value) => {
        setData((pre) => ({
            ...pre,
            [field]: value
        }))
    }

    // Handle search by ai Button
    const HandleSearchBtn = async () => {
        setOpen(false)
        dispatch(setLoading(true))
        setData((pre) => ({
            ...pre,
            experience: "",
            tech: "",
        }))
        try {
            const result = await GeminiAi(`Write a career objective for ${data.tech} and for ${data.experience == 0 ? "Fresher" : data.experience + " years experience"} in at least 25 words. Return only one string, not inside an array or object"`)
            setData((prev) => ({
                ...prev,
                summery: result
            }))
        } catch (error) {
            console.log("Gemini Error", error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    // Handle Save Button
    const HandleSaveBtn = () => {
        if (!data.summery) {
            return toast.error("summery field is required")
        }
        dispatch(setValue({ ...value, summery: data.summery }));
        toast.success("Summery saved success !")
        dispatch(setPage(page + 1))
    }

    return (
        <div>

            { /* Heading */}
            <div>
                <h1 className="text-lg font-bold">Objective</h1>
            </div>

            <div>

                { /* Pop up for experience and tech  */}
                <div className="flex items-center justify-end my-2">
                    <Button
                        disabled={loading}
                        onClick={() => setOpen(true)}
                        variant="outline"
                        className=" cursor-pointer rounded text-gray-800">
                        {loading ? "Loading..." : (
                            <div>
                                Generate by Ai
                                <i className="ri-quill-pen-ai-fill text-xl"></i>
                            </div>
                        )}
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger />
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Work Profile and Experience</DialogTitle>
                                <DialogDescription asChild>
                                    <div
                                        className="flex items-center gap-3">

                                        { /*  Tech  */}
                                        <Input
                                            value={data.tech}
                                            onChange={(e) => onChange("tech", e.target.value)}
                                            placeholder="ex- python,frontend,java,backend" />

                                        { /*  experience  */}
                                        <Input
                                            value={data.experience}
                                            onChange={(e) => onChange("experience", e.target.value)}
                                            placeholder="experience" />

                                        { /*  Search Button  */}
                                        <Button
                                            onClick={HandleSearchBtn}
                                            variant="outline" className="rounded px-5 cursor-pointer">
                                            Search
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                { /*  Text Area */}
                <div>
                    <Textarea
                        value={data.summery}
                        onChange={(e) => onChange("summery", e.target.value)}
                        placeholder="Summery"
                    />
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end my-3">
                    <Button
                        disabled={loading}
                        onClick={HandleSaveBtn}
                        className="px-10 rounded cursor-pointer bg-indigo-700 text-white"
                    >
                        Save
                    </Button>
                </div>
            </div >
        </div >
    )
}
export default Objective;