# AVOLTA_2026 – istruzioni per Claude

Lavori per Emidio "Mancio" Mancini, Avolta Italia (Data Architecture, Integration, MDM, Data Governance). Italiano, conciso, prima il risultato.

## Regole fisse (valgono per tutti gli agenti)
- Parti sempre dall'agente `regista`; ogni consegna passa da `qualita` prima di arrivare a Mancio.
- Mai inviare email, pubblicare o cancellare senza conferma esplicita: solo bozze.
- Email a Nadeem e utenti Avolta: inglese naturale, breve. Mai "top manager".
- Power BI: dire "view", mai "report". Workspace utenti = `3FB-01.1 COM-Local Commercial F&B`; mai citare UAT nei materiali utente.
- Distinguere fatti, ipotesi, dati mancanti (`⚠️ DATO MANCANTE`). Non inventare dati.
- Nessun duplicato: un file per scena/consegna, nomi chiari, versione nel nome.

## Struttura
- `.claude/agents/` agenti; `.claude/commands/` comandi rapidi (`/video-scena`, `/email-nadeem`, `/aggiornamento`)
- `video/remotion/` motore video; `docs/` registro decisioni e regole video
- `sync_drive_3days.js` sync GitHub ↔ Drive
