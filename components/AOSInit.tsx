"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false, // animation should happen every time you scroll up/down? User said "muncul satu-satu", implied usually once. Let's stick to true for cleaner look, or false if they want re-trigger. Let's use false for now as it's more dynamic.
            easing: "ease-out-cubic",
        });
    }, []);

    return null;
}
