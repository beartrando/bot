export class DeviceId {
    constructor(
        readonly value: string,
    ) {
        if (!value) {
            throw new Error("DeviceId cannot be empty");
        }

        if (/\s/.test(value)) {
            throw new Error("DeviceId cannot contain whitespace");
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
