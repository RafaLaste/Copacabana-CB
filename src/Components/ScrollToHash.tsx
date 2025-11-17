import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
    const location = useLocation();
    
    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const el = document.querySelector(location.hash);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }, 0);
        }
    }, [location.hash, location.pathname, location.key]);
    
    return null;
}