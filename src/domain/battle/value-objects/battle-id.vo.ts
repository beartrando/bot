export class BattleId {
    constructor(
        readonly value: string,
    ) {
        if (!value) {
            throw new Error("BattleId cannot be empty");
        }
    }

    equals(other: Id): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

export default BattleId;
