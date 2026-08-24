import * as profileProto from "../../../contracts/proto/profile";
import ProfileEntity from "../../../domain/profile/profile.entity";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import ProfileNickname from "../../../domain/profile/value-objects/profile-nickname.vo";
import ProfileLevel from "../../../domain/profile/value-objects/profile-level.vo";
import ProfileRating from "../../../domain/profile/value-objects/profile-rating.vo";
import ProfileExperience from "../../../domain/profile/value-objects/profile-experience.vo";
import UserId from "../../../domain/user/value-objects/user-id.vo";

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
            userId: new UserId(profile.userId),
            nickname: new ProfileNickname(profile.nickname),
            level: new ProfileLevel(profile.level),
            rating: new ProfileRating(profile.rating),
            experience: new ProfileExperience(profile.experience),
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
        });
    }

}

export default ProfileProtoMapper;
