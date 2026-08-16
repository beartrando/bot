export class ProfileId {
    constructor(
        readonly value: string,
    ) {
        if (!value) {
            throw new Error("ProfileId cannot be empty");
        }

        if (/\s/.test(value)) {
            throw new Error("ProfileId cannot contain whitespace");
        }
    }

    equals(other: ProfileId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

export default ProfileId;
