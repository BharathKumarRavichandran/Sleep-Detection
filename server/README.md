# Server for Sleep-Detection
Backend for Sleep Detection project done for ECPE23 Computer Architecture and Organisation.

### Prerequisites
* Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Project Installation
1. Clone the repository - `git clone <remote-url>`
2. Go to the project directory - `cd <cloned-repo>`
3. Install dependencies - `npm install`
4. Copy contents of `.env.example` to a new file `.env`
    * Configure `PORT`, `environment` and `SECRET` variables
    * Get and set `SENDGRID_API_KEY` to access application mailing routes
    * `API_BASE_URL = 'http://localhost:8000'`
    * Set `BASE_DIR` to your appropriate directories path to configure file uploads.
5. Copy contents of `src/config/recipientList.example.json` to a new file `src/config/recipientList.json` and add all email ids inwhich you want to receive email.
6. Start application server - `node src/server`

#### Troubleshooting
* If you face some version incompatibility issues while installing/running, check your `node` and `npm` versions and ensure it is compatible with the project. (Tip: Use nvm :p)