import { useEffect, useState } from "react";
import { getAnnouncements, createAnnouncement } from "../services/api";
import "./Announcements.css";

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
        <div className="announcement-container">
            <div className="page-header">
                <div className="header-text">
                    <p className="page-org">Rajasinghe Central College</p>
                    <h2>Announcements & Notices</h2>
                    <p>Manage school-wide announcements for all relevant audiences.</p>
                </div>
            </div>

            <div className="announcement-actions">
                <form className="announcement-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            className="announcement-input"
                            placeholder="Enter announcement title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            className="announcement-textarea"
                            placeholder="Write announcement content"
                            value={form.content}
                            onChange={handleChange}
                            rows={6}
                            required
                        />
                    </div>

                    <button type="submit" className="btn primary">Create Announcement</button>
                </form>
            </div>

            <div className="announcement-list">
                {list.length === 0 ? (
                    <div className="empty-state">
                        No announcements yet. Create one to share updates with the school.
                    </div>
                ) : (
                    list.map((a) => (
                        <div key={a.announcementId} className="announcement-card">
                            <div className="card-content">
                                <div className="card-header">
                                    <div>
                                        <h3 className="card-title">{a.title}</h3>
                                        <p className="card-desc">{a.content}</p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <span className="footer-item">Posted on {a.createdDate}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}