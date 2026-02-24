import React, { useEffect, useRef } from 'react';

const TorusBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Torus parameters
    const R = 120; // Major radius
    const r = 50;  // Minor radius
    const numPointsU = 60; // Points around major circle
    const numPointsV = 20; // Points around minor circle
    let rotation = 0;

    // Generate points on torus
    const getTorusPoint = (u, v) => {
      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = (R + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v);
      return { x, y, z };
    };

    // Project 3D to 2D
    const project = (x, y, z) => {
      const scale = 200;
      const distance = 500;
      const fov = distance / (distance + z);
      return {
        x: canvas.width / 2 + x * fov * scale,
        y: canvas.height / 2 + y * fov * scale,
        size: fov * 2
      };
    };

    // Rotate point around Y axis
    const rotateY = (x, y, z, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos + z * sin,
        y: y,
        z: -x * sin + z * cos
      };
    };

    // Rotate point around X axis
    const rotateX = (x, y, z, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x,
        y: y * cos - z * sin,
        z: y * sin + z * cos
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      rotation += 0.01;

      // Generate and draw points
      const points = [];
      for (let i = 0; i < numPointsU; i++) {
        const u = (i / numPointsU) * Math.PI * 2;
        for (let j = 0; j < numPointsV; j++) {
          const v = (j / numPointsV) * Math.PI * 2;
          const point = getTorusPoint(u, v);
          
          // Rotate around Y and X axes
          let rotated = rotateY(point.x, point.y, point.z, rotation);
          rotated = rotateX(rotated.x, rotated.y, rotated.z, rotation * 0.7);
          
          const projected = project(rotated.x, rotated.y, rotated.z);
          points.push(projected);
        }
      }

      // Draw points
      points.forEach(point => {
        if (point.x >= 0 && point.x <= canvas.width && point.y >= 0 && point.y <= canvas.height) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, Math.max(2, point.size), 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(147, 51, 234, 0.8)'; // Purple dots - more visible
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default TorusBackground;
