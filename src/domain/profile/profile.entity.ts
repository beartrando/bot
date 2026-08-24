import ProfileId from "../profile/value-objects/profile-id.vo";
import ProfileNickname from "./value-objects/profile-nickname.vo";
import ProfileLevel from "./value-objects/profile-level.vo";
import ProfileRating from "./value-objects/profile-rating.vo";
import ProfileExperience from "./value-objects/profile-experience.vo";
import UserId from "../user/value-objects/user-id.vo";

type ProfileEntityProps = {
    id?: ProfileId;
    userId: UserId;
    nickname?: ProfileNickname;
    level?: ProfileLevel;
    rating?: ProfileRating;
    experience?: ProfileExperience;
    createdAt?: Date;
    updatedAt?: Date;
};

export class ProfileEntity {
    constructor(
        readonly id: ProfileId,
        readonly userId: UserId,
        readonly nickname: ProfileNickname,
        readonly level: ProfileLevel,
        readonly rating: ProfileRating,
        readonly experience: ProfileExperience,
        readonly createdAt: Date | null,
        readonly updatedAt: Date | null,
    ) {
    }

    static create(
        props: ProfileEntityProps,
    ): ProfileEntity {
        const now = new Date();

        return new ProfileEntity(
            props.id ?? ProfileId.create(),
            props.userId,
            props.nickname ?? ProfileEntity.generateGuestNickname(),
            props.level ?? new ProfileLevel(1),
            props.rating ?? new ProfileRating(0),
            props.experience ?? new ProfileExperience(0),
            props.createdAt ?? now,
            props.updatedAt ?? now,
        );
    }

    private static generateGuestNickname(): ProfileNickname {
        const randomDigits = Math.floor(10000000 + Math.random() * 90000000);

        return new ProfileNickname(`Guest${randomDigits}`);
    }


}

export default ProfileEntity;
