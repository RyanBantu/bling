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

    // 4D Flat Torus parameters (shadow of 4D torus)
    const R = 100; // Major radius
    const r = 40;  // Minor radius
    const numPointsU = 80; // Points around major circle
    const numPointsV = 30; // Points around minor circle
    
    // Rotation angles for 4D rotation (6 planes: XY, XZ, YZ, XW, YW, ZW)
    let rotationXY = 0;
    let rotationXZ = 0;
    let rotationYZ = 0;
    let rotationXW = 0;
    let rotationYW = 0;
    let rotationZW = 0;

    // Generate 4D flat torus point
    // Flat torus: circle in XY plane rotated around circle in ZW plane
    const getFlatTorus4D = (u, v) => {
      // Parametric equations for 4D flat torus
      const x = R * Math.cos(u);
      const y = R * Math.sin(u);
      const z = r * Math.cos(v);
      const w = r * Math.sin(v);
      return { x, y, z, w };
    };

    // 4D rotation functions for all 6 planes
    const rotate4D = (x, y, z, w, angles) => {
      let { x: x1, y: y1, z: z1, w: w1 } = { x, y, z, w };
      
      // XY plane rotation
      const cosXY = Math.cos(angles.xy);
      const sinXY = Math.sin(angles.xy);
      const x2 = x1 * cosXY - y1 * sinXY;
      const y2 = x1 * sinXY + y1 * cosXY;
      x1 = x2; y1 = y2;
      
      // XZ plane rotation
      const cosXZ = Math.cos(angles.xz);
      const sinXZ = Math.sin(angles.xz);
      const x3 = x1 * cosXZ - z1 * sinXZ;
      const z3 = x1 * sinXZ + z1 * cosXZ;
      x1 = x3; z1 = z3;
      
      // YZ plane rotation
      const cosYZ = Math.cos(angles.yz);
      const sinYZ = Math.sin(angles.yz);
      const y4 = y1 * cosYZ - z1 * sinYZ;
      const z4 = y1 * sinYZ + z1 * cosYZ;
      y1 = y4; z1 = z4;
      
      // XW plane rotation (4D rotation)
      const cosXW = Math.cos(angles.xw);
      const sinXW = Math.sin(angles.xw);
      const x5 = x1 * cosXW - w1 * sinXW;
      const w5 = x1 * sinXW + w1 * cosXW;
      x1 = x5; w1 = w5;
      
      // YW plane rotation (4D rotation)
      const cosYW = Math.cos(angles.yw);
      const sinYW = Math.sin(angles.yw);
      const y6 = y1 * cosYW - w1 * sinYW;
      const w6 = y1 * sinYW + w1 * cosYW;
      y1 = y6; w1 = w6;
      
      // ZW plane rotation (4D rotation)
      const cosZW = Math.cos(angles.zw);
      const sinZW = Math.sin(angles.zw);
      const z7 = z1 * cosZW - w1 * sinZW;
      const w7 = z1 * sinZW + w1 * cosZW;
      z1 = z7; w1 = w7;
      
      return { x: x1, y: y1, z: z1, w: w1 };
    };

    // Project 4D to 3D (drop W dimension to get shadow)
    const project4Dto3D = (x, y, z, w) => {
      // Simple projection: use W to add depth effect
      const depth = w * 0.5; // Scale W for depth
      return { x, y, z: z + depth };
    };

    // Project 3D to 2D canvas
    const project3Dto2D = (x, y, z) => {
      const scale = 2.5;
      const distance = 400;
      const fov = distance / (distance + z);
      return {
        x: canvas.width / 2 + x * fov * scale,
        y: canvas.height / 2 + y * fov * scale,
        size: Math.max(1.5, fov * 2.5),
        depth: z
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update rotation angles for smooth 4D rotation
      rotationXY += 0.005;
      rotationXZ += 0.003;
      rotationYZ += 0.004;
      rotationXW += 0.006; // 4D rotations
      rotationYW += 0.004;
      rotationZW += 0.005;

      const rotationAngles = {
        xy: rotationXY,
        xz: rotationXZ,
        yz: rotationYZ,
        xw: rotationXW,
        yw: rotationYW,
        zw: rotationZW
      };

      // Generate and draw points
      const points = [];
      for (let i = 0; i < numPointsU; i++) {
        const u = (i / numPointsU) * Math.PI * 2;
        for (let j = 0; j < numPointsV; j++) {
          const v = (j / numPointsV) * Math.PI * 2;
          
          // Get 4D flat torus point
          const point4D = getFlatTorus4D(u, v);
          
          // Apply 4D rotations
          const rotated4D = rotate4D(
            point4D.x, point4D.y, point4D.z, point4D.w,
            rotationAngles
          );
          
          // Project 4D to 3D (shadow)
          const point3D = project4Dto3D(
            rotated4D.x, rotated4D.y, rotated4D.z, rotated4D.w
          );
          
          // Project 3D to 2D canvas
          const projected = project3Dto2D(point3D.x, point3D.y, point3D.z);
          points.push(projected);
        }
      }

      // Sort points by depth for proper rendering
      points.sort((a, b) => b.depth - a.depth);

      // Draw points
      points.forEach(point => {
        if (point.x >= -50 && point.x <= canvas.width + 50 && 
            point.y >= -50 && point.y <= canvas.height + 50) {
          // Create gradient effect based on depth
          const alpha = Math.max(0.3, Math.min(0.9, 0.5 + point.depth / 200));
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`; // Purple dots with depth
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
