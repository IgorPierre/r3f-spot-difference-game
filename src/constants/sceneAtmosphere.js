export const SCENE_ATMOSPHERE = {
    WheatFarm: {
        background: '#87b8e8',
        shellGradient: 'linear-gradient(to top, #d5e8f8 0%, #4a92d4 55%, #87b8e8 100%)',
        envPreset: 'park',
        envIntensity: 0.65,
        hemisphere: ['#d4ecff', '#3d3530', 0.42],
        sunPosition: [12, 22, 14],
        sunColor: '#ffffff',
        sunIntensity: 1.9,
        ambientIntensity: 0.18,
    },
    WesternDiorama: {
        background: '#d8e2ec',
        shellGradient:
            'linear-gradient(to top, #f0a898 0%, #f2eadc 22%, #f5f0e6 42%, #dce8f4 68%, #ffd8c8 100%)',
        envPreset: 'dawn',
        envIntensity: 0.55,
        hemisphere: ['#eef4fc', '#d4c4b0', 0.5],
        sunPosition: [14, 22, 12],
        sunColor: '#fff5e8',
        sunIntensity: 1.55,
        ambientIntensity: 0.2,
    },
    LightHouse: {
        background: '#b0c8f0',
        shellGradient:
            'linear-gradient(to top, #f8fbff 0%, #a8c8f0 30%, #c4b8e8 58%, #f0a898 82%, #ffd8c8 100%)',
        envPreset: 'sunset',
        envIntensity: 0.6,
        hemisphere: ['#e8f2ff', '#d8a090', 0.52],
        sunPosition: [-18, 16, -16],
        sunColor: '#ffd8c8',
        sunIntensity: 1.72,
        ambientIntensity: 0.24,
    },
};

export function getAtmosphere(sceneId) {
    return SCENE_ATMOSPHERE[sceneId] ?? SCENE_ATMOSPHERE.WheatFarm;
}
