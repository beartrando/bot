import DeviceId from "./value-objects/device-id.vo";

export type BattleEntityProps = {
    id?: DeviceId;
};

export class DeviceEntity {
    constructor(
        readonly id: DeviceId,
    ) {
    }

    static create(props: BattleEntityProps): DeviceEntity {
        return new DeviceEntity(
            props.id ?? Id.create(),
        );
    }
}

export default DeviceEntity;
