
# STARK CLEANE - Distribución completa (producción ligera)

Este repositorio es una **versión lista para extender** del sistema STARK CLEANE: SPA offline-first para Barbería, Billar, Car Wash y POS con asistente de voz (Jarvis) e integración con OpenAI.
> Nota: por seguridad, **no** incluimos una API Key. Lee la sección *OpenAI Setup* abajo.

## Estructura
- `index.html` - shell SPA
- `styles/` - CSS
- `js/` - código modular (app, router, modules, db, voice, ia)
- `assets/` - logos y recursos
- `config/` - `settings.json` y `openai.key` (vacío por defecto)
- `backup/` - ejemplos de export/import

## Cómo usar (local)
1. Descomprime el ZIP.
2. Abre `index.html` en Chrome/Edge (funcional offline para la mayoría de features).
3. Para usar OpenAI, crea `config/openai.key` con tu clave: `sk-...` o pon la clave en el modal de configuración de la app.

## Seguridad de API Key
La app almacena la API Key en `config/openai.key` y la lee localmente. **No** subas esta carpeta a repositorios públicos si incluyes la clave.

## Funcionalidades incluidas (scaffold)
- Router SPA simple
- IndexedDB helper (db.js) con esquema y seed básico
- Modules: barberia, billar, carwash, pos
- Jarvis: activación por comando, reconocimiento y síntesis
- Assistant: wrapper para llamar a OpenAI (cliente).

## Para pedir mejoras
Dime qué módulo quieres que implemente con lógica completa (por ejemplo: CRUD completo en barbería, tickets impresos con CSS para recibos, OAUTH, sincronización remota, etc.).
