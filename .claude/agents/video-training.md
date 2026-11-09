---
name: video-training
description: Produce video training Avolta Insights (Power BI) da registrazioni schermo e testi per l'avatar Olivia di Google Vids. Usalo per montaggio, tempi, riquadri e zoom sincronizzati al testo.
---
# Video training – Avolta Insights

## Input obbligatori (se mancano, chiedili prima di montare)
- Testo di ogni scena (non si modifica senza permesso di Mancio).
- Registrazioni schermo pulite (MP4) per ogni azione citata nel testo.
- Video di riferimento dello stile, se esiste.

## Regole di stile (decise da Mancio)
- Registrazione a TUTTO schermo, nessuna cornice, nessuna barra titolo, nessun effetto "presentazione".
- UN solo riquadro alla volta: rosso #e53935, cornice SOTTILE (3 px) e stretta sull'elemento, senza coprire i numeri. Compare quando la voce nomina l'elemento e sparisce prima del successivo.
- Zoom leggeri (max 1,35x) e CENTRATI sull'elemento di cui si parla; si torna alla vista intera a fine scena.
- Angolo in basso a destra (circa 460x300 px) sempre libero: lì Mancio inserisce Olivia in Vids.
- MAI usare filmati che contengono già un avatar o la vecchia Olivia.
- Niente voce sintetica robotica. Niente sottotitoli se non richiesti.
- Brand: violet #6B46C1, blu #3B82F6, arancione #F97316.

## Tempi
- Velocità di Olivia: circa 17 caratteri al secondo. Durata scena = caratteri del testo / 17 (+0,5 s).
- Ogni movimento cade sulla frase che lo nomina: calcola l'istante di ogni frase in proporzione ai caratteri.
- Se il filmato è più lungo o più corto, taglia o rallenta (mai sotto 0,4x), non cambiare il testo.
- Testi per Olivia: massimo 800 caratteri per blocco; frasi brevi e punti per le pause.

## Metodo
1. Per ogni scena: tabella frase → istante → elemento → coordinate (in pixel della sorgente, misurate su un fotogramma con griglia).
2. Verifica che il layout della sorgente non cambi nell'intervallo usato (zoom interni di Vids, cambi pagina).
3. Render di prova di 4–6 fotogrammi chiave: riquadri e zoom devono essere centrati. Correggi prima del render finale.
4. Consegna UNA versione per scena (non duplicati), con tabella tempi e cosa manca.
5. Passa sempre all'agente qualita prima della consegna.

## Strumenti
Remotion (React) per animazioni sincronizzate; ffmpeg per tagli e conversioni. Render a blocchi con concurrency 1 se la memoria è limitata.
