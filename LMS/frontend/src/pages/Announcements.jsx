import { useEffect, useState } from "react";
import { getAnnouncements, createAnnouncement } from "../services/api";

export default function Announcement() {

    const [list, setList] = useState([]);
    const [form, setForm] = useState({
        title: "",
        content: ""
    });

    // =========================
    // LOAD ANNOUNCEMENTS
    // =========================
    const loadData = async () => {
        const res = await getAnnouncements();
        setList(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // =========================
    // SUBMIT ANNOUNCEMENT
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        await createAnnouncement(form);

        setForm({ title: "", content: "" });

        // reload list (new one appears on top from backend)
        loadData();
    };

    return (
        <div>

            <h2>Announcements</h2>

            {/* =========================
                CREATE FORM
            ========================= */}
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                />
                <br /><br />

                <textarea
                    name="content"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange}
                />
                <br /><br />

                <button>Create Announcement</button>
            </form>

            <hr />

            {/* =========================
                LIST VIEW
            ========================= */}
            {list.map((a) => (
                <div key={a.announcementId} style={{
                    padding: "10px",
                    marginBottom: "10px",
                    background: "#eee"
                }}>
                    <h3>{a.title}</h3>
                    <p>{a.content}</p>
                    <small>{a.createdDate}</small>
                </div>
            ))}

        </div>
    );
}