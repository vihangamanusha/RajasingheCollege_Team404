import { useState } from "react";

export default function TeacherRegister() {

    const [form, setForm] = useState({
        userId: "",
        username: "",
        email: "",
        password: "",
        subRole: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/admin/users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                ...form,
                role: "TEACHER"
            })
        });

        const data = await res.text();
        setMessage(data);
    };

    return (
        <div>
            <h2>Register Teacher</h2>

            <form onSubmit={handleSubmit}>

                <input name="userId" placeholder="User ID" onChange={handleChange} />
                <br /><br />

                <input name="username" placeholder="Username" onChange={handleChange} />
                <br /><br />

                <input name="email" placeholder="Email" onChange={handleChange} />
                <br /><br />

                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <br /><br />

                <input name="subRole" placeholder="Subject (Math, Science...)" onChange={handleChange} />
                <br /><br />

                <button>Create Teacher</button>
            </form>

            <p>{message}</p>
        </div>
    );
}