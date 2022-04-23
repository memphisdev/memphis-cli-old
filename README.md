![](https://memphis-public-files.s3.eu-central-1.amazonaws.com/Vector_page-0001.jpg)
<br><br>
![Github tag](https://img.shields.io/github/v/release/memphis-os/memphis-cli) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Memphis-OS/memphis-control-plane/commit-activity) [![GoReportCard example](https://goreportcard.com/badge/github.com/nanomsg/mangos)](https://goreportcard.com/report/github.com/nanomsg/mangos)

Too many data sources and too many schemas? Looking for a messaging queue to scale your data-driven architecture? Require greater performance for your data streams? Your architecture is based on post-processing data, and you want to switch to real-time in minutes instead of months? Struggle to install, configure and update Kafka/RabbitMQ/and other MQs?

**Meet Memphis**

**[Memphis](https://memphis.dev)** is a dev-first, cloud-native, event processing platform made out of devs' struggles with tools like Kafka, RabbitMQ, NATS, and others, allowing you to achieve all other message brokers' benefits in a fraction of the time.<br><br>
**[Memphis](https://memphis.dev) delivers:**
- The most simple to use Message Broker (With the same behaivour as NATS and Kafka)
- State-of-the-art UI and CLI
- No need for Kafka Connect, Kafka Streams, ksql. All the tools you need are under the same roof
- An in-line data processing in any programming language
- Out-of-the-box deep observability of every component

RabbitMQ has Queues, Kafka as Topics, **Memphis has Stations.**
#### TL;DR
**On Day 1 (For the DevOps heros out there) -**<br>
Memphis platform provides the same old and loved behavior (Produce-Consume) of other data lakes and MQs, but removes completly the complexity barriers, messy documentation, ops, manual scale, orchestration and more.

**On Day 2 (For the Developers) -**
Developer lives with developing real-time, event-driven apps that are too complex.
Consumers and Producers are filled with logic, data orchestration is needed between the different services, no GUI to understand metrics and flows, lack of monitoring, hard to implement SDKs, etc.

No More.

In the coming versions, Memphis will answer the challenges above,<br>and recude 90% of dev work arround building a real-time / event-driven / data-driven apps.

---

**Purpose of this repo**<br>
For Memphis CLI

**Table of Contents**
- [Memphis Components](#memphis-components)
- [Memphis repos](#memphis-repos)
- [Current SDKs](#current-sdks)
- [Installation](#installation)
  * [Kubernetes](#kubernetes)
    + [Install](#install)
    + [K8S Diagram](#k8s-diagram)
  * [Docker](#docker)
    + [Install](#install-1)
  * [Homebrew](#homebrew)
  * [npm](#npm)
- [Next Steps](#next-steps)
  * [Kubernetes](#kubernetes-1)
    + [Localhost Environment](#localhost-environment)
    + [Production Environments](#production-environments)
  * [Docker](#docker-1)
- [Usage](#usage)
  * [Connect](#connect)
  * [Factory](#factory)
  * [Station](#station)
  * [User](#user)
  * [Producer](#producer)
  * [Consumer](#consumer)
  * [Init](#init)
- [Memphis Contributors](#memphis-contributors)
- [Contribution guidelines](#contribution-guidelines)
- [Documentation](#documentation)
- [Contact](#contact)

## Memphis Components
![](https://memphis-public-files.s3.eu-central-1.amazonaws.com/graphics+for+github/components+diagram+-+cli.png )

## Memphis repos
- [memphis-control-plane](https://github.com/Memphis-OS/memphis-control-plane "memphis-control-plane")
- [memphis-ui](https://github.com/Memphis-OS/memphis-ui "memphis-ui")
- [memphis-broker](https://github.com/Memphis-OS/memphis-broker "memphis-broker")
- [memphis-cli](https://github.com/Memphis-OS/memphis-cli "memphis-cli")
- [memphis-k8s](https://github.com/Memphis-OS/memphis-k8s "memphis-k8s")
- [memphis-docker](https://github.com/Memphis-OS/memphis-docker "memphis-docker")

## Current SDKs
- [memphis-js](https://github.com/Memphis-OS/memphis.js "Node.js")

## Installation

### Kubernetes
#### Install
``` PowerShell
helm repo add memphis https://k8s.memphis.dev/charts/
helm install my-memphis memphis/memphis --create-namespace --namespace memphis
```

**Helm chart options**<br>
Example:<br>
`helm install my-memphis --set cluster.replicas=1,rootPwd="rootpassword" memphis/memphis --create-namespace --namespace memphis`

|  Option |Description   |Default Value   |
| :------------ | :------------ | :------------ |
|rootPwd   |Root password for the dashboard   |`"memphis"`   |
|connectionToken   |Token for connecting an app to the Memphis Message Queue. Auto Generated   |`""`   |
|dashboard.port   |Dashboard's (GUI) port   |80   |
|cluster.replicas   |Amount of Message Queue workers   |3   |

#### K8S Diagram
![](https://memphis-public-files.s3.eu-central-1.amazonaws.com/Untitled+Diagram.png)

---

### Docker
#### Install
``` PowerShell
curl -s https://memphis-os.github.io/memphis-docker/docker-compose.yml -o docker-compose.yml
docker compose -f docker-compose.yml -p memphis up
```

The following will be deployed as docker containers
``` PowerShell
memphis-control-plane-1
memphis-ui-1
memphis-cluster-1
memphis-mongo-1
```



## Next Steps
### Kubernetes
#### Localhost Environment
``` PowerShell
Memphis UI can be accessed via port 80 on the following DNS name from within your cluster: 
memphis-ui.memphis.svc.cluster.local

To access Memphis from localhost, run the below commands:
  1. kubectl port-forward service/memphis-ui 9000:80 --namespace memphis &
  2. kubectl port-forward service/memphis-cluster 7766:7766 --namespace memphis &
  3. kubectl port-forward service/control-plane 6666:6666 6667:80 --namespace memphis &

Dashboard: http://localhost:9000
```
#### Production Environments
Please expose the UI, Cluster, and Control-plane via k8s ingress / load balancer / nodeport

------------

### Docker
**To access Memphis, run the below commands:**
Dashboard - `http://localhost:9000`<br>
Broker - `localhost:7766`<br>
Control-Plane for CLI - `localhost:5555`<br>
Control-Plane for SDK - `localhost:6666` + `localhost:5555`




# Usage
## Connect
> ##### Connection to Memphis control plane

> ##### Once connected, the entire functionalities offered by Memphis are available.


``` PowerShell
$ mem connect -s <control-plane> -u root -p memphis
```

### Parameters - all required

``` PowerShell
-u, --user                 User
-p, --password <password>  Password
-s, --server <server>      Memphis control plane
-h, --help                 display help for command
```
### Example
``` PowerShell
$ mem connect -u root -p memphis -s http://control-plane                
Connected successfully to Memphis control plane.
```
---
## Factory
> ##### Factory is the place to bind stations that have some close business logic
``` PowerShell
$ mem factory <command> [options]
```
### Factory commands
``` PowerShell
   ls                List of factories
   create            Create new factory  
   edit              Edit factory name and/or description
   del               Delete a factory
```
### Factory options
``` PowerShell
  -d, --desc <factory-description>  Factory description
  -h, --help                        display help for command
```
### Examples
``` PowerShell
$ mem factory ls
┌─────────┬────────┬─────────────┬─────────────────┬────────────────────────────┐
│ (index) │  name  │ description │ created_by_user │       creation_date        │
├─────────┼────────┼─────────────┼─────────────────┼────────────────────────────┤
│    0    │ 'test' │     ''      │     'root'      │ '2022-04-19T06:21:19.029Z' │
└─────────┴────────┴─────────────┴─────────────────┴────────────────────────────┘
```
``` PowerShell
$ mem factory create myfactory
Factory myfactory was created.

$ mem factory ls
┌─────────┬─────────────┬────────────────────┬─────────────────┬────────────────────────────┐
│ (index) │    name     │    description     │ created_by_user │       creation_date        │
├─────────┼─────────────┼────────────────────┼─────────────────┼────────────────────────────┤
│    0    │   'test'    │         ''         │     'root'      │ '2022-04-19T06:21:19.029Z' │
│    1    │ 'myfactory' │         ''         │     'root'      │ '2022-04-20T09:22:49.037Z' │
└─────────┴─────────────┴────────────────────┴─────────────────┴────────────────────────────┘
```
``` PowerShell
$ mem factory edit myfactory -d 'my first factory'
Factory myfactory was edited.

$ mem factory ls
┌─────────┬─────────────┬────────────────────┬─────────────────┬────────────────────────────┐
│ (index) │    name     │    description     │ created_by_user │       creation_date        │
├─────────┼─────────────┼────────────────────┼─────────────────┼────────────────────────────┤
│    0    │   'test'    │         ''         │     'root'      │ '2022-04-19T06:21:19.029Z' │
│    1    │ 'myfactory' │ 'my first factory' │     'root'      │ '2022-04-20T09:22:49.037Z' │
└─────────┴─────────────┴────────────────────┴─────────────────┴────────────────────────────┘
```
``` PowerShell
$ mem factory del myfactory
Factory myfactory was removed.

$ mem factory ls
┌─────────┬────────┬─────────────┬─────────────────┬────────────────────────────┐
│ (index) │  name  │ description │ created_by_user │       creation_date        │
├─────────┼────────┼─────────────┼─────────────────┼────────────────────────────┤
│    0    │ 'test' │     ''      │     'root'      │ '2022-04-19T06:21:19.029Z' │
└─────────┴────────┴─────────────┴─────────────────┴────────────────────────────┘
```
---
## Station
> ##### Station is Memphis' queue/topic/channel/subject
``` PowerShell
$ mem station <command> [options]
```
### Station commands
``` PowerShell
   ls                List of stations
   create            Create new station  
   info              Specific station's info
   del               Delete a station
```
### Station options
``` PowerShell
  -f, --factory <factory>                  Factory name
  -rt, --retentiontype <retention-type>    Retention type
  -rv, --retentionvalue <retention-value>  Retention value
  -s, --storage <storage-type>             Storage type
  -r, --replicas <replicas>                Replicas
  -de, --dedupenabled <dedup-enabled>      Dedup enabled
  -dw, --dedupwindow <dedup-window-in-ms>  Dedup window in ms
  -h, --help                               display help for command
```

### Examples
``` PowerShell
$ mem station ls                 
┌─────────┬────────┬─────────┬───────────────────┬────────────────────┬──────────────┬──────────┬───────────────┬─────────────────┬────────────┬───────────────┬──────────────┐
│ (index) │  name  │ factory │  retention type   │ retentention value │ storage type │ replicas │ dedup enabled │ dedup window ms │ created by │ creation date │ last_update  │
├─────────┼────────┼─────────┼───────────────────┼────────────────────┼──────────────┼──────────┼───────────────┼─────────────────┼────────────┼───────────────┼──────────────┤
│    0    │ 'test' │ 'test'  │ 'message_age_sec' │       604800       │      ''      │    1     │     false     │        0        │   'root'   │ '2022-04-20'  │ '2022-04-20' │
└─────────┴────────┴─────────┴───────────────────┴────────────────────┴──────────────┴──────────┴───────────────┴─────────────────┴────────────┴───────────────┴──────────────┘
```
``` PowerShell
$ mem station create mystation -f myfactory
Station mystation was created with the following details:
┌─────────┬─────────────┬───────────────────┬────────────────────┬──────────────┬──────────┬───────────────┬─────────────────┬────────────┬───────────────┐
│ (index) │    name     │  retention type   │ retentention value │ storage type │ replicas │ dedup enabled │ dedup window ms │ created by │ creation date │
├─────────┼─────────────┼───────────────────┼────────────────────┼──────────────┼──────────┼───────────────┼─────────────────┼────────────┼───────────────┤
│    0    │ 'mystation' │ 'message_age_sec' │       604800       │      ''      │    1     │     false     │        0        │   'root'   │ '2022-04-20'  │
└─────────┴─────────────┴───────────────────┴────────────────────┴──────────────┴──────────┴───────────────┴─────────────────┴────────────┴───────────────┘

$ mem station ls
┌─────────┬─────────────┬─────────────┬───────────────────┬────────────────────┬──────────────┬──────────┬───────────────┬─────────────────┬────────────┬───────────────┬──────────────┐
│ (index) │    name     │   factory   │  retention type   │ retentention value │ storage type │ replicas │ dedup enabled │ dedup window ms │ created by │ creation date │ last_update  │
├─────────┼─────────────┼─────────────┼───────────────────┼────────────────────┼──────────────┼──────────┼───────────────┼─────────────────┼────────────┼───────────────┼──────────────┤
│    0    │   'test'    │   'test'    │ 'message_age_sec' │       604800       │      ''      │    1     │     false     │        0        │   'root'   │ '2022-04-20'  │ '2022-04-20' │
│    1    │ 'mystation' │ 'myfactory' │ 'message_age_sec' │       604800       │      ''      │    1     │     false     │        0        │   'root'   │ '2022-04-20'  │ '2022-04-20' │
└─────────┴─────────────┴─────────────┴───────────────────┴────────────────────┴──────────────┴──────────┴───────────────┴─────────────────┴────────────┴───────────────┴──────────────┘
```
``` PowerShell
$ mem station info mystation
Station info:
{
  id: '62600a5a03e78b618f036364',
  name: 'mystation',
  factory_id: '62600a4503e78b618f036363',
  retention_type: 'message_age_sec',
  retention_value: 604800,
  storage_type: '',
  replicas: 1,
  dedup_enabled: false,
  dedup_window_in_ms: 0,
  created_by_user: 'root',
  creation_date: '2022-04-20T13:27:54.818Z',
  last_update: '2022-04-20T13:27:54.818Z',
  functions: []
}

del
$ mem station del mystation
Statoin mystation was removed.

$ mem station ls
┌─────────┬────────┬─────────┬───────────────────┬────────────────────┬──────────────┬──────────┬───────────────┬─────────────────┬────────────┬───────────────┬──────────────┐
│ (index) │  name  │ factory │  retention type   │ retentention value │ storage type │ replicas │ dedup enabled │ dedup window ms │ created by │ creation date │ last_update  │
├─────────┼────────┼─────────┼───────────────────┼────────────────────┼──────────────┼──────────┼───────────────┼─────────────────┼────────────┼───────────────┼──────────────┤
│    0    │ 'test' │ 'test'  │ 'message_age_sec' │       604800       │      ''      │    1     │     false     │        0        │   'root'   │ '2022-04-20'  │ '2022-04-20' │
└─────────┴────────┴─────────┴───────────────────┴────────────────────┴──────────────┴──────────┴───────────────┴─────────────────┴────────────┴───────────────┴──────────────┘
```
---
## User
> ##### Manage users and permissions
``` PowerShell
$ mem user <command> [options]
```

### User commands
``` PowerShell
   ls                List of users
   add               Add new user  
   del               Delete user
```
### User options
``` PowerShell
  -n, --name <user-name>          User name
  -p, --password <user-password>  User password
  -t, --type <user-type>          User type (default: "management") - application/management
  -a, --avatar <avatar-id>        Avatar id (default: 1) -  1-4
  -h, --help                      display help for command
```
### Examples
``` PowerShell
$ mem user ls
┌─────────┬───────────┬────────────────────────────┬───────────┐
│ (index) │ user_name │       creation_date        │ user_type │
├─────────┼───────────┼────────────────────────────┼───────────┤
│    0    │  'root'   │ '2022-04-18T12:38:47.034Z' │  'root'   │
└─────────┴───────────┴────────────────────────────┴───────────┘
```
``` PowerShell
$ mem user add --name shay --password 123456
{ type: 'management', avatar: 1, name: 'shay', password: '123456' }
User shay was created.
$ mem user add --name sveta --type application --avatar 3 
{ type: 'application', avatar: '3', name: 'sveta' }
User sveta was created.
Broker connection credentials: imeD5g08Bz8mbJavU4zi
These credentials CANT be restored, save them in a safe place

$ mem user ls
┌─────────┬───────────┬────────────────────────────┬───────────────┐
│ (index) │ user_name │       creation_date        │   user_type   │
├─────────┼───────────┼────────────────────────────┼───────────────┤
│    0    │  'root'   │ '2022-04-18T12:38:47.034Z' │    'root'     │
│    1    │  'shay'   │ '2022-04-20T13:54:32.571Z' │ 'management'  │
│    2    │  'sveta'  │ '2022-04-20T13:56:46.589Z' │ 'application' │
└─────────┴───────────┴────────────────────────────┴───────────────┘
```
``` PowerShell
$ mem user del shay
User shay was removed.

$ mem user ls
┌─────────┬───────────┬────────────────────────────┬───────────────┐
│ (index) │ user_name │       creation_date        │   user_type   │
├─────────┼───────────┼────────────────────────────┼───────────────┤
│    0    │  'root'   │ '2022-04-18T12:38:47.034Z' │    'root'     │
│    1    │  'sveta'  │ '2022-04-20T14:01:38.494Z' │ 'application' │
└─────────┴───────────┴────────────────────────────┴───────────────┘
```
---
## Producer
> ##### Producer is the entity who can send messages into stations
### Producer commands
``` PowerShell
   ls                List of Producers
```
### Producer options
``` PowerShell
  -s, --station <station-name>  Producers by station
  -h, --help                    display help for command
```
### Examples
``` PowerShell
$ mem producer ls
┌─────────┬──────┬──────┬─────────────────┬──────────────┬──────────────┬───────────────┐
│ (index) │ name │ type │ created_by_user │ station_name │ factory_name │ creation_date │
├─────────┼──────┼──────┼─────────────────┼──────────────┼──────────────┼───────────────┤
│    0    │ ' '  │ ' '  │       ' '       │     ' '      │     ' '      │      ' '      │
└─────────┴──────┴──────┴─────────────────┴──────────────┴──────────────┴───────────────┘
```
---
## Consumer
> ##### Consumer is the entity who can consume messages from stations
### Consumer commands
``` PowerShell
   ls                List of Consumers
```
### Consumer options
``` PowerShell
  -s, --station <station-name>  Consumers by station
  -h, --help                    display help for command
```
### Examples
``` PowerShell
$ mem consumer ls
┌─────────┬──────┬──────┬────────────────┬─────────────────┬──────────────┬──────────────┬───────────────┐
│ (index) │ name │ type │ consumer_group │ created_by_user │ station_name │ factory_name │ creation_date │
├─────────┼──────┼──────┼────────────────┼─────────────────┼──────────────┼──────────────┼───────────────┤
│    0    │ ' '  │ ' '  │      ' '       │       ' '       │     ' '      │     ' '      │      ' '      │
└─────────┴──────┴──────┴────────────────┴─────────────────┴──────────────┴──────────────┴───────────────┘
```
---
## Init
> ##### Creates an example project for working with Memphis
### Examples
``` PowerShell
$ mem init

'mem init' creates an example project for connecting an app with Memphis.

The default language is nodejs.
If you want to use different language use 'mem init -l/--language <language>'.
Currently supported languages: nodejs.

For more help use 'mem init -h'.

The project will be created in directory /Users/myUser/myCurrentDir
 continue? Y/n
index.js was created.
```




## Memphis Contributors
<img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Alon+Avrahami.jpg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Ariel+Bar.jpeg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Arjun+Anjaria.jpeg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Carlos+Gasperi.jpeg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Daniel+Eliyahu.jpeg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Itay+Katz.jpeg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Jim+Doty.jpeg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Nikita+Aizenberg.jpg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Rado+Marina.jpg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"><img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Raghav+Ramesh.jpg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Tal+Goldberg.jpg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;"> <img src="https://memphis-public-files.s3.eu-central-1.amazonaws.com/contributors-images/Yehuda+Mizrahi.jpeg" width="60" height="60" style="border-radius: 25px; border: 2px solid #61DFC6;">

## Contribution guidelines

soon

## Documentation

- [Official documentation](https://docs.memphis.dev)

## Contact 
- [Slack](https://bit.ly/37uwCPd): Q&A, Help, Feature requests, and more
- [Twitter](https://bit.ly/3xzkxTx): Follow us on Twitter!
- [Discord](https://bit.ly/3OfnuhX): Join our Discord Server!
- [Medium](https://bit.ly/3ryFDgS): Follow our Medium page!
- [Youtube](https://bit.ly/38Y8rcq): Subscribe our youtube channel!
