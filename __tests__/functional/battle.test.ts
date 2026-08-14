import DeviceId from "../../src/domain/device/value-objects/device-id.vo";
import httpClientConfig from "../../src/infrastructure/http/configs/http.client.config";
import HttpClient from "../../src/infrastructure/http/client";
import AnonymousSignInUseCase from "../../src/application/use-cases/auth/anonimous-sign-in";
import {fail} from "ts-proto/build/src/utils";
import FetchProfileUseCase from "../../src/application/use-cases/profile/fetch-profile";
import WebsocketClientService from "../../src/infrastructure/websocket/client.service";
import websocketClientConfig from "../../src/infrastructure/websocket/configs/websocket-client.config";
import WebsocketClient from "../../src/infrastructure/websocket/websocket.client";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Gateway Service", () => {

    test("Game story functional", async () => {

        const deviceId1 = new DeviceId(`device1-${Math.random().toString(36).substring(2, 8)}`);
        const deviceId2 = new DeviceId(`device2-${Math.random().toString(36).substring(2, 8)}`);

        // console.log(deviceId1);
        // console.log(deviceId2);

        const gatewayClient1 = new HttpClient(httpClientConfig.host, httpClientConfig.port);
        const gatewayClient2 = new HttpClient(httpClientConfig.host, httpClientConfig.port);

        const anonimousSignIn1UseCase = new AnonymousSignInUseCase(gatewayClient1);
        const anonimousSignIn2UseCase = new AnonymousSignInUseCase(gatewayClient2);

        const accessToken1 = await anonimousSignIn1UseCase.execute(deviceId1);
        const accessToken2 = await anonimousSignIn2UseCase.execute(deviceId2);

        // console.log(accessToken1);
        // console.log(accessToken2);

        if (!accessToken1 || !accessToken2) {
            throw new Error("Failed to authenticate test bots");
        }

        gatewayClient1.accessToken = accessToken1;
        gatewayClient2.accessToken = accessToken2;

        //------------------------------------------------------------------------------------------------------------------

        const fetchProfile1UseCase = new FetchProfileUseCase(gatewayClient1);
        const fetchProfile2UseCase = new FetchProfileUseCase(gatewayClient2);
        const profile1 = await fetchProfile1UseCase.execute();
        const profile2 = await fetchProfile2UseCase.execute();

        expect(profile1).toBeDefined();

        // console.log(profile1);

        const websocketClient1 = new WebsocketClient(accessToken1, websocketClientConfig);
        const websocketClient2 = new WebsocketClient(accessToken2, websocketClientConfig);
        const ws1 = new WebsocketClientService(websocketClient1);

        // const ws2 = new WebSocket(`ws://${config.webSocketStreaming}/battle?profileId=${profile2.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${gatewayClient2.getAccessToken()}`,
        //     },
        // });
        //
        //
        // const start = new Promise<void>(async (resolve) => {
        //     let counter = 0;
        //     const gameplay = async (battleObject?: battleProto.BattleObject | null) => {
        //         console.log(battleObject);
        //
        //         // console.log('=====================================================================step ', counter);
        //         if (!battleObject) {
        //             const req = streamingProto.BattleRequest.create({start: {}});
        //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //             ws1.send(buffer);
        //         } else if (counter === 1) {
        //             const req = streamingProto.BattleRequest.create({start: {}});
        //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //             ws2.send(buffer);
        //         } else if (counter === 3) {
        //             const req = streamingProto.BattleRequest.create({
        //                 move: {
        //                     battleId: battleObject.id,
        //                     cellIdx: 4
        //                 }
        //             });
        //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //             ws1.send(buffer);
        //         } else if (counter === 5) {
        //             const req = streamingProto.BattleRequest.create({
        //                 move: {
        //                     battleId: battleObject.id,
        //                     cellIdx: 1
        //                 }
        //             });
        //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //             ws2.send(buffer);
        //         } else if (counter === 7) {
        //             const req = streamingProto.BattleRequest.create({
        //                 move: {
        //                     battleId: battleObject.id,
        //                     cellIdx: 0
        //                 }
        //             });
        //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //             ws1.send(buffer);
        //         } else if (counter === 9) {
        //             const req = streamingProto.BattleRequest.create({
        //                 move: {
        //                     battleId: battleObject.id,
        //                     cellIdx: 2
        //                 }
        //             });
        //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //             ws2.send(buffer);
        //         } else if (counter === 11) {
        //             const req = streamingProto.BattleRequest.create({
        //                 move: {
        //                     battleId: battleObject.id,
        //                     cellIdx: 8
        //                 }
        //             });
        //             const buffer = streamingProto.BattleRequest.encode(req).finish();
        //             ws1.send(buffer);
        //         } else if (counter >= 13) {
        //             resolve();
        //         }
        //         // console.log("-------------------------------------------------------------------------------------------------------------------------------");
        //
        //         counter++;
        //     };
        //
        //
        //     ws1.on("message", (data: streamingProto.BattleResponse) => {
        //         // console.log("------------------------------------------------------------------------------=1=- Got engine update:");
        //         const buffer = new Uint8Array(data as ArrayBuffer);
        //         const res = streamingProto.BattleResponse.decode(buffer);
        //
        //         // console.log(res)
        //         const battleObject = battleProto.BattleObject.create(res.battle);
        //
        //         gameplay(battleObject);
        //     });
        //
        //     ws2.on("message", (data: streamingProto.BattleResponse) => {
        //         // console.log("------------------------------------------------------------------------------=2=- Got engine update:");
        //         const buffer = new Uint8Array(data as ArrayBuffer);
        //         const res = streamingProto.BattleResponse.decode(buffer);
        //
        //         // console.log(res);
        //         const battleObject = battleProto.BattleObject.create(res.battle);
        //         gameplay(battleObject);
        //     });
        //
        //     await Promise.all([
        //         new Promise(resolve => ws1.on('open', resolve)),
        //         new Promise(resolve => ws2.on('open', resolve)),
        //     ]);
        //
        //     await gameplay();
        // });
        //
        //
        // await start;
        //
        // await ws1.close();
        // await ws2.close();
        //
        //
        // ///
        // // console.log('streams are closed')


        // });
    }, 30000);

});

