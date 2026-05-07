import { useEffect } from "react";
import API from "../services/api";

export default function Test() {

    useEffect(() => {
        API.get("/admin/users/all")
            .then(res => {
                console.log("USERS DATA:", res.data);
            })
            .catch(err => {
                console.log("ERROR:", err);
            });
    }, []);

    return (
        <div>
            <h1>Test Page</h1>
            <p>Check console for backend data</p>
        </div>
    );
}