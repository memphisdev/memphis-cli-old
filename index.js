#!/usr/bin/env node

// Copyright 2021-2022 The Memphis Authors
// Licensed under the GNU General Public License v3.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.gnu.org/licenses/gpl-3.0.en.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const commander = require('commander');

const factory = require('./actions/factory');
const station = require('./actions/station');
const user = require('./actions/users');
const connect = require('./actions/connect');
const helper = require('./config/helper');
const producer = require('./actions/producer');
const consumer = require('./actions/consumer');
const init = require('./actions/init');
const cluster = require('./actions/cluster');
const packageDetails = require('./package.json');
const validateVersion = require('./utils/validateVersion');

const program = new commander.Command();

program
    .version(`Memphis CLI version ${packageDetails.version}`)
    .usage('<command> [options]')
    // .description('Memphis CLI')
    .addHelpText(
        'after',
        `
${helper.factoryDesc}
${helper.factoryHelp}
${helper.stationDesc}
${helper.stationHelp}
${helper.userDesc}
${helper.userHelp}
${helper.producerDesc}
${helper.producerHelp}
${helper.consumerDesc}
${helper.consumerHelp}
${helper.clusterDesc}
${helper.clusterHelp}
`
    )
    //TODO: add ${helper.hubDesc} ${helper.hubHelp}
    .configureHelp({
        sortSubcommands: false,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    });

program
    .command('connect')
    .description('Connection to Memphis')
    .argument('[command]')
    .option('-u, --user <user>', 'User')
    .option('-p, --password <password>', 'Password')
    .option('-s, --server <server>', 'Memphis')
    .usage('<command> [options]')
    .showHelpAfterError()
    .addHelpText('after', helper.connectDesc)
    .action(async function () {
        await validateVersion();
        if (Object.keys(this.opts()).length === 0 || !this.opts().user || !this.opts().password || !this.opts().server) {
            console.log('\nUse command: mem connect --user <user> --password <password> --server <server>\n');
            console.log('Example: mem connect -u root -p memphis -s <host>:<management_port>');
            console.log(program.commands[0].help());
        } else {
            connect(this.opts());
        }
    });

program
    .command('factory')
    .description('Factories usage commands')
    .argument('<command>')
    .option('-d, --desc <factory-description>', 'Factory description')
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.factoryDesc)
    .addHelpText('after', `\n${helper.factoryHelp}`)
    .action(async function () {
        await validateVersion();
        const factoryActions = ['ls', 'create', 'edit', 'del'];
        if (!this.args?.length || !factoryActions.includes(this.args[0])) {
            console.log('');
            console.log(program.commands[1].help());
        } else {
            factory.factoryMenu(this.args, this.opts());
        }
    });

program
    .command('station')
    .description('Stations usage commands')
    .argument('<command>')
    .option('-f, --factory <factory>', 'Factory name')
    .option('-rt, --retentiontype <retention-type>', 'Retention type')
    .option('-rv, --retentionvalue <retention-value>', 'Retention value')
    .option('-s, --storage <storage-type>', 'Storage type')
    .option('-r, --replicas <replicas>', 'Replicas')
    .option('-de, --dedupenabled <dedup-enabled>', 'Dedup enabled')
    .option('-dw, --dedupwindow <dedup-window-in-ms>', 'Dedup window in ms')
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.stationDesc)
    .addHelpText('after', `\n${helper.stationHelp}`)
    .action(async function () {
        await validateVersion();
        const stationActions = ['ls', 'create', 'info', 'del'];
        if (!this.args?.length || !stationActions.includes(this.args[0])) {
            console.log('');
            console.log(program.commands[2].help());
        } else {
            station.stationMenu(this.args, this.opts());
        }
    });

program
    .command('user')
    .description('Users usage commands')
    .argument('<command>')
    .option('-u, --username <username>', 'Username')
    .option('-p, --password <password>', 'User password')
    .option('-t, --type <user-type>', 'User type', 'management')
    // .option("-hu, --hubuser <hub-username>", "Hub username")
    // .option("-hp, --hubpass <hub-password>", "Hub password")
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.userDesc)
    .addHelpText('after', `\n${helper.userHelp}`)
    .action(async function () {
        await validateVersion();
        const userActions = ['ls', 'add', 'del'];
        if (!this.args?.length || !userActions.includes(this.args[0])) {
            console.log('');
            console.log(program.commands[3].help());
        } else {
            user.userMenu(this.args, this.opts());
        }
    });

program
    .command('producer')
    .description('Producers usage commands')
    .option('-s, --station <station-name>', 'Producers by station')
    .argument('<command>')
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.producerDesc)
    .addHelpText('after', `\n${helper.producerHelp}`)
    .action(async function () {
        await validateVersion();
        const producerActions = ['ls'];
        if (!this.args?.length || !producerActions.includes(this.args[0])) {
            console.log('');
            console.log(program.commands[4].help());
        } else {
            producer.producerMenu(this.args, this.opts());
        }
    });

program
    .command('consumer')
    .description('Consumer usage commands')
    .option('-s, --station <station-name>', 'Consumers by station')
    .argument('<command>')
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.consumerDesc)
    .addHelpText('after', `\n${helper.consumerHelp}`)
    .action(async function () {
        await validateVersion();
        const consumerActions = ['ls'];
        if (!this.args?.length || !consumerActions.includes(this.args[0])) {
            console.log('');
            console.log(program.commands[5].help());
        } else {
            consumer.consumerMenu(this.args, this.opts());
        }
    });

program
    .command('init')
    .description('Creates an example project for working with Memphis')
    .option('-l, --lang <language>', 'Language of project', 'nodejs')
    .argument('[command]')
    .usage('[options]')
    .showHelpAfterError()
    .action(async function () {
        await validateVersion();
        init.initMenu(this.args, this.opts());
    });

program
    .command('cluster')
    .description('Memphis cluster commands')
    .argument('info')
    .showHelpAfterError()
    .action(async function () {
        await validateVersion();
        cluster.clusterMenu(this.args);
    });

//Prepare to hub command
// program
//     .command('hub')
//     .description('Memphis hub usage commands')
//     .argument('<command>')
//     .usage('<command> [options]')
//     .showHelpAfterError()
//     .configureHelp({
//         sortSubcommands: true,
//         subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
//     })
//     .addHelpText('before', helper.hubDesc)
//     .addHelpText('after', `\n${helper.hubHelp}`)
//     .action(async function () {
//         await validateVersion();
//         const userActions = ["login"]
//         if (!this.args?.length || !userActions.includes(this.args[0])) {
//             console.log(program.commands[4].help())
//         }
//         else {
//             return
//         }
//     })

program.parse(process.argv);
