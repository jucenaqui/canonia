// Montaje común para las pruebas de los flujos de puerta y de modo guía.

import { GameSession } from '../../src/application/game-session.js';
import { createEventBus } from '../../src/application/events.js';
import { createGateFlow } from '../../src/application/gate-flow.js';
import { createGuideFlow } from '../../src/application/guide-flow.js';
import { MemoryProgressStore } from '../../src/adapters/storage/memory-progress-store.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { CONTENT, NOW } from './world-fixture.js';

export const GATE_CONTENT = {
  incomeSource: { instruction: 'Elige fuentes de ingreso', fixedChoices: { values: ['Patrocinios', 'Afiliados', 'Productos propios', 'Suscripciones'] } },
  niche: { instruction: 'Propón nichos', extrasWanted: ['publicLabel'] },
  audience: { instruction: 'Propón audiencias' },
  timeAvailable: {
    instruction: 'Tiempo semanal',
    fixedChoices: {
      values: ['Menos de 5 horas', 'De 5 a 10 horas', 'Más de 10 horas'],
      explained: [
        { text: 'Menos de 5 horas', pros: 'Cabe en cualquier semana', risks: 'Avance lento', recommended: false },
        { text: 'De 5 a 10 horas', pros: 'Ritmo sostenible', risks: 'Pide constancia', recommended: true },
        { text: 'Más de 10 horas', pros: 'Avance rápido', risks: 'Cansancio', recommended: false },
      ],
    },
  },
  goal90Days: { instruction: 'Propón objetivos' },
};

/**
 * @param {object} [options]
 * @param {object} [options.ai] Adaptador de IA; por defecto, el de demostración.
 * @param {object} [options.store]
 */
export function setupFlows({ ai = createDemoAiAdapter(), store = new MemoryProgressStore() } = {}) {
  const events = createEventBus();
  const emitted = [];
  for (const name of ['resumeLevel', 'setGateResolved', 'worldClosed']) events.on(name, (data) => emitted.push({ name, data }));
  const session = new GameSession({ content: CONTENT, store, ai, clock: () => NOW });
  const gateFlow = createGateFlow({ session, gateContent: GATE_CONTENT, events });
  const guideFlow = createGuideFlow({ session, gateContent: GATE_CONTENT });
  return { session, gateFlow, guideFlow, events, emitted, store };
}

/** Respuesta de una IA de chat a la pregunta de opciones, con texto alrededor. */
export function chatAnswer(options) {
  return `¡Claro! Aquí tienes tres opciones:\n\n\`\`\`json\n${JSON.stringify(options, null, 2)}\n\`\`\`\n\nEspero que te sirvan.`;
}

export const NICHE_OPTIONS = [
  { text: 'Cocina casera rápida', pros: 'Cotidiano', risks: 'Competido', recommended: true, extras: { publicLabel: 'Cocina rápida' } },
  { text: 'Plantas en balcones', pros: 'Visual', risks: 'Lento', recommended: false, extras: { publicLabel: 'Plantas' } },
  { text: 'Escapadas de un día', pros: 'Variado', risks: 'Costoso', recommended: false, extras: { publicLabel: 'Escapadas' } },
];
