const memphis = require("memphis-dev");

(async function () {
    try {
        await memphis.connect({
            host: "localhost",
            brokerHost: "localhost",
            username: "app_1",
            connectionToken: "dYDkiGnr7Z2drNRvpGdq"
        });

        const consumer = await memphis.consumer({
            stationName: "test_station",
            consumerName: "second_app",
            consumerGroup: ""
        });

        consumer.on("message", message => {
            console.log(message.getData().toString());
            message.ack();
        });

        consumer.on("error", error => {
            console.log(error);
        });
    } catch (ex) {
        console.log(ex);
        memphis.close();
    }
}());