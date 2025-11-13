import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

function ThreeBackground() {
	const mountRef = useRef(null);
	const animationRef = useRef(null);

	useEffect(() => {
		const container = mountRef.current;
		if (!container) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		camera.position.z = 200;

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		// Particles
		const particlesCount = 800;
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(particlesCount * 3);
		const speeds = new Float32Array(particlesCount);
		for (let i = 0; i < particlesCount; i++) {
			positions[i * 3 + 0] = (Math.random() - 0.5) * 600;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
			speeds[i] = 0.2 + Math.random() * 0.6;
		}
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		// Create colorful particles with different colors
		const colors = [
			0x6366f1, // Indigo
			0x8b5cf6, // Purple
			0xec4899, // Pink
			0xf59e0b, // Amber
			0x22c55e, // Green
			0x3b82f6, // Blue
			0xf97316, // Orange
		];
		const colorArray = new Float32Array(particlesCount * 3);
		for (let i = 0; i < particlesCount; i++) {
			const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
			colorArray[i * 3] = color.r;
			colorArray[i * 3 + 1] = color.g;
			colorArray[i * 3 + 2] = color.b;
		}
		geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

		const material = new THREE.PointsMaterial({
			size: 3,
			sizeAttenuation: true,
			vertexColors: true,
			transparent: true,
			opacity: 0.6,
			blending: THREE.AdditiveBlending
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		const clock = new THREE.Clock();

		function animate() {
			const delta = clock.getDelta();
			const pos = geometry.getAttribute('position');
			for (let i = 0; i < particlesCount; i++) {
				let y = pos.getY(i);
				y -= speeds[i] * 10 * delta;
				if (y < -300) y = 300;
				pos.setY(i, y);
			}
			pos.needsUpdate = true;

			points.rotation.y += 0.02 * delta;
			renderer.render(scene, camera);
			animationRef.current = requestAnimationFrame(animate);
		}
		animate();

		const onResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', onResize);

		return () => {
			cancelAnimationFrame(animationRef.current);
			window.removeEventListener('resize', onResize);
			renderer.dispose();
			geometry.dispose();
			material.dispose();
			if (renderer.domElement && renderer.domElement.parentNode) {
				renderer.domElement.parentNode.removeChild(renderer.domElement);
			}
		};
	}, []);

	return <div className="three-bg" ref={mountRef} aria-hidden="true" />;
}

export default ThreeBackground;

