import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { setValue, resetPage } from '@/redux/slice'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
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

function Certifications() {

    const navigate = useNavigate()
    const Dispatch = useDispatch()
    const { value } = useSelector((state) => state.data)

    const [Certifications, setCertifications] = useState("");
    const [Achievements, setAchievements] = useState("")
    const [Languages, setLanguage] = useState("")

    const HandleSaveBtn = async () => {

        console.log(Certifications, Achievements, Languages)

        Dispatch(setValue({ ...value, Certifications, Achievements, Languages }))
        toast.success("Data saved success !")
        await navigate("/resume/format")
        Dispatch(resetPage())
    }

    return (
        <div>
            <div>
                <h1 className="font-bold">Certifications, Achievements & Languages</h1>
            </div>

            <div className="my-3 space-y-1.5">
                <Label>Languages</Label>
                <Input
                    value={Languages}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="ex- HINDI , ENGLISH"
                />
            </div>

            { /*  Certifications  */}
            <div className="space-y-1.5">
                <Label>Certifications</Label>
                <Editor value={Certifications} onChange={(e) => setCertifications(e.target.value)}>
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

            { /*  Achievements  */}
            <div className="my-3 space-y-1.5">
                <Label>Achievements</Label>
                <Editor value={Achievements} onChange={(e) => setAchievements(e.target.value)}>
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

            { /* Buttons */}
            <div className="flex items-center justify-end text-gray-800">
                <Button
                    onClick={HandleSaveBtn}
                    className="rounded px-8 bg-indigo-700 text-white cursor-pointer">
                    save
                </Button>
            </div>
        </div>
    )
}
export default Certifications;