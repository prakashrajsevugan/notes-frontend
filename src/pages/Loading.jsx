import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import "../styles/loading.css";
import { useAuth } from "../context/AuthContext";
import { Book } from "../components/Book";

function BookScene() {
    const groupRef = useRef(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += delta * 0.35;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]} scale={0.16}>
            <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.28}>
                <Book />
            </Float>
        </group>
    );
}

export default function Loading() {
    const barRef = useRef(null);
    const [percent, setPercent] = useState(0);
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [finished, setFinished] = useState(false);
    const [showLoadingUI, setShowLoadingUI] = useState(false);
    const uiDelay = useMemo(() => 260, []);

    const getStatusText = (pct) => {
        if (pct < 20) return "Initializing secure session handshake...";
        if (pct < 45) return "Connecting with Clerk authorization servers...";
        if (pct < 65) return "Opening cloud PostgreSQL connection pools...";
        if (pct < 85) return "Hydrating notes database schema & rules...";
        return "Launching creative glassmorphic workspace...";
    };

    useEffect(() => {
        const obj = { value: 0 };

        const uiTimer = setTimeout(() => {
            setShowLoadingUI(true);
        }, uiDelay);

        const tween = gsap.to(obj, {
            value: 100,
            duration: 5,
            ease: "power2.out",
            onUpdate: () => {
                const v = Math.round(obj.value);
                setPercent(v);
                if (barRef.current) {
                    barRef.current.style.width = v + "%";
                }
            },
            onComplete: () => {
                setFinished(true);
            }
        });

        return () => {
            clearTimeout(uiTimer);
            tween.kill();
        };
    }, [navigate, uiDelay]);

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
            <div className="loading-canvas-wrap" aria-hidden="true">
                <Canvas camera={{ position: [0, 2, 18], fov: 40 }}>
                    <color attach="background" args={["#d0ded4"]} />
                    <ambientLight intensity={1.1} />
                    <directionalLight intensity={2.2} position={[6, 8, 6]} />
                    <spotLight intensity={1.2} position={[-7, 9, 8]} angle={0.45} penumbra={0.4} />

                  <Suspense fallback={null}>
                      <BookScene />
                  </Suspense>

                  <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      autoRotate
                      autoRotateSpeed={0.6}
                      maxPolarAngle={Math.PI / 1.9}
                      minPolarAngle={Math.PI / 2.8}
                  />
              </Canvas>
          </div>

          <div className={`loading-overlay ${showLoadingUI ? "show" : ""}`}>
              <div className="loading-hud-header">
                  <div className="hud-pulse-container">
                      <div className="hud-radar-circle"></div>
                      <div className="hud-radar-dot"></div>
                  </div>
                  <h2>Preparing Workspace</h2>
              </div>
              
              <p className="loading-status-text">{getStatusText(percent)}</p>
              
              <div className="progress-wrap">
                  <div className="progress-bar" ref={barRef}></div>
              </div>
              
              <div className="progress-info-row">
                  <span className="progress-loading-indicator">Active Connection</span>
                  <span className="progress-text">{percent}%</span>
              </div>
          </div>
      </div>
  );
}

