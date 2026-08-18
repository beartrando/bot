import DeviceId from "../../src/domain/device/value-objects/device-id.vo";
import httpClientConfig from "../../src/infrastructure/http/configs/http.client.config";
import HttpClient from "../../src/infrastructure/http/client";
import AnonymousSignInUseCase from "../../src/application/use-cases/auth/anonimous-sign-in";
import FetchProfileUseCase from "../../src/application/use-cases/profile/fetch-profile";
import WebsocketClientService from "../../src/infrastructure/websocket/client.service";
import websocketClientConfig from "../../src/infrastructure/websocket/configs/websocket-client.config";
import WebsocketClient from "../../src/infrastructure/websocket/websocket.client";
import BattleHandler from "../../src/infrastructure/websocket/handlers/battle.handler";
import AuthService from "../../src/infrastructure/auth/service";
import domainBattleConfig from "../../src/domain/device/config/config";
import authConfig from "../../src/infrastructure/auth/auth.config";
import ProfileService from "../../src/infrastructure/profile/service";
import * as streamingProto from "../../src/contracts/proto/streaming";


class BattleMoveUseCase {
    private counter = 0;

    public websocketService1;
    public websocketService2;

    private resolve!: () => void;

    private readonly executed = new Promise<void>((resolve) => {
        this.counter++;
        const startReq = streamingProto.BattleRequest.create({start: {}});

        await this.websocketService2.send(startReq);

        // const gameplay = async (battleObject?: battleProto.BattleObject | null) => {
        //     console.log(battleObject);
        //
        //     // console.log('=====================================================================step ', counter);
        //     //         if (!battleObject) {
        //     //             const req = streamingProto.BattleRequest.create({start: {}});
        //     //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //     //             ws1.send(buffer);
        //     //         } else if (counter === 1) {
        //     //             const req = streamingProto.BattleRequest.create({start: {}});
        //     //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //     //             ws2.send(buffer);
        //     //         } else if (counter === 3) {
        //     //             const req = streamingProto.BattleRequest.create({
        //     //                 move: {
        //     //                     battleId: battleObject.id,
        //     //                     cellIdx: 4
        //     //                 }
        //     //             });
        //     //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //     //             ws1.send(buffer);
        //     //         } else if (counter === 5) {
        //     //             const req = streamingProto.BattleRequest.create({
        //     //                 move: {
        //     //                     battleId: battleObject.id,
        //     //                     cellIdx: 1
        //     //                 }
        //     //             });
        //     //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //     //             ws2.send(buffer);
        //     //         } else if (counter === 7) {
        //     //             const req = streamingProto.BattleRequest.create({
        //     //                 move: {
        //     //                     battleId: battleObject.id,
        //     //                     cellIdx: 0
        //     //                 }
        //     //             });
        //     //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //     //             ws1.send(buffer);
        //     //         } else if (counter === 9) {
        //     //             const req = streamingProto.BattleRequest.create({
        //     //                 move: {
        //     //                     battleId: battleObject.id,
        //     //                     cellIdx: 2
        //     //                 }
        //     //             });
        //     //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //     //             ws2.send(buffer);
        //     //         } else if (counter === 11) {
        //     //             const req = streamingProto.BattleRequest.create({
        //     //                 move: {
        //     //                     battleId: battleObject.id,
        //     //                     cellIdx: 8
        //     //                 }
        //     //             });
        //     //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //     //             ws1.send(buffer);
        //     //         } else if (counter >= 13) {
        //     //             resolve();
        //     //         }
        //     //         // console.log("-------------------------------------------------------------------------------------------------------------------------------");
        //     //
        //     //         counter++;
        //     //     };
        //
        //     // await gameplay();
        //
        //
        // }

        // });


        this.resolve = resolve;
    });

    async execute(message: streamingProto.BattleResponse): Promise<void> {
        console.log(message);

        this.resolve();
    }

    async wait(): Promise<void> {
        await this.executed;
    }
}


describe("Gateway Service", () => {

    test("Game story functional", async () => {

        const deviceId1 = new DeviceId(`device1-${Math.random().toString(36).substring(2, 8)}`);
        const deviceId2 = new DeviceId(`device2-${Math.random().toString(36).substring(2, 8)}`);

        // console.log(deviceId1);
        // console.log(deviceId2);

        const httpService = new HttpClient(
            httpClientConfig.host,
            httpClientConfig.port,
        );

        const anonimousSignInUseCase = new AnonymousSignInUseCase(httpService);
        const authService1 = new AuthService(authConfig, anonimousSignInUseCase, deviceId1);
        const authService2 = new AuthService(authConfig, anonimousSignInUseCase, deviceId2);

        await authService1.start();
        await authService2.start();

        const accessToken1 = authService1.accessToken;
        const accessToken2 = authService2.accessToken;

        // console.log(accessToken1);
        // console.log(accessToken2);

        if (!accessToken1 || !accessToken2) {
            throw new Error("Failed to authenticate test bots");
        }

        const fetchProfileUseCase = new FetchProfileUseCase(httpService);
        const profileService1 = new ProfileService(authService1, fetchProfileUseCase);
        const profileService2 = new ProfileService(authService2, fetchProfileUseCase);

        const battleMoveUseCase = new BattleMoveUseCase();
        const battleHandler = new BattleHandler(battleMoveUseCase);

        const websocketClient1 = new WebsocketClient(
            authService1,
            profileService1,
            websocketClientConfig,
            battleHandler
        );

        const websocketClient2 = new WebsocketClient(
            authService2,
            profileService2,
            websocketClientConfig,
            battleHandler
        );

        const websocketService1 = new WebsocketClientService(websocketClient1);
        const websocketService2 = new WebsocketClientService(websocketClient2);

        // console.log(await profileService1.fetchProfile());
        // console.log(await profileService2.fetchProfile());

        battleMoveUseCase.websocketService1 = websocketService1;
        battleMoveUseCase.websocketService2 = websocketService2;

        await websocketService1.start();
        await websocketService2.start();

        const startReq = streamingProto.BattleRequest.create({start: {}});


        await websocketService1.send(startReq);
        await websocketService2.send(startReq);

        await battleMoveUseCase.wait();

//     ws2.on("message", (data: streamingProto.BattleResponse) => {
//         // console.log("------------------------------------------------------------------------------=2=- Got engine update:");
//         const buffer = new Uint8Array(data as ArrayBuffer);
//         const res = streamingProto.BattleResponse.decode(buffer);
//
//         // console.log(res);
//         const battleObject = battleProto.BattleObject.create(res.battle);
//         gameplay(battleObject);
//     });

        await websocketService1.stop();
        await websocketService2.stop();

        console.log('streams are closed')


    }, 30000);

});

