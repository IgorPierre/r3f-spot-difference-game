export function enableModelShadows(root) {
    if (!root) return;
    root.traverse((obj) => {
        if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
        }
    });
}
