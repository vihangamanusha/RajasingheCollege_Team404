export default function StudentRegister() {

    return (
        <div>

            {/* =========================
                STUDENT REGISTRATION FORM
            ========================= */}
            <h1>Register Student</h1>

            <form>

                <input placeholder="Username" />
                <br /><br />

                <input placeholder="Email" />
                <br /><br />

                <input placeholder="Password" type="password" />
                <br /><br />

                <button type="submit">
                    Register Student
                </button>

            </form>

        </div>
    );
}