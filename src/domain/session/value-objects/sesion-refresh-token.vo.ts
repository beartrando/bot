export class SessionRefreshToken {
    constructor(
        readonly value: string,
    ) {
        if (!value) {
            throw new Error("SessionRefreshToken cannot be empty");
        }
    }

    equals(other: SessionRefreshToken): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

export default SessionRefreshToken;
