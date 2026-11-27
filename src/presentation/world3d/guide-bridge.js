// Puente del modo guía para "Otra" en el mundo 3D (005/FR-006): da al panel de guía (screens/guide.js)
// la misma forma que el flujo de las puertas (`getGuidePrompt`, `submitGuideAnswer`), pero con la
// pregunta de la ficha de "Otra" y la lectura de zone-flow. No conoce la pantalla.

/**
 * @param {object} options
 * @param {{ guidePrompt?: (kind: string, request: object) => ({ ok: true, text: string } | { ok: false, reason: string }) }} options.ai
 * @param {{ readOtherGuideAnswer: (zoneId: string, text: string, raw: string) => object }} options.zoneFlow
 * @param {string} options.zoneId
 * @param {string} options.ownText Lo que escribió el jugador en "Otra".
 * @param {{ kind: string, request: object }} options.guide Lo que devolvió `explainOtherOption`.
 * @param {(sheet: object) => void} [options.onSheet] Se leyó una ficha válida.
 */
export function createOtherGuideBridge({ ai, zoneFlow, zoneId, ownText, guide, onSheet = () => {} }) {
  return {
    async getGuidePrompt() {
      if (typeof ai?.guidePrompt !== 'function') return { ok: false, reason: 'failed' };
      try {
        return ai.guidePrompt(guide.kind, guide.request);
      } catch {
        return { ok: false, reason: 'failed' };
      }
    },
    async submitGuideAnswer(_id, rawText) {
      const result = zoneFlow.readOtherGuideAnswer(zoneId, ownText, rawText);
      if (!result.ok) return result;
      onSheet(result.sheet);
      return { ok: true, options: result.sheet };
    },
  };
}
