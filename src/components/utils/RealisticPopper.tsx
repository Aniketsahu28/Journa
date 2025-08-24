"use client";

import { useEffect, useRef } from "react";
import confetti, { CreateTypes } from "canvas-confetti";

export default function RealisticConfetti({ trigger }: { trigger: boolean }) {
  const refInstance = useRef<CreateTypes | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    refInstance.current = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  useEffect(() => {
    if (!trigger || !refInstance.current) return;

    const myConfetti = refInstance.current;
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: any) {
      myConfetti?.({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [trigger]);

  return null;
}
