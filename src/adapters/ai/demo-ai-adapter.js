// IA de demostración (T021): respuestas preparadas para desarrollo, pruebas y modo de demostración.
// Cumple AiPort (contracts/puertos.md, sección 1). Nunca lanza.
// Puede simular una IA no disponible, ocupada, fallida o lenta, y el modo guía.

import { AI_MODES, AI_REASONS } from '../../application/ports.js';
import { guidePrompt, readGuideAnswer } from './guide.js';

/** Banco de ejemplo. Son textos de demostración, no el contenido del Mundo 1 (T067). */
const BANK = [
  { text: 'Cocina casera rápida para gente que vive en la ciudad', pros: 'Es un tema cotidiano y fácil de mostrar.', risks: 'Hay muchos creadores de cocina; hará falta un estilo propio.', label: 'Cocina rápida' },
  { text: 'Plantas y mini huertos en balcones pequeños', pros: 'Es visual y tranquilo, bueno para principiantes.', risks: 'Las plantas crecen despacio; cuesta tener novedades seguidas.', label: 'Plantas en casa' },
  { text: 'Escapadas de un día cerca de la ciudad', pros: 'Da mucho material variado.', risks: 'Necesita moverse y puede costar dinero.', label: 'Escapadas' },
  { text: 'Música para estudiar y concentrarse', pros: 'Mucha gente busca este tipo de contenido.', risks: 'Es difícil diferenciarse sin una voz propia.', label: 'Música para estudiar' },
  { text: 'Deporte en casa sin material', pros: 'Útil y fácil de seguir.', risks: 'Hay que cuidar no dar consejos de salud sin base.', label: 'Deporte en casa' },
  { text: 'Tecnología explicada para principiantes', pros: 'Resuelve dudas reales.', risks: 'Cambia rápido; exige estar al día.', label: 'Tecnología fácil' },
];

const DEFAULT_REASON = 'Encaja con tus intereses y con lo que ya decidiste.';

function failure(reason) {
  return { ok: false, reason };
}

function wait(ms, signal) {
  return new Promise((resolve) => {
    if (signal?.aborted) return resolve(false);
    const timer = setTimeout(() => resolve(true), ms);
    signal?.addEventListener('abort', () => { clearTimeout(timer); resolve(false); }, { once: true });
  });
}

function pickOptions(request) {
  const exclude = new Set(request.exclude ?? []);
  const wanted = request.extrasWanted ?? [];
  const source = request.fixedChoices?.values?.length
    ? request.fixedChoices.values.map((value) => ({ text: value, pros: `Ventaja de ejemplo de «${value}».`, risks: `Riesgo de ejemplo de «${value}».`, label: value }))
    : BANK;
  let available = source.filter((option) => !exclude.has(option.text));
  if (available.length === 0 && !request.fixedChoices) {
    // El banco se agotó: se numeran variantes para poder seguir pidiendo (002, caso límite).
    const round = Math.floor(exclude.size / BANK.length) + 1;
    available = BANK.map((option) => ({ ...option, text: `${option.text} (variante ${round})` }))
      .filter((option) => !exclude.has(option.text));
  }
  return available.slice(0, 3).map((option, index) => ({
    text: option.text,
    pros: option.pros,
    risks: option.risks,
    recommended: index === 0,
    ...(wanted.includes('publicLabel') ? { extras: { publicLabel: option.label } } : {}),
  }));
}

/**
 * @param {object} [options]
 * @param {'ok'|'unavailable'|'busy'|'failed'|'slow'} [options.behavior]
 * @param {'demo'|'guide'} [options.mode] `guide` simula una cuenta sin IA en la página (005/FR-006).
 * @param {number} [options.delayMs] Espera simulada; con `slow` vale 3000 ms si no se indica.
 * @returns {import('../../application/ports.js').AiPort}
 */
export function createDemoAiAdapter({ behavior = 'ok', mode = AI_MODES.DEMO, delayMs } = {}) {
  const delay = delayMs ?? (behavior === 'slow' ? 3000 : 0);

  /** Ejecuta una operación con el comportamiento simulado; convierte cualquier fallo en un motivo. */
  async function run(signal, produce) {
    try {
      if (behavior === 'unavailable' || behavior === 'busy' || behavior === 'failed') return failure(behavior);
      if (delay > 0 && !(await wait(delay, signal))) return failure(AI_REASONS.CANCELLED);
      if (signal?.aborted) return failure(AI_REASONS.CANCELLED);
      return produce();
    } catch {
      return failure(AI_REASONS.FAILED);
    }
  }

  return {
    mode,

    proposeOptions(request, { signal } = {}) {
      return run(signal, () => {
        const options = pickOptions(request);
        return options.length > 0 ? { ok: true, options } : failure(AI_REASONS.FAILED);
      });
    },

    commentOnAnswer(request, { signal } = {}) {
      return run(signal, () => {
        const answer = String(request?.answer ?? '');
        const comment = answer.trim().length < 15
          ? 'Es un buen comienzo. Si añades a quién va dirigido, será más fácil decidir lo siguiente.'
          : null;
        return { ok: true, comment };
      });
    },

    recommend(request, { signal } = {}) {
      return run(signal, () => {
        const options = request?.options ?? [];
        if (options.length === 0) return failure(AI_REASONS.FAILED);
        const index = Math.max(0, options.findIndex((option) => option.recommended));
        return { ok: true, index, reason: DEFAULT_REASON };
      });
    },

    /** Demostración de T022: devuelve el borrador del porqué que armó el juego con sus criterios. */
    explainRecommendation(request, { signal } = {}) {
      return run(signal, () => {
        const reason = typeof request?.draftReason === 'string' ? request.draftReason.trim() : '';
        return reason ? { ok: true, reason } : failure(AI_REASONS.FAILED);
      });
    },

    /** Demostración de T022: ficha de ejemplo con todos los campos que pide la fase. */
    explainOther(request, { signal } = {}) {
      return run(signal, () => {
        const fields = Object.fromEntries((request?.sheetFields ?? []).map(({ id, label }) => [id, `Ejemplo de «${label}» para «${String(request?.text ?? '')}».`]));
        return Object.keys(fields).length > 0
          ? { ok: true, sheet: { fields, examples: ['Ejemplo uno de demostración.', 'Ejemplo dos de demostración.'] } }
          : failure(AI_REASONS.FAILED);
      });
    },

    reviewWorld(request, { signal } = {}) {
      return run(signal, () => ({
        ok: true,
        solid: (request?.criteria ?? []).map(({ id }) => ({ criterionId: id, explanation: 'En la demostración, este punto se da por sólido.' })),
        observations: [],
        deduced: Object.fromEntries((request?.deduce ?? []).map((key) => [key, `Ejemplo de ${key}`])),
      }));
    },

    // El modo guía es el mismo en todos los adaptadores: arma la pregunta y lee lo pegado (T085).
    guidePrompt,
    readGuideAnswer,
  };
}
