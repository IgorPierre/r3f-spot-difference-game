/** Posições mundo dos erros — atualizado nos useFrame das cenas (sem re-render a 60fps). */
const anchors = Object.create(null);

export function writeWorldAnchor(id, v) {
    anchors[id] = [v.x, v.y, v.z];
}

export function clearWorldAnchors() {
    for (const k of Object.keys(anchors)) delete anchors[k];
}

export function getWorldAnchors() {
    return anchors;
}
