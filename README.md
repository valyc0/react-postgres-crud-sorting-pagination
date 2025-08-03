# Progetto Dashboard con Autenticazione

Questo progetto implementa una dashboard web completa basata sul template Material Dashboard 2 React, con un backend personalizzato in Node.js, un sistema di autenticazione basato su ruoli (admin/user) e una gestione completa tramite Docker e Nginx come reverse proxy.

## Architettura

L'applicazione è containerizzata e orchestrata tramite Docker Compose e si compone dei seguenti servizi:

1.  **Frontend (Client React)**

    - **Tecnologia:** React.js (basato su Material Dashboard 2).
    - **Ruolo:** Fornisce l'interfaccia utente, inclusa la pagina di login, la dashboard e la visualizzazione dei dati.
    - **Comunicazione:** Interagisce con il backend tramite richieste API per il login e il recupero dei dati.
    - **Container:** Servizio `react` nel `docker-compose.yml`.

2.  **Backend (Server Node.js)**

    - **Tecnologia:** Node.js con Express.js.
    - **Ruolo:** Gestisce la logica di business, l'autenticazione degli utenti e le interazioni con il database.
    - **API Endpoints:**
      - `/api/login`: Autentica gli utenti e restituisce un token JWT.
      - `/api/rubrica`: Restituisce i dati della tabella `rubrica` (protetto da autenticazione).
    - **Database:** Si connette a un'istanza **esterna** di PostgreSQL. **Non** è gestito da questo `docker-compose.yml`.
    - **Container:** Servizio `api` nel `docker-compose.yml`.

3.  **Proxy (Nginx)**
    - **Tecnologia:** Nginx.
    - **Ruolo:** Agisce come reverse proxy. È l'unico punto di ingresso all'applicazione (sulla porta 80).
    - **Routing:**
      - Le richieste a `/api/*` vengono inoltrate al backend Node.js.
      - Tutte le altre richieste vengono inoltrate al frontend React.
    - **Container:** Servizio `nginx` nel `docker-compose.yml`.

## Prerequisiti

- Docker e Docker Compose installati e in esecuzione.
- Un'istanza di PostgreSQL in esecuzione sulla macchina host o raggiungibile dalla rete, con le seguenti credenziali (o modificare il file `server/server.js` di conseguenza):
  - **Utente:** `postgres`
  - **Password:** `postgres`
  - **Database:** `mydb`
  - **Host:** `localhost` (accessibile come `host.docker.internal` dai container).

## Installazione e Avvio

1.  **Setup del Database:**
    Prima di avviare l'applicazione, è necessario creare le tabelle e i dati iniziali nel database PostgreSQL. Eseguire lo script `setup_database.sh` dalla directory `material-dashboard-react`:

    ```bash
    ./setup_database.sh
    ```

    _Nota: Se il tuo container PostgreSQL ha un nome diverso da `postgres-db-1`, modifica la variabile `DB_CONTAINER` all'interno dello script._

2.  **Avvio dei Servizi:**
    Dalla directory `material-dashboard-react`, eseguire il seguente comando per costruire e avviare tutti i servizi in background:

    ```bash
    docker-compose up -d --build
    ```

3.  **Accesso all'Applicazione:**
    Aprire il browser e navigare all'indirizzo:
    [http://localhost](http://localhost)

4.  **Credenziali di Accesso:**
    Utilizzare le seguenti credenziali per il login:
    - **Admin:** `admin` / `admin`
    - **User:** `user` / `user`

## Script Utili

All'interno della directory `material-dashboard-react` sono presenti i seguenti script:

- `backup.sh`: Crea un archivio `.tar.gz` dell'intero progetto (escludendo `node_modules`, `.git`, etc.) nella directory `/workspace/db-ready`.
- `setup_database.sh`: Inizializza le tabelle `users` e `roles` nel database PostgreSQL.
- `db_dump.sql`: Un dump completo del database, creato su richiesta.

## Struttura delle Directory Principali

```
/material-dashboard-react
├── docker-compose.yml      # File di orchestrazione dei container
├── nginx/                  # Configurazione di Nginx
│   └── nginx.conf
├── server/                 # Codice del backend Node.js
│   ├── server.js
│   └── Dockerfile
├── src/                    # Codice del frontend React
├── backup.sh               # Script per il backup del codice sorgente
├── setup_database.sh       # Script per l'inizializzazione del DB
└── db_dump.sql             # Dump del database
```
