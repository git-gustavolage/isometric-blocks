export class ComponentBundle {
    constructor(components) {
        this.components = components;
    }

    clone() {
        const clones = this.components.map(comp => {
            const instance = Object.create(Object.getPrototypeOf(comp));
            Object.assign(instance, comp);
            return instance;
        });
        return new ComponentBundle(...clones);
    }

    addToEntity(em, entityId) {
        this.components.forEach(comp => {
            let instance;
            instance = Object.create(Object.getPrototypeOf(comp));
            Object.assign(instance, comp);
            em.addComponent(entityId, instance);
        })
    }

    removeFromEntity(em, entityId) {
        this.components.forEach(comp => {
            em.removeComponent(entityId, comp.constructor);
        })
    }
}
