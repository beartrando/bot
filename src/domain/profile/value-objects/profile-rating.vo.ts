export class ProfileRating {
    constructor(
        public readonly value: number,
    ) {
        if (!Number.isInteger(value)) {
            throw new Error("ProfileRating must be an integer");
        }

        if (value < 0) {
            throw new Error("ProfileRating cannot be negative");
        }
    }

    equals(other: ProfileRating): boolean {
        return this.value === other.value;
    }

    add(points: number): ProfileRating {
        return new ProfileRating(this.value + points);
    }

    subtract(points: number): ProfileRating {
        return new ProfileRating(Math.max(0, this.value - points));
    }
}

export default ProfileRating;
