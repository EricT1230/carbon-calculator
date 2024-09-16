# carbon-calculator

# Project Structure
```
/dist: Contains the production build of the project.
/node_modules: Contains all the Node.js dependencies.
/public: Contains static assets like the index.html file.
/src: Contains the source code of the project, including components, assets, and styles.
/SQL: Contains SQL scripts used for initializing the database.
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### SQL Script
```
/Ensure that you have MySQL server installed and running.
/Import the SQL script into your database : mysql -u your-username -p your-database-name < /path/to/your/SQL/Dump20240916.sql
/Enter your MySQL password and wait for the import to complete.
```
### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Node.js setup
```
node server.js
```
### Usage Instructions
Open your browser and visit the local development server address. Enter the necessary categories and values to see a visual representation of carbon emissions.