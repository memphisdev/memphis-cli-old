const memphis = require("memphis-dev");

(async function () {
    try {
        await memphis.connect({
            host: "localhost",
            brokerHost: "localhost",
            username: "app_1",
            connectionToken: "dYDkiGnr7Z2drNRvpGdq"
        });

        const producer = await memphis.producer({
            stationName: "test_station",
            producerName: "first_app"
        });

        const promises = [];
        for (let index = 0; index < 100; index++)
            promises.push(producer.produce({
                message: Buffer.from(`Message #${index}: Hello world`)
            }));

        await Promise.all(promises);
    } catch (ex) {
        console.log(ex);
        memphis.close();
    }
}());