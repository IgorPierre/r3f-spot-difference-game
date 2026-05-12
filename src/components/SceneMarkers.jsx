import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useStore } from '../store/store.js';

const noopRaycast = () => {};

function MarkerCross({ position }) {
    const p = position;
    const pos = p instanceof Array ? p : [p.x, p.y, p.z];

    return (
        <group position={pos}>
            {/* Caixas grossas + sem depth test: sempre visível em cima da geometria */}
            <mesh rotation={[0, 0, Math.PI / 4]} raycast={noopRaycast} renderOrder={1000}>
                <boxGeometry args={[0.55, 0.09, 0.09]} />
                <meshBasicMaterial
                    color="#ef4444"
                    transparent
                    opacity={0.98}
                    depthTest={false}
                    depthWrite={false}
                    toneMapped={false}
                />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]} raycast={noopRaycast} renderOrder={1000}>
                <boxGeometry args={[0.55, 0.09, 0.09]} />
                <meshBasicMaterial
                    color="#ef4444"
                    transparent
                    opacity={0.98}
                    depthTest={false}
                    depthWrite={false}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}

function tryPlaceMarker(ev, camera, scene, raycaster, ndc, gl) {
    const { gameStarted, markers, addMarker } = useStore.getState();
    if (!gameStarted || markers.length >= 3) return false;

    const rect = gl.domElement.getBoundingClientRect();
    ndc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObject(scene, true);
    if (!hits.length) return false;

    const hit = hits[0];
    let push = null;
    if (hit.normal) {
        push = hit.normal.clone();
    } else if (hit.face?.normal) {
        push = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
    }
    if (push) {
        point.addScaledVector(push, 0.08);
    } else {
        const toCam = camera.position.clone().sub(point).normalize();
        point.addScaledVector(toCam, 0.06);
    }

    addMarker(point);
    return true;
}

/**
 * Colocar marca: Alt ou Shift + clique esquerdo, ou duplo clique (sem modificador).
 * Duplo clique pode conflitar com hábitos de câmera — prefira Shift+clique.
 */
export function ScenePointerPlacer() {
    const { camera, gl, scene } = useThree();
    const raycaster = useRef(new THREE.Raycaster());
    const ndc = useRef(new THREE.Vector2());

    useEffect(() => {
        const el = gl.domElement;

        const onPointerDown = (ev) => {
            if (ev.button !== 0) return;
            const mod = ev.altKey || ev.shiftKey;
            if (!mod) return;

            if (tryPlaceMarker(ev, camera, scene, raycaster.current, ndc.current, gl)) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        };

        const onDblClick = (ev) => {
            if (ev.button !== 0) return;
            if (tryPlaceMarker(ev, camera, scene, raycaster.current, ndc.current, gl)) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        };

        el.addEventListener('pointerdown', onPointerDown, true);
        el.addEventListener('dblclick', onDblClick, true);
        return () => {
            el.removeEventListener('pointerdown', onPointerDown, true);
            el.removeEventListener('dblclick', onDblClick, true);
        };
    }, [camera, gl, scene]);

    return null;
}

export function MarkersVisual() {
    const markers = useStore((s) => s.markers);

    return markers.map((pos, i) => <MarkerCross key={`${i}-${pos.join(',')}`} position={pos} />);
}
