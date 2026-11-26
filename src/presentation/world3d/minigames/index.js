// Los cinco minijuegos de la zona de fuente de ingreso, por lessonId (zone-income.js).
// Cada uno: start({ container, texts?, example: 0|1, onFinish, onExit }) → { destroy() }.
import { start as ugc } from './ugc.js';
import { start as affiliate } from './affiliate.js';
import { start as digitalProduct } from './digital-product.js';
import { start as subscriptions } from './subscriptions.js';
import { start as sponsorship } from './sponsorship.js';

export const MINIGAMES = Object.freeze({
  'ugc-brief': ugc,
  'affiliate-shelf': affiliate,
  'digital-problem': digitalProduct,
  'subscriptions-club': subscriptions,
  'sponsorships-offer': sponsorship,
});
