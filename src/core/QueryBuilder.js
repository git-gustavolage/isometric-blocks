export class QueryBuilder {
    constructor(em, initialResult) {
        this.em = em;
        this.result = initialResult;
        this.withFilters = [];
        this.withoutFilters = [];
    }

    with(...CompClasses) {
        this.withFilters.push(...CompClasses);
        return this;
    }

    without(...CompClasses) {
        this.withoutFilters.push(...CompClasses);
        return this;
    }

    get() {
        let final = this.result;

        for (const CompClass of this.withFilters) {
            const type = CompClass.name;
            final = final.filter(([eid]) => {
                const comps = this.em._entities.get(eid)?.get(type);
                return comps && comps.size > 0;
            });
        }

        for (const CompClass of this.withoutFilters) {
            const type = CompClass.name;
            final = final.filter(([eid]) => {
                const comps = this.em._entities.get(eid)?.get(type);
                return !comps || comps.size === 0;
            });
        }

        return final;
    }
}
