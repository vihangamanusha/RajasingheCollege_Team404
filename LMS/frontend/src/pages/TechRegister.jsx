import { useState } from "react";

export default function TechRegister() {

    // =========================
    // FORM STATE
    // =========================
    const [form, setForm] = useState({
        userId: "",
        username: "",
        email: "",
        password: ""
    });

    // MESSAGE STATE
    const [message, setMessage] = useState("");

    // =========================
    // HANDLE INPUT CHANGES
    // =========================
    const handleChange = (e) => {

        setForm({
            ...form,
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
            // SEND REQUEST TO BACKEND
            // =========================
            const res = await fetch(
                "http://localhost:8080/admin/users/create",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        // SEND JWT TOKEN
                        Authorization:
                            "Bearer " + localStorage.getItem("token")
                    },

                    body: JSON.stringify({

                        userId: form.userId,
                        username: form.username,
                        email: form.email,
                        password: form.password,

                        // IMPORTANT
                        role: "ROLE_TECHNICAL_OFFICER"
                    })
                }
            );

            const data = await res.text();

            setMessage(data);

        } catch (error) {

            console.log(error);

            setMessage("Technical Officer registration failed");
        }
    };

    return (
        <div>

            <h2>Register Technical Officer</h2>

            <form onSubmit={handleSubmit}>

                {/* USER ID */}
                <input
                    name="userId"
                    placeholder="User ID"
                    onChange={handleChange}
                />

                <br /><br />

                {/* USERNAME */}
                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <br /><br />

                {/* EMAIL */}
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                {/* PASSWORD */}
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                {/* SUBMIT BUTTON */}
                <button>
                    Create Tech User
                </button>

            </form>

            {/* MESSAGE */}
            <p>{message}</p>

        </div>
    );
}