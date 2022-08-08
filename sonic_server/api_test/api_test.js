import fetch from "node-fetch";

// NOTE: Always append slash at end of API endpoind (TODO)
try {
    const token = await fetch("http://localhost:8000/api-token-auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "pass" }),
    }).then((response) => response.json());
    console.log(token);
} catch (e) {
    console.error(e);
}
