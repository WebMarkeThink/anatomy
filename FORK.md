# Fork WebMarkeThink

Fork di [`wheresryan22/anatomy`](https://github.com/wheresryan22/anatomy), licenza MIT,
preso alla revisione `e6600ff` (13 ottobre 2026).

*English: this fork removes the session-log reader and the gallery publishing script
from the upstream skill. Everything else is unchanged. The default branch is `wmt`;
`main` mirrors upstream.*

## Cosa è stato tolto, e perché

| File | Cosa faceva |
|---|---|
| `scripts/session.mjs` | Leggeva il registro della sessione dell'agente in `~/.claude/projects` per ricavarne durata e token |
| `scripts/session.test.mjs` | Il suo test |
| `scripts/publish.mjs` | Copiava una figura in un clone della galleria pubblica `anatomy-community` e, con `--submit`, apriva una pull request con `gh` |
| `scripts/publish.test.mjs` | Il suo test |
| `references/publish.md` | Le istruzioni per l'agente su come pubblicare |

In più: la riga di `SKILL.md` che rimandava a `references/publish.md` e la sezione
*Share a figure* del README.

Il motivo: questa skill viene usata su lavori di clienti. Il registro delle sessioni
contiene le loro conversazioni, e una figura fatta per un cliente non va in una galleria
pubblica. Lo script chiedeva conferma prima di inviare; qui la possibilità non c'è.

Il `CHANGELOG.md` dell'originale è lasciato com'è, e nomina ancora quei file.

## A ogni aggiornamento dall'originale

Il ramo `main` segue l'originale senza modifiche. Il lavoro sta sul ramo `wmt`.

1. Aggiornare `main` da `upstream` e leggere la differenza prima di portarla su `wmt`:
   script nuovi, chiamate di rete, letture fuori dalla cartella del progetto.
2. Portare la differenza su `wmt`. Se l'originale ha modificato uno dei cinque file,
   git segnala un conflitto: si risolve tenendo la cancellazione.
3. Eseguire il controllo, che deve chiudersi con `a posto`:

   ```bash
   node wmt-check.mjs
   ```

   Verifica che i cinque file siano assenti e che nel resto del repository non ci siano
   tracce di ciò che facevano: i loro nomi, `~/.claude/projects`, la galleria
   `anatomy-community`, l'apertura di una pull request o di un fork con `gh`.
4. Solo dopo, spostare la revisione fissata di chi usa la skill.

Un controllo che passa dice che quelle tracce non ci sono; non sostituisce la lettura
della differenza al punto 1.
