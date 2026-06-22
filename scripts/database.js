#Database
import { CHARACTER_STATUS } from "./constants.js";

const DB_KEY = "character_continuity_manager";

export function getDatabase() {
    return extension_settings[DB_KEY] ?? {
        version: 1,
        characters: {},
    };
}

export function saveDatabase(db) {
    extension_settings[DB_KEY] = db;
    saveSettingsDebounced();
}

export function createCharacter(name) {
    return {
        id: crypto.randomUUID(),

        name,

        status: CHARACTER_STATUS.ACTIVE,

        hashes: {
            full: "",
            description: "",
        },

        appearance: {
            gender: "",
            age: "",
            height: "",
            species: "",

            hair: {
                color: "",
                style: "",
            },

            eyes: {
                color: "",
            },

            build: "",
        },

        clothing: {
            upper: "",
            lower: "",
            footwear: "",

            underwear: {
                top: "",
                bottom: "",
            },
        },

        location: {
            place: "",
            area: "",
        },

        position: {
            posture: "",
            detail: "",
        },

        mood: {
            primary: "",
        },

        accessories: [],

        statusInfo: {
            injuries: "",
            condition: "",
            notes: "",
        },

        relationships: {
            user: {
                status: "",
                notes: "",
            },
        },

        locks: {},
    };
}

#Character
export function addCharacter(character) {
    const db = getDatabase();

    db.characters[character.id] = character;

    saveDatabase(db);
}

export function getCharacter(id) {
    return getDatabase().characters[id];
}

export function updateCharacter(id, updates) {
    const db = getDatabase();

    Object.assign(db.characters[id], updates);

    saveDatabase(db);
}

#Archive
export function archiveCharacter(id) {
    const db = getDatabase();

    db.characters[id].status = "archived";

    saveDatabase(db);
}

#Delete
export function deleteCharacter(id) {
    const db = getDatabase();

    delete db.characters[id];

    saveDatabase(db);
}

