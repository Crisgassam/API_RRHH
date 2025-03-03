import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createDatabase() {
    const db = await open({
        filename: path.join(__dirname, 'database.db'),
        driver: sqlite3.Database
    });

    // Ejecutar PRAGMA para habilitar claves foráneas
    await db.run(`PRAGMA foreign_keys = ON;`);  //Activa la identidad referencial, la clave foránea debe existir en otra identidad (la nota debe pertenecer a un usuario que exista)
    const result = await db.get('PRAGMA foreign_keys;');
    console.log('Foreign key status:', result); //si obtenemos un 1 es que está activo


    await db.exec(`
        CREATE TABLE IF NOT EXISTS USUARIO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        clave TEXT NOT NULL,
        tlf TEXT,
        dni TEXT
        );
    `);

    const registros = await db.all(`SELECT * FROM USUARIO;`);
    console.log(registros);

    if (registros.length<1) {
        await db.exec(`  
            INSERT INTO USUARIO (nombre, email, clave) VALUES ("Paco", "paco@paquito.es", "$2a$10$XyAIDDRinlpJH/pklZXtFO.37J1EsZliA0PyJw2yEHcyj76DXBz0W");
            INSERT INTO USUARIO (nombre, email, clave, tlf) VALUES ("María", "maria@mariquilla.es", "$2a$10$XyAIDDRinlpJH/pklZXtFO.37J1EsZliA0PyJw2yEHcyj76DXBz0W", "789456123");
            INSERT INTO USUARIO (nombre, email, clave, dni) VALUES ("José", "jose@joselito.es", "$2a$10$XyAIDDRinlpJH/pklZXtFO.37J1EsZliA0PyJw2yEHcyj76DXBz0W", "12345678Z");
            INSERT INTO USUARIO (nombre, email, clave) VALUES ("Eva", "eva@asdfghjk.es", "$2a$10$XyAIDDRinlpJH/pklZXtFO.37J1EsZliA0PyJw2yEHcyj76DXBz0W");
        `);
    }

    return db;
}

export const dbPromise = createDatabase();