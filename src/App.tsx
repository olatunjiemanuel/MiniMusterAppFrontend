import { useEffect, useState } from "react";
import { fetchPersonnel, addPerson, updatePersonStatus, type Person } from "./helper/api.ts";

export default function PersonnelManager() {
    const [personnel, setPersonnel] = useState<Person[]>([]);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        fetchPersonnel()
            .then(setPersonnel)
            .catch(console.error);
    }, []);

    async function handleAdd() {
        try {
            const newPerson = await addPerson({ name, role, status: "Checked Out" });
            setPersonnel([...personnel, newPerson]);
            setName("");
            setRole("");
        } catch (error) {
            console.error(error);
        }
    }

    async function handleToggleStatus(id: string, currentStatus: string) {
        const newStatus = currentStatus === "On Board" ? "Checked Out" : "On Board";
        try {
            const updated = await updatePersonStatus(id, newStatus);
            setPersonnel((prev) =>
                prev.map((p) => (p.id === id ? updated : p))
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Personnel Tracker</h2>

            <div>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <button onClick={handleAdd}>Add</button>
            </div>

            <ul>
                {personnel.map((p) => (
                    <li key={p.id}>
                        {p.name} ({p.role}) — {p.status}
                        <button onClick={() => handleToggleStatus(p.id!, p.status)}>
                            Toggle Status
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}