export default function TeacherRegister() {

    return (
        <div>

            {/* =========================
                TEACHER REGISTRATION FORM
            ========================= */}
            <h1>Register Teacher</h1>

            <form>

                <input placeholder="Username" />
                <br /><br />

                <input placeholder="Email" />
                <br /><br />

                {/* Sub Role (IMPORTANT for LMS system) */}
                <select>
                    <option value="">Select Subject / Role</option>
                    <option>Math Teacher</option>
                    <option>Science Teacher</option>
                    <option>English Teacher</option>
                </select>

                <br /><br />

                <input placeholder="Password" type="password" />
                <br /><br />

                <button type="submit">
                    Register Teacher
                </button>

            </form>

        </div>
    );
}