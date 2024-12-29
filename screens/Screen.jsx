"use client";
import React, { useState, useEffect } from "react";
import Checkpoint from "@/components/Checkpoint";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Screen() {
  const [positions, setPositions] = useState({
    circle1: { x: 100, y: 450 },
    circle2: { x: 450, y: 200 },
    circle3: { x: 800, y: 200 },
    circle4: { x: 1100, y: 200 },
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    const updatePos = () => {
      if (window === undefined) {
        return;
      }
      const screenSize = window.innerWidth;
      console.log(screenSize);

      setPositions({
        circle1: { x: screenSize > 1400 ? 200 : screenSize / 14, y: 450 },
        circle2: { x: screenSize > 1400 ? 450 : screenSize / 4, y: 200 },
        circle3: { x: screenSize > 1400 ? 800 : screenSize / 2, y: 450 },
        circle4: { x: screenSize > 1400 ? 1100 : screenSize / 1.5, y: 200 },
      });
    };
    updatePos();
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("resize", updatePos);
    };
  }, []);

  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e, circle) => {
    setDragging(circle);
    setOffset({
      x: e.clientX - positions[circle].x,
      y: e.clientY - positions[circle].y,
    });
  };

  const onTouchStart = (e, circle) => {
    e.preventDefault();
    setDragging(circle);
    setOffset({
      x: e.touches[0].clientX - positions[circle].x,
      y: e.touches[0].clientY - positions[circle].y,
    });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;

    setPositions((prevPositions) => ({
      ...prevPositions,
      [dragging]: {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      },
    }));
  };

  const onTouchMove = (e) => {
    if (!dragging) return;

    setPositions((prevPositions) => ({
      ...prevPositions,
      [dragging]: {
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      },
    }));
  };

  const onMouseUp = () => {
    setDragging(null);
  };

  const onTouchEnd = () => {
    setDragging(null);
  };

  const drawLine = (start, end) => {
    const startX = positions[start].x + 100;
    const startY = positions[start].y + 100;
    const endX = positions[end].x + 100;
    const endY = positions[end].y + 100;

    const controlX = (startX + endX) / 2;
    const controlY = Math.max(startY, endY) - 150;

    return (
      <path
        d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
        stroke="#9BBDCF"
        strokeDasharray="20,20"
        strokeWidth="1"
        fill="transparent"
      />
    );
  };

  return (
    <div
      className="bg-neutral-100"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <svg className="svg-lines" data-aos="fade-in">
        {drawLine("circle1", "circle2")}
        {drawLine("circle2", "circle3")}
        {drawLine("circle3", "circle4")}
      </svg>

      <Checkpoint
        style={{
          left: `${positions.circle1.x}px`,
          top: `${positions.circle1.y}px`,
        }}
        onMouseDown={(e) => onMouseDown(e, "circle1")}
        onTouchStart={(e) => onTouchStart(e, "circle1")}
        imageUrl={`/assets/goal-2.svg`}
        stepNumber={1}
        stepDescription={`Set your goal`}
      />
      <Checkpoint
        style={{
          left: `${positions.circle2.x}px`,
          top: `${positions.circle2.y}px`,
        }}
        onMouseDown={(e) => onMouseDown(e, "circle2")}
        onTouchStart={(e) => onTouchStart(e, "circle2")}
        imageUrl={`/assets/add-friend-2.svg`}
        stepNumber={2}
        key={2}
        stepDescription={`Create or Join Group`}
      />
      <Checkpoint
        style={{
          left: `${positions.circle3.x}px`,
          top: `${positions.circle3.y}px`,
        }}
        onMouseDown={(e) => onMouseDown(e, "circle3")}
        onTouchStart={(e) => onTouchStart(e, "circle3")}
        imageUrl={`/assets/pay-per-click-1.svg`}
        stepNumber={3}
        key={3}
        stepDescription={`Pay amount on time`}
      />
      <Checkpoint
        style={{
          left: `${positions.circle4.x}px`,
          top: `${positions.circle4.y}px`,
        }}
        onMouseDown={(e) => onMouseDown(e, "circle4")}
        onTouchStart={(e) => onTouchStart(e, "circle4")}
        imageUrl={`/assets/gift-card-1.svg`}
        stepNumber={4}
        key={4}
        stepDescription={`Earn Rewards`}
      />
    </div>
  );
}
