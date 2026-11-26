// Registro de minijuegos (006, T027 a T031): une el botón "Probar" de la ficha con el minijuego de
// cada lección. Un minijuego no conoce la aplicación ni el bus de eventos (prueba de arquitectura):
// avisa con `finish` al llegar al final y con `exit` al cerrarse. Quien integra (zone-view.js)
// convierte `finish` en el evento `minigameFinished`, que solo anota el minijuego y ajusta la
// confianza. Ningún minijuego aprueba nada (006/FR-043).
//
// API del registro:
//   registry.register(lessonId, start)
//   start(ctx) → { destroy?: () => void } | void
//   ctx = {
//     container,  // HTMLElement donde montar el minijuego (capa de pantallas)
//     zoneId, optionId, lessonId,
//     option,     // la opción del contenido de la zona (nombre, ficha, play.title, play.learns...)
//     voice?,     // voz de PIX ({ say, stop, isMuted, setMuted }); opcional
//     trust,      // confianza actual de la sesión, de 0 a 100 (D51)
//     example,    // 0 o 1: alterna cada vez que se juega esa lección en esta carga de la página
//     finish({ trustDelta }),  // llegó al final (puede seguir mostrando su resumen). Cuenta una vez.
//     exit(),     // se cierra (al terminar o a mitad). Destruye el minijuego.
//   }
//
// Los minijuegos de minigames/index.js tienen otra firma; `adaptMinigame` los convierte.

/** @typedef {{ trustDelta: number }} MinigameResult */

/**
 * Convierte un minijuego con la firma de minigames/index.js
 * (`start({ container, example, onFinish({ lessonId, trustDelta, summary }), onExit() }) → { destroy() }`)
 * a la firma del registro.
 */
export function adaptMinigame(startGame) {
  return (ctx) => startGame({
    container: ctx.container,
    example: ctx.example,
    // Pantalla de entrada (D60): el ejemplo de turno y lo que se aprende salen de la opción de la zona.
    intro: ctx.option?.examples?.[ctx.example] && ctx.option?.play?.learns ? {
      exampleText: ctx.option.examples[ctx.example],
      learns: ctx.option.play.learns,
      entryKey: `${ctx.lessonId}.entry.${ctx.example}`,
      endKey: `${ctx.lessonId}.end`,
    } : null,
    voice: ctx.voice ?? null,
    onFinish: (result) => ctx.finish({ trustDelta: result?.trustDelta }),
    onExit: () => ctx.exit(),
  });
}

export function createMinigameRegistry() {
  /** @type {Map<string, (ctx: object) => ({ destroy?: () => void } | void)>} */
  const games = new Map();
  /** Veces que se ha empezado cada lección en esta carga de la página. */
  const plays = new Map();

  return {
    /** Registra el minijuego de una lección. Uno por lección: registrar de nuevo lo sustituye. */
    register(lessonId, start) {
      if (typeof lessonId !== 'string' || !lessonId) throw new Error('lessonId vacío');
      if (typeof start !== 'function') throw new Error(`El minijuego ${lessonId} no es una función`);
      games.set(lessonId, start);
    },

    has(lessonId) { return games.has(lessonId); },

    /**
     * Arranca el minijuego de una lección. Devuelve false si no hay ninguno registrado.
     * `onFinish` se llama como mucho una vez; `onExit`, una vez, al cerrarse (haya terminado o no).
     * @param {string} lessonId
     * @param {object} ctx Lo de `ctx` salvo example, finish y exit.
     * @param {{ onFinish: (result: MinigameResult) => void, onExit?: () => void }} handlers
     */
    start(lessonId, ctx, { onFinish, onExit = () => {} }) {
      const start = games.get(lessonId);
      if (!start) return false;
      const count = plays.get(lessonId) ?? 0;
      plays.set(lessonId, count + 1);
      let finished = false;
      let closed = false;
      let instance = null;
      const finish = (result = {}) => {
        if (finished || closed) return;
        finished = true;
        const trustDelta = Number.isFinite(result?.trustDelta) ? result.trustDelta : 0;
        onFinish({ trustDelta });
      };
      const exit = () => {
        if (closed) return;
        closed = true;
        try { instance?.destroy?.(); } catch { /* el minijuego ya no está */ }
        onExit();
      };
      try {
        instance = start({ ...ctx, lessonId, example: count % 2, finish, exit }) ?? null;
        if (closed) instance?.destroy?.(); // se cerró antes de devolver su instancia
      } catch {
        exit();
      }
      return true;
    },
  };
}
