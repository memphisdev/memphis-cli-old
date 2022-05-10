const os = require('os');

module.exports = () => {
    const osType = os.type();
    let dir;
    if (osType === 'Linux' || osType === 'Darwin') {
        dir = os.homedir() + '/.memphis-dev/';
        return dir;
    } else if (osType === 'Windows_NT') {
        dir = os.homedir() + '.memphis_dev\\';
        return dir;
    } else {
        return null;
    }
};
