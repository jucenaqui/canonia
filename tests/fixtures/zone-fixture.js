// Montaje común para las pruebas del flujo de zonas (006, T020).
// El contenido de zona sigue la forma documentada al inicio de src/application/zone-flow.js.

import { GameSession } from '../../src/application/game-session.js';
import { createEventBus, WORLD3D_COMMANDS } from '../../src/application/events.js';
import { createZoneFlow } from '../../src/application/zone-flow.js';
import { MemoryProgressStore } from '../../src/adapters/storage/memory-progress-store.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { CONTENT, NOW } from './world-fixture.js';

export const INCOME_ZONE = {
  zoneId: 'incomeSource',
  question: '¿Cuál será la fuente de ingreso inicial?',
  instruction: 'Elige la fuente de ingreso inicial del influencer.',
  nextZoneId: 'niche',
  introTextId: 'zone.incomeSource.intro',
  sheetFields: [
    { id: 'what', label: 'Qué es' },
    { id: 'money', label: 'Cómo entra el dinero' },
    { id: 'before', label: 'Qué necesitas antes' },
  ],
  criteria: [
    { id: 'speed', label: 'Rapidez para empezar', better: 'high', strength: 'se puede empezar pronto' },
    { id: 'audience', label: 'Audiencia que pide', better: 'low', strength: 'pide poca audiencia' },
    { id: 'effort', label: 'Esfuerzo', better: 'low', strength: 'exige poco esfuerzo' },
    { id: 'growth', label: 'Cuánto puede crecer', better: 'high', strength: 'puede crecer mucho' },
  ],
  options: [
    {
      id: 'ugc', text: 'UGC AI para marcas',
      sheet: { fields: { what: 'Creas piezas para una marca.', money: 'La marca te paga por pieza.', before: 'Unas piezas de muestra.' }, examples: ['Tres videos para una marca de agua.', 'Cinco videos para una app de idiomas.'] },
      minigame: { lessonId: 'ugc-brief' },
      ratings: { speed: 'high', audience: 'low', effort: 'medium', growth: 'medium' },
    },
    {
      id: 'affiliate', text: 'Marketing de afiliados',
      sheet: { fields: { what: 'Recomiendas productos con tu enlace.', money: 'Comisión por compra.', before: 'Unirte a un programa.' }, examples: ['Una cámara para principiantes.', 'Libros recomendados.'] },
      minigame: { lessonId: 'affiliate-shelf' },
      ratings: { speed: 'high', audience: 'medium', effort: 'low', growth: 'medium' },
    },
    {
      id: 'digital', text: 'Productos digitales',
      sheet: { fields: { what: 'Vendes algo tuyo en digital.', money: 'Cada compra te paga.', before: 'Crear el producto.' }, examples: ['Una plantilla de comidas.', 'Un pack de filtros.'] },
      minigame: { lessonId: 'digital-problem' },
      ratings: { speed: 'low', audience: 'medium', effort: 'high', growth: 'high' },
    },
  ],
  recommendation: {
    question: {
      id: 'timing',
      prompt: '¿Cuándo quieres ver ingresos?',
      answers: [
        { id: 'soon', label: 'Lo antes posible', focus: ['speed', 'effort'] },
        { id: 'wait', label: 'Puedo esperar unos meses', focus: ['growth'] },
      ],
    },
  },
};

export const ZONE_CONTENT = { incomeSource: INCOME_ZONE };

export function setupZoneFlow({ ai = createDemoAiAdapter(), store = new MemoryProgressStore(), zoneContent = ZONE_CONTENT, autoBind = true } = {}) {
  const events = createEventBus();
  const commands = [];
  for (const name of Object.values(WORLD3D_COMMANDS)) events.on(name, (data) => commands.push({ name, data }));
  const session = new GameSession({ content: CONTENT, store, ai, clock: () => NOW });
  const zoneFlow = createZoneFlow({ session, zoneContent, events, autoBind });
  return { session, zoneFlow, events, commands, store };
}
