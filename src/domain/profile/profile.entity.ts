import ProfileId from "./value-objects/profile-id.vo";

export type ProfileEntityProps = {
    id?: ProfileId;
};

export class ProfileEntity {
    constructor(
        readonly id: ProfileId,
    ) {
    }

    static create(props: ProfileEntityProps): ProfileEntity {
        return new ProfileEntity(
            props.id,
        );
    }
}

export default ProfileEntity;
