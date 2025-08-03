# Material Dashboard 2 React - Gestione Rubrica

Questo progetto è una applicazione web costruita con React che fornisce un'interfaccia per la gestione di una rubrica di contatti. L'applicazione consente di visualizzare, aggiungere, modificare ed eliminare contatti. I dati sono salvati in un database PostgreSQL.

## Caratteristiche Principali

- **Visualizzazione Tabellare:** I contatti sono presentati in una tabella paginata.
- **Ordinamento:** È possibile ordinare i contatti per ogni colonna in ordine crescente o decrescente.
- **Operazioni CRUD:**
  - **Creazione:** Aggiunta di nuovi contatti tramite un modale.
  - **Modifica:** Aggiornamento dei contatti esistenti.
  - **Eliminazione:** Rimozione di contatti con una richiesta di conferma.
- **Autenticazione:** Un sistema di login basato su token (JWT) protegge le operazioni.
- **Architettura a Servizi:** La logica di comunicazione con il backend è isolata in un service dedicato, migliorando la manutenibilità del codice.

## Prerequisiti

Per eseguire questo progetto in ambiente di sviluppo, sono necessari i seguenti strumenti:

- **Docker:** Per l'orchestrazione dei container dell'applicazione (frontend, backend, database).
- **Docker Compose:** Per definire e avviare l'applicazione multi-container.
- **Node.js e npm:** Se si desidera eseguire i servizi al di fuori di Docker.

## Avvio del Progetto

L'applicazione è containerizzata e può essere avviata facilmente con Docker Compose.

1.  **Clonare il repository** (se non già fatto).

2.  **Avviare i servizi con Docker Compose:**

    Eseguire il seguente comando dalla directory principale del progetto:

    ```bash
    docker-compose -f docker-compose.dev.yml up --build
    ```

    Questo comando si occuperà di:
    - Creare le immagini Docker per il server API e l'applicazione React.
    - Avviare i container per il backend, il frontend e un server Nginx come reverse proxy.
    - Installare le dipendenze `npm` per entrambi i servizi.

3.  **Accedere all'applicazione:**

    Una volta che i container sono in esecuzione, è possibile accedere all'applicazione aprendo il browser all'indirizzo:

    [http://localhost:3000](http://localhost:3000)

## Struttura del Progetto

- **`/server`**: Contiene il codice del server backend (Node.js/Express) che gestisce le richieste API e interagisce con il database PostgreSQL.
- **`/src`**: Contiene il codice sorgente dell'applicazione React.
  - **`/src/layouts/tables`**: Componente principale per la visualizzazione della tabella della rubrica.
  - **`/src/services/rubricaService.js`**: Service per la gestione delle chiamate HTTP all'API del backend.
  - **`/src/components`**: Componenti riutilizzabili dell'interfaccia utente.
- **`docker-compose.dev.yml`**: File di configurazione di Docker Compose per l'ambiente di sviluppo.
- **`nginx/nginx.conf`**: File di configurazione per il reverse proxy Nginx.
