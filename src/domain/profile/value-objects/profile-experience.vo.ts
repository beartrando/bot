export class ProfileExperience {
    constructor(
        public readonly value: number,
    ) {
        if (!Number.isInteger(value)) {
            throw new Error("ProfileExperience must be an integer");
        }

        if (value < 0) {
            throw new Error("ProfileExperience cannot be negative");
        }
    }

    equals(other: ProfileExperience): boolean {
        return this.value === other.value;
    }

    add(amount: number): ProfileExperience {
        return new ProfileExperience(this.value + amount);
    }

    subtract(amount: number): ProfileExperience {
        return new ProfileExperience(Math.max(0, this.value - amount));
    }
}

export default ProfileExperience;
