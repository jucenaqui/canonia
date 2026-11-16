# AI INFLUENCER FACTORY
# Especificación Técnica — Migración y Continuidad entre IAs v1.0

**Estado:** `CANÓNICA`

## 1. Objetivo

Permitir que un proyecto de AI INFLUENCER FACTORY pueda migrar entre ChatGPT, Gemini, Claude u otra IA compatible sin reconstruir manualmente el influencer.

## 2. Principio canónico

> El usuario nunca debe tener que reconstruir manualmente un influencer para cambiar de IA. La migración debe convertirse en: generar paquete → adjuntar o copiar paquete → escribir “Continuar [Nombre Influencer]” → recuperar estado → continuar.

## 3. Intención operativa

Nombre recomendado:

`PREPARAR_MIGRACION_IA`

Alias funcional:

`EXPORTAR_CONTEXTO_PORTABLE`

## 4. Información mínima de migración

Todo paquete debe contener:

- ID del proyecto;
- nombre canónico;
- versión;
- estado;
- últimas fases aprobadas;
- fase actual;
- subfase actual;
- último punto de control;
- canon esencial;
- pendientes;
- siguiente acción;
- configuración de idioma/localización;
- instrucciones de reanudación;
- referencia a la versión fuente del proyecto.

## 5. Formatos soportados

### Paquete Portable Completo
ID técnico estable: `PAQUETE_PORTABLE_COMPLETO`

Uso: copia de seguridad y migración profesional.

### Paquete Portable Ligero
ID técnico estable: `PAQUETE_PORTABLE_LITE`

Uso: planes gratuitos, pocos archivos o contexto limitado.

### Archivo Universal de Reanudación
ID técnico estable: `UNIVERSAL_RESUME`

Nombre técnico de archivo:

`[Nombre_Influencer]_UNIVERSAL_RESUME.md`

Uso: plataformas que aceptan un solo archivo.

### Contexto Portable Copiable
ID técnico estable: `CONTEXTO_PORTABLE_COPIABLE`

Uso: plataformas sin adjuntos.

## 6. Flujo origen

1. Usuario solicita migración.
2. Identificar proyecto activo.
3. Verificar versión vigente.
4. Crear punto de control si corresponde.
5. Validar canon/estado/pendientes.
6. Seleccionar formato según plataforma destino.
7. Generar paquete.
8. Entregar instrucciones de 3 pasos al usuario.

## 7. Instrucción UX recomendada

> Para continuar en [IA destino]:
> 1. Abre una nueva conversación.
> 2. Adjunta el paquete generado.
> 3. Escribe: “Continuar [Nombre Influencer]”.

Si no existen adjuntos, sustituir el paso 2 por pegar el Contexto Portable Copiable.

## 8. Flujo destino

Al recibir el paquete y la orden `Continuar [Nombre Influencer]`:

1. No crear proyecto nuevo.
2. Cargar manifiesto/estado.
3. Verificar versión.
4. Respetar canon y fases bloqueadas.
5. Ejecutar `VALIDADOR_DE_COMPATIBILIDAD_DE_PLATAFORMA`.
6. Ejecutar `VALIDADOR_DE_PREPARACION_OPERATIVA` cuando aplique.
7. Recuperar pendientes.
8. Continuar desde la siguiente acción.
9. No repetir preguntas ya respondidas.

## 9. Respuesta de reanudación

Formato recomendado:

```text
Proyecto: [Nombre Influencer]
Fases aprobadas: [Fases]
Fase actual: [Fase]
Último punto de control: [Punto de Control]
Siguiente acción: [Acción]

📘 Documentación disponible: Guía rápida · Guía paso a paso
```

Después, continuar el trabajo.

## 10. Versionado

Siempre usar el paquete más reciente.

Ejemplos:

```text
[Nombre]_PORTABLE_LITE_v1.0
[Nombre]_PORTABLE_LITE_v1.1
[Nombre]_PORTABLE_LITE_v1.2
```

Una migración genera continuidad sobre la versión vigente; nunca debe sobrescribir silenciosamente historia previa.

## 11. Validación previa a entrega

Comprobar:

- proyecto correcto;
- versión vigente;
- canon presente;
- estado presente;
- fase/subfase actual presentes;
- pendientes presentes;
- idioma/localización presentes;
- instrucción de reanudación presente;
- ausencia de referencias ambiguas;
- contexto suficiente para continuar sin historial de chat.

## 12. Degradación elegante

Si la plataforma destino:

- limita archivos → usar Paquete Portable Ligero o Archivo Universal de Reanudación;
- no admite archivos → usar Contexto Portable Copiable;
- no soporta un formato → generar alternativa equivalente;
- tiene restricciones de contexto → reducir al contexto mínimo suficiente.

## 13. Multiproveedor

El influencer pertenece a AI INFLUENCER FACTORY y a su estado portable, no a un proveedor concreto.

Flujo válido:

`IA A → IA B → IA C → Otra IA`

## 14. Descubribilidad

La portabilidad debe indicarse de forma discreta:

- al crear el primer proyecto;
- al generar el primer punto de control importante;
- en la Guía rápida;
- en documentación de uso;
- cuando el usuario consulte capacidades;
- cuando solicite cambiar de IA.

No repetir en cada mensaje.

## 15. Regla final

> Cambiar de IA debe ser una operación de continuidad, no de reconstrucción.

---


## Regla de nomenclatura visible

Los nombres presentados al usuario deben estar en español. Los identificadores técnicos estables y nombres técnicos de archivo pueden conservarse sin traducción para mantener compatibilidad y portabilidad.

Ejemplo:

```text
Nombre visible: Paquete Portable Ligero
ID técnico: PAQUETE_PORTABLE_LITE
```
