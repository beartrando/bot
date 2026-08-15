export class RefreshToken {
    constructor(
        readonly value: string,
    ) {
        if (!value) {
            throw new Error("RefreshToken cannot be empty");
        }
    }

    equals(other: RefreshToken): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

export default RefreshToken;
