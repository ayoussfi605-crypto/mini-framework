// Framework Client-Side Router (Hash-based)

import h from "../dom/h";

export function createRouter(routes = {}) {
// Get current route path from URL hash (e.g. "#/active" -> "/active")
    function getPath(){
        const hash = window.location.hash.slice(1); // remove '#'
        return hash || '/'; // Default route if hash is empty
    }
}