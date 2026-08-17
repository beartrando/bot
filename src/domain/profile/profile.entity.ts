import Id from "../common/value-objects/id.vo";
import ProfileId from "../profile/value-objects/profile-id.vo";
import Nickname from "../profile/value-objects/nickname.vo";
import Level from "../profile/value-objects/level.vo";
import Rating from "../profile/value-objects/rating.vo";
import Experience from "../profile/value-objects/experience.vo";

type ProfileEntityProps = {
    id?: ProfileId;
    userId: Id;
    nickname?: Nickname;
    level?: Level;
    rating?: Rating;
    experience?: Experience;
    createdAt?: Date;
    updatedAt?: Date;
};

export class ProfileEntity {
    constructor(
        readonly id: ProfileId,
        readonly userId: Id,
        readonly nickname: Nickname,
        readonly level: Level,
        readonly rating: Rating,
        readonly experience: Experience,
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
            props.level ?? new Level(1),
            props.rating ?? new Rating(0),
            props.experience ?? new Experience(0),
            props.createdAt ?? now,
            props.updatedAt ?? now,
        );
    }

    private static generateGuestNickname(): Nickname {
        const randomDigits = Math.floor(10000000 + Math.random() * 90000000);

        return new Nickname(`Guest${randomDigits}`);
    }


}

export default ProfileEntity;
