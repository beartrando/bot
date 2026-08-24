export class ProfileLevel {
    constructor(
        public readonly value: number,
    ) {
        if (!Number.isInteger(value)) {
            throw new Error("ProfileLevel must be an integer");
        }

        if (value < 1) {
            throw new Error("ProfileLevel must be greater than 0");
        }
    }

    equals(other: ProfileLevel): boolean {
        return this.value === other.value;
    }

    next(): ProfileLevel {
        return new ProfileLevel(this.value + 1);
    }
}

export default ProfileLevel;
