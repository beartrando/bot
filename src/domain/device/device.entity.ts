import DeviceDeviceId from "./value-objects/device-device-id.vo";

export type BattleEntityProps = {
    deviceId?: DeviceDeviceId;
};

export class DeviceEntity {
    constructor(
        readonly deviceId: DeviceDeviceId,
    ) {
    }

    static create(props: BattleEntityProps): DeviceEntity {
        return new DeviceEntity(
            props.deviceId ?? DeviceDeviceId.create(),
        );
    }
}

export default DeviceEntity;
