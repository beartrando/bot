export class DeviceId {
    constructor(
        readonly value: string,
    ) {
        if (!value) {
            throw new Error("ProfileId cannot be empty");
        }
    }

    equals(other: DeviceId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

export default DeviceId;
