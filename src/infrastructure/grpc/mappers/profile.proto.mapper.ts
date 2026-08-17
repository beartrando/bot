import * as profileProto from "../../../contracts/proto/profile";
import ProfileEntity from "../../../domain/profile/profile.entity";
import Id from "../../../domain/common/value-objects/id.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import Nickname from "../../../domain/profile/value-objects/nickname.vo";
import Level from "../../../domain/profile/value-objects/level.vo";
import Rating from "../../../domain/profile/value-objects/rating.vo";
import Experience from "../../../domain/profile/value-objects/experience.vo";

export class ProfileProtoMapper {
    static toProto(profile: ProfileEntity): profileProto.ProfileObject {

        return profileProto.ProfileObject.create({
            id: profile.id.value,
            userId: profile.userId.value,
            nickname: profile.nickname.value,
            level: profile.level.value,
            rating: profile.rating.value,
            experience: profile.experience.value,
            createdAt: profile.createdAt ?? undefined,
            updatedAt: profile.updatedAt ?? undefined,
        });
    }

    static toDomain(profile: profileProto.ProfileObject): ProfileEntity {

        return ProfileEntity.create({
            id: new ProfileId(profile.id),
            userId: new Id(profile.userId),
            nickname: new Nickname(profile.nickname),
            level: new Level(profile.level),
            rating: new Rating(profile.rating),
            experience: new Experience(profile.experience),
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
        });
    }

}

export default ProfileProtoMapper;
