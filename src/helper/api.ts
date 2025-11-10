// api.ts

const API_BASE = "http://localhost:5186/api";

export interface Person {
    id?: string;
    name: string;
    role: string;
    status: string;
}

// GET all personnel
export async function fetchPersonnel(): Promise<Person[]> {
    const res = await fetch(`${API_BASE}/personnel`);
    if (!res.ok) throw new Error("Failed to fetch personnel");
    return res.json();
}

// POST new person
export async function addPerson(person: Omit<Person, "id">): Promise<Person> {
    const res = await fetch(`${API_BASE}/personnel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
    });
    if (!res.ok) throw new Error("Failed to add person");
    return res.json();
}

// PUT update person status
export async function updatePersonStatus(id: string, status: string): Promise<Person> {
    const res = await fetch(`${API_BASE}/personnel/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
}