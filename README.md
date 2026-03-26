# 🏎️ Gestor d'Escuderies F1 - Frontend App

Aquesta és l'aplicació frontend (Mobile/Web) per al Gestor d'Escuderies de Fórmula 1. Està desenvolupada utilitzant **Quasar Framework** amb **Vue 3** i **TypeScript**, i compilada per a Android natiu utilitzant **Capacitor**.

L'aplicació consumeix una API REST externa construïda amb Nuxt.js i gestiona la sessió d'usuari mitjançant cookies, permetent realitzar operacions CRUD (Crear, Llegir, Actualitzar, Esborrar) sobre els equips de la graella.

## 🛠️ Tecnologies Utilitzades

* **Framework:** [Quasar Framework](https://quasar.dev/) (Vue 3 + Composition API)
* **Llenguatge:** TypeScript
* **Mobile Wrapper:** [Capacitor](https://capacitorjs.com/) (Android)
* **Client HTTP:** Axios (Configurat per a l'enviament de credencials i cookies)
* **Disseny:** Quasar Material Design (Totalment Responsive: Vista Taula en PC i Vista Targetes/Grid en Mòbil).

## 🚀 Característiques Principals

* **Interfície Adaptativa:** El llistat d'equips s'adapta intel·ligentment a la mida de la pantalla (Grid de targetes en mòbils, taula clàssica en pantalles grans).
* **CRUD Complet:** Creació, edició, visualització i eliminació d'escuderies.
* **Gestió d'Estats:** Pantalla de "Llista Buida" amigable si no hi ha dades.
* **Integració amb Backend:** Connexió segura amb el servidor Nuxt.js, mantenint la sessió de l'usuari activa entre recàrregues.

---

## ⚙️ Requisits Previs

Per executar aquest projecte a la teva màquina, necessitaràs:
* [Node.js](https://nodejs.org/) (Recomanat v20 o superior)
* npm (Gestor de paquets)
* El CLI de Quasar instal·lat globalment: npm install -g @quasar/cli
* **Android Studio** (Amb SDK i Java 17 instal·lat) per compilar i emular l'APK.

---

## 🔧 Configuració i Instal·lació

1. **Instal·lar les dependències del projecte:**
   npm install

2. **⚠️ MOLT IMPORTANT: Configurar la IP del Servidor (Backend)**
   Atès que l'emulador d'Android/mòbil físic i el servidor Nuxt s'executen en entorns de xarxa diferents, és vital configurar la IP correcta abans de llançar l'app.
   
   * Esbrina la teva IP local (a Linux utilitza la comanda hostname -I).
   * Obre l'arxiu src/boot/axios.ts.
   * Modifica la baseURL perquè apunti a la IP on corre el teu backend Nuxt:
     
     // Exemple: http://172.23.X.X:3000
     const api = axios.create({ 
       baseURL: 'http://LA_TEVA_IP_AQUI:3000',
       withCredentials: true // Necessari per mantenir la sessió
     });

---

## 💻 Comandes de Desenvolupament

### Arrancar en mode Emulador Android
Per aixecar el servidor de desenvolupament i obrir l'app a l'emulador d'Android a través de Capacitor:

quasar dev -m capacitor -T android


### Arrancar en mode Web (Navegador)
Si prefereixes provar la interfície ràpidament al navegador:

quasar dev


---

## 📦 Compilació i Producció (Generar APK)

Per generar l'arxiu executable .apk per a dispositius Android reals:

1. **Construir el codi per a producció:**
   quasar build -m capacitor -T android

2. **Generar l'APK des d'Android Studio:**
   * Obre **Android Studio**.
   * Obre la carpeta específica src-capacitor/android d'aquest projecte.
   * Espera que acabi la sincronització de Gradle.
   * Ves a Build > Build Bundle(s) / APK(s) > Build APK(s).
   * El teu arxiu app-debug.apk estarà llest a la carpeta build/outputs/apk/debug/.

---

## 📂 Estructura Principal del Codi

* /src/pages/TeamsPage.vue: Lògica principal de l'aplicació, conté el CRUD, la taula responsive i el formulari modal.
* /src/boot/axios.ts: Configuració global del client HTTP (interceptors, base URL i credencials).
* /src-capacitor/: Arxius natius d'Android i configuració de Capacitor.