import DeviceDeviceId from "./value-objects/device-device-id.vo";
import Id from "../common/value-objects/id.vo";

export type BattleEntityProps = {
    id?: DeviceDeviceId;
};

export class DeviceEntity {
    constructor(
        readonly id: DeviceDeviceId,
    ) {
    }

    static create(props: BattleEntityProps): DeviceEntity {
        return new DeviceEntity(
            props.id ?? Id.create(),
        );
    }
}

export default DeviceEntity;
