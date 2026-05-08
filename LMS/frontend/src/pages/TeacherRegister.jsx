import { useState } from "react";
import API from "../services/api";

export default function TeacherRegister() {

    // =========================
    // FORM STATE
    // =========================
    const [formData, setFormData] = useState({
        userId: "",
        username: "",
        password: "",
        email: "",
        subRole: ""
    });

    const [message, setMessage] = useState("");

    // =========================
    // HANDLE INPUT CHANGE
    // =========================
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // =========================
    // SUBMIT FORM
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // =========================
            // SEND DATA TO BACKEND
            // =========================
            const res = await API.post("/admin/users/create", {

                userId: formData.userId,
                username: formData.username,
                password: formData.password,
                email: formData.email,

                // IMPORTANT
                role: "ROLE_TEACHER",

                subRole: formData.subRole
            });

            setMessage(res.data);

        } catch (error) {

            console.log(error);

            setMessage("Teacher registration failed");
        }
    };

    return (
        <div>

            <h2>Teacher Registration</h2>

            <form onSubmit={handleSubmit}>

                {/* USER ID */}
                <input
                    type="text"
                    name="userId"
                    placeholder="Teacher ID"
                    onChange={handleChange}
                />

                <br /><br />

                {/* USERNAME */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <br /><br />

                {/* PASSWORD */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                {/* EMAIL */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                {/* SUB ROLE */}
                <select
                    name="subRole"
                    onChange={handleChange}
                >
                    <option value="">Select Sub Role</option>
                    <option value="SECTION_HEAD">
                        Section Head
                    </option>

                    <option value="SUBJECT_TEACHER">
                        Subject Teacher
                    </option>

                    <option value="CLASS_TEACHER">
                        Class Teacher
                    </option>
                </select>

                <br /><br />

                <button type="submit">
                    Register Teacher
                </button>

            </form>

            <p>{message}</p>

        </div>
    );
}