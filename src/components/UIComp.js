export class UIComp {
    constructor(components = []) {
        this.components = components;
    }

    get(id) {
        return this.components.find(comp => comp.id == id);
    }
}