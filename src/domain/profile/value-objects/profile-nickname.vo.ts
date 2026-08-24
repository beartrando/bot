export class ProfileNickname {
    constructor(public readonly value: string) {
        const nickname = value.trim();

        if (nickname.length < 3) {
            throw new Error("ProfileNickname must be at least 3 characters");
        }

        if (nickname.length > 32) {
            throw new Error("ProfileNickname must be at most 32 characters");
        }

        if (!/^[a-zA-Z0-9_]+$/.test(nickname)) {
            throw new Error("ProfileNickname contains invalid characters");
        }

        this.value = nickname;
    }

    equals(other: ProfileNickname): boolean {
        return this.value === other.value;
    }
}

export default ProfileNickname;
