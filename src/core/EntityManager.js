import { QueryBuilder } from "./QueryBuilder.js";

export class EntityManager {
    constructor() {
        this._nextId = 1;
        this._componentsByType = new Map();
        this._entities = new Map();
    }

    createEntity() {
        const id = `e${this._nextId++}`;
        this._entities.set(id, new Map());
        return id;
    }

    addComponent(entity, component) {
        const type = component.constructor.name;

        if (!this._componentsByType.has(type)) this._componentsByType.set(type, new Map());
        const entityMap = this._componentsByType.get(type);
        if (!entityMap.has(entity)) entityMap.set(entity, new Set());
        entityMap.get(entity).add(component);

        if (!this._entities.has(entity)) this._entities.set(entity, new Map());
        const compsByType = this._entities.get(entity);
        if (!compsByType.has(type)) compsByType.set(type, new Set());
        compsByType.get(type).add(component);
    }

    removeComponent(entity, CompClass) {
        const type = CompClass.name;
        const byType = this._componentsByType.get(type);
        const byEntity = this._entities.get(entity)?.get(type);

        if (byType && byEntity) {
            byType.delete(entity);
            this._entities.get(entity).delete(type);
        }
    }

    getComponents(entity) {
        const comps = this._entities.get(entity);
        if (!comps) return [];
        return [...comps.values()].flatMap(set => [...set]);
    }

    getComponent(entity, CompClass) {
        const set = this._entities.get(entity)?.get(CompClass.name);
        if (!set || set.size === 0) return null;
        return [...set][0];
    }

    query(...CompClasses) {
        if (CompClasses.length === 0)
            return new QueryBuilder(this, []);

        const maps = CompClasses.map(c => this._componentsByType.get(c.name) || new Map());
        const initial = [];

        for (const [entity, compSet] of maps[0]) {
            let ok = true;
            const found = [entity];

            found.push([...compSet][0]);

            for (let i = 1; i < maps.length; i++) {
                const m = maps[i];
                if (!m.has(entity)) {
                    ok = false;
                    break;
                }
                found.push([...m.get(entity)][0]);
            }

            if (ok) initial.push(found);
        }

        return new QueryBuilder(this, initial);
    }


    getEntities() {
        return Array.from(this._entities.keys());
    }

    removeEntity(entity) {
        const comps = this._entities.get(entity);
        if (!comps) return;
        for (const [type, set] of comps) {
            const typeMap = this._componentsByType.get(type);
            if (typeMap) typeMap.delete(entity);
        }
        this._entities.delete(entity);
    }
}
