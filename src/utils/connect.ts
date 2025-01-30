import sqlite3 from "sqlite3";
import path from "path";

//const dbPath = path.join(process.cwd(), "words.db")
export const db = new sqlite3.Database('./src/utils/words.db', 
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the database")
    }
);



