import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setPage, setValue } from '@/redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function PersonalInfo() {

    const dispatch = useDispatch();
    const { page } = useSelector((state) => state.data)

    const [data, setData] = useState({
        name: "",
        mobile: "",
        email: "",
        dob: "",
        address: "",
        gender: "",
        gitHub: "",
        photo: null,
    });

    // Handle form Input
    const onChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    // Handle Save Button
    const HandleSaveBtn = () => {
        if (
            !data.name ||
            !data.mobile ||
            !data.email ||
            !data.dob ||
            !data.address ||
            !data.gender ||
            !data.gitHub
        ) {
            return toast.error("All fields are required");
        }
        dispatch(setValue(data))
        toast.success("Personal Info saved success !")
        dispatch(setPage(page + 1))
    }

    return (
        <div>

            { /*  Heading */}
            <div>
                <h1 className="text-lg font-bold mb-3">Personal Information</h1>
            </div>

            {/* Name and email fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">

                { /* Full Name */}
                <div className="space-y-1.5">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        placeholder="Full Name"
                        value={data.name}
                        onChange={(e) => onChange("name", e.target.value)} />
                </div>

                { /* Email Id  */}
                <div className="space-y-1.5">
                    <Label htmlFor="email">Email ID</Label>
                    <Input
                        id="email"
                        placeholder="example@gmail.com"
                        value={data.email}
                        onChange={(e) => onChange("email", e.target.value)}
                    />
                </div>
            </div>

            {/* Mobile and gender fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 my-3">

                {  /*  Mobile Number  */}
                <div className="space-y-1.5">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                        id="mobile"
                        placeholder="+91 0000..000"
                        value={data.mobile}
                        onChange={(e) => onChange("mobile", e.target.value)}
                    />
                </div>

                {  /*  Gender */}
                <div className="space-y-1.5">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        value={data.gender}
                        onValueChange={(value) => onChange("gender", value)}
                    >
                        <SelectTrigger className="w-full" id="gender">
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* DOB and GitHub */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">

                { /*  GitHub */}
                <div className="space-y-1.5">
                    <Label htmlFor="gitHub">GitHub/Portfolio</Label>
                    <Input
                        id="gitHub"
                        placeholder="GitHub/Portfolio"
                        value={data.gitHub}
                        onChange={(e) => onChange("gitHub", e.target.value)}
                    />
                </div>

                { /*  DOB */}
                <div className="space-y-1.5">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                        id="dob"
                        type="date"
                        value={data.dob}
                        onChange={(e) => onChange("dob", e.target.value)}
                    />
                </div>
            </div>

            {/* Address and Photo */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 my-3">

                { /* Address  */}
                <div className="space-y-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        placeholder="Address"
                        value={data.address}
                        onChange={(e) => onChange("address", e.target.value)}
                    />
                </div>

                { /* Photo  */}
                <div className="space-y-1.5">
                    <Label htmlFor="photo">Photo</Label>
                    <Input
                        id="photo"
                        type="file"
                        onChange={(e) => onChange("photo", e.target.files[0])}
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end">
                <Button
                    onClick={HandleSaveBtn}
                    className="px-10 rounded cursor-pointer bg-indigo-700 text-white"
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default PersonalInfo;