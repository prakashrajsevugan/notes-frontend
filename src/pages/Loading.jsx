import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "../styles/loading.css";
import { useAuth } from "../context/AuthContext";

export default function Loading() {
    const barRef = useRef(null);
    const [percent, setPercent] = useState(0);
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const obj = { value: 0 };

        const tween = gsap.to(obj, {
            value: 100,
            duration: 3.2,
            ease: "power2.out",
            onUpdate: () => {
                const v = Math.round(obj.value);
                setPercent(v);
                if (barRef.current) {
                    barRef.current.style.width = v + "%";
                }
            },
            onComplete: () => {
                // mark finished; navigation handled in separate effect
                setFinished(true);
            }
        });

        return () => tween.kill();
    }, [navigate]);

    useEffect(() => {
        if (!finished) return;

        // if auth status still loading, wait until it resolves
        if (authLoading) return;

        if (user) {
            navigate("/dashboard");
        } else {
            navigate("/landing");
        }
    }, [finished, authLoading, user, navigate]);

    return (
        <div className="loading-root">
            <div className="loading-card">
                <h2>Preparing your dashboard</h2>
                <div className="progress-wrap">
                    <div className="progress-bar" ref={barRef}></div>
                </div>
                <div className="progress-text">{percent}%</div>
            </div>
        </div>
    );
}
