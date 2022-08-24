const memphis = require('memphis-dev');

(async function () {
    let memphisConn;
    try {
        memphisConn = await memphis.connect({
            host: '<memphis-host>',
            username: '<application type username>',
            connectionToken: '<broker-token>'
        });

        const producer = await memphisConn.producer({
            stationName: '<station-name>',
            producerName: '<producer-name>'
        });

        for (let index = 0; index < 100; index++) {
            await producer.produce({
                message: Buffer.from(`Message #${index}: Hello world`)
            });
            console.log("Message sent");
        }

        console.log("All messages sent");
        memphisConn.close();
    } catch (ex) {
        console.log(ex);
        memphisConn && memphisConn.close();
    }
})();
