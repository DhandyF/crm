# CRM-UI

CRM-UI is a web-based CRM (Customer Relationship Management) dashboard application developed using **Vue 2**, **Vuex**, **Axios**, and **Bootstrap 5**. This project is designed to simulate a simple CRM system with essential features like viewing contacts, filtering them, simulating VoIP calls, and logging those calls.

It also includes a `Dockerfile` and `docker-compose.yml` to help users quickly run the app inside containers.

---

## 📋 Features

- Display a list of contact information
- Filter contacts by company and role
- Simulate VoIP call with mock behavior
- Automatically log calls made through the UI
- Fully containerized with Docker

---

## 📦 Project Structure

```bash
CRM-UI/
├── public/
├── src/
│ ├── api/
│ ├── assets/
│ ├── components/
│ ├── lib/
│ ├── router/
│ ├── store/
│ ├── views/
│ ├── App.vue
│ ├── main.js
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```
---

## ⚙️ How to Install & Run (Local Setup)

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v22.13+ recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/DhandyF/crm.git
   cd CRM-UI
    ```
2. **Install dependencies**

    ```bash
    npm install
    ```
3. **Run the development server**

    ```bash
    npm run serve
    ```

4. **Open in browser**

    Visit: http://localhost:8080

---

## 🐳 How to Run with Docker
This project supports Docker to simplify setup and deployment.

**Using Docker Compose**

1. **Start services**

    ```bash
    docker-compose up -d --build
    ```

2. **Stop services**

    ```bash
    docker-compose down
    ```

---

## 📞 VoIP Call Simulation
CRM-UI includes a mock VoIP "call" feature that simulates calling a contact. This is handled through a local mock API endpoint and triggers call log updates within the application.
