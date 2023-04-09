<div align="center">
  
  ![github memphis banner](https://user-images.githubusercontent.com/70286779/229371212-8531c1e1-1a9d-4bbe-9285-b4dbb8601bfa.jpeg)
  
</div>

<div align="center">

  <h4>

**[Memphis](https://memphis.dev)** is a next-generation alternative to traditional message brokers.

  </h4>
  
  <a href="https://landscape.cncf.io/?selected=memphis"><img width="200" alt="CNCF Silver Member" src="https://github.com/cncf/artwork/raw/master/other/cncf-member/silver/white/cncf-member-silver-white.svg#gh-dark-mode-only"></a>
  
</div>

<div align="center">
  
  <img width="200" alt="CNCF Silver Member" src="https://github.com/cncf/artwork/raw/master/other/cncf-member/silver/color/cncf-member-silver-color.svg#gh-light-mode-only">
  
</div>
 
 <p align="center">
  <a href="https://memphis.dev/docs/">Docs</a> - <a href="https://twitter.com/Memphis_Dev">Twitter</a> - <a href="https://www.youtube.com/channel/UCVdMDLCSxXOqtgrBaRUHKKg">YouTube</a>
</p>

<p align="center">
<a href="https://discord.gg/WZpysvAeTf"><img src="https://img.shields.io/discord/963333392844328961?color=6557ff&label=discord" alt="Discord"></a>
<a href="https://github.com/memphisdev/memphis/issues?q=is%3Aissue+is%3Aclosed"><img src="https://img.shields.io/github/issues-closed/memphisdev/memphis?color=6557ff"></a> 
  <img src="https://img.shields.io/npm/dw/memphis-dev?color=ffc633&label=installations">
<a href="https://github.com/memphisdev/memphis/blob/master/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Code%20of%20Conduct-v1.0-ff69b4.svg?color=ffc633" alt="Code Of Conduct"></a> 
<a href="https://docs.memphis.dev/memphis/release-notes/releases/v0.4.2-beta"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/memphisdev/memphis?color=61dfc6"></a>
<img src="https://img.shields.io/github/last-commit/memphisdev/memphis?color=61dfc6&label=last%20commit">
</p>

A simple, robust, and durable cloud-native message broker wrapped with<br>
an entire ecosystem that enables cost-effective, fast, and reliable development of modern queue-based use cases.<br><br>
Memphis enables the building of modern queue-based applications that require<br>
large volumes of streamed and enriched data, modern protocols, zero ops, rapid development,<br>
extreme cost reduction, and a significantly lower amount of dev time for data-oriented developers and data engineers.

## 📸 Screenshots
Dashboard             |  Station (Topic) overview|  CLI
:-------------------------:|:-------------------------:|:-------------------------:
<img width="300" alt="Dashboard" src="https://user-images.githubusercontent.com/70286779/182221769-3aa953cc-df71-4c0e-b0d2-9dd4ab83fea9.png">|<img width="300" alt="Station Overview" src="https://user-images.githubusercontent.com/70286779/182221788-0a159007-ab93-46aa-9c81-222671144a05.png">|<img src="https://user-images.githubusercontent.com/70286779/175806007-9a37e130-3e5a-4606-bdda-a71a89efae7f.png" alt="drawing" width="300"/>

## 🫣 A world without Memphis
When your application requires a message broker or a queue,<br>
Implementing one will require you to -
- Build a dead-letter queue
- Create observability
- Build a scalable environment
- Create client wrappers
- Handle back pressure. Client or queue side
- Create a retry mechanism
- Configure monitoring and real-time alerts
- Deal with ACLs
- Somehow create a cloud-agnostic implementation
- Create config alignment between production to a dev environment
- Spent weeks and months learning the internals through archival documentation, ebooks, and courses
- Onboard your developers<br>
And the list continues...<br>

**Or, you can just use [Memphis](https://memphis.dev)** and focus your resources on tasks that matter 😎
<br>

## ✨ Features [v1.0.0](https://docs.memphis.dev/memphis/release-notes/releases/v1.0.0-lts)

[**Roadmap**](https://github.com/orgs/memphisdev/projects/2/views/1)

![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) Production-ready message broker in under 3 minutes<br>
![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) Easy-to-use UI, CLI, and SDKs<br>
![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) Data-level observability<br>
![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) Dead-Letter Queue with automatic message retransmit<br>
![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) Schemaverse - Embedded schema management for produced data (Protobuf/JSON/GraphQL/Avro)<br>
![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) Storage tiering<br>
![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) SDKs: Node.JS, Go, Python, Typescript, NestJS, REST, .NET, Kotlin<br>
![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) Kubernetes-native<br>
![20](https://user-images.githubusercontent.com/70286779/220196529-abb958d2-5c58-4c33-b5e0-40f5446515ad.png) Community driven<br>

## 🚀 Getting Started
[Sandbox](https://sandbox.memphis.dev)<br>
[Installation videos](https://www.youtube.com/playlist?list=PL_7iYjqhtXpWpZT2U0zDYo2eGOoGmg2mm)<br><br>
Helm for Kubernetes☸
```shell
helm repo add memphis https://k8s.memphis.dev/charts/ --force-update && \
helm install my-memphis memphis/memphis --create-namespace --namespace memphis
```
Docker🐳 Compose
```shell
curl -s https://memphisdev.github.io/memphis-docker/docker-compose.yml -o docker-compose.yml && \
docker compose -f docker-compose.yml -p memphis up
```

<p align="center">
<a href="https://youtu.be/-5YmxYRQsdw"><img align="center" alt="connect your first app" src="https://img.youtube.com/vi/-5YmxYRQsdw/0.jpg"></a>
</p>

<p align="center">
<a href="https://medium.com/memphis-dev/how-to-build-your-own-wolt-app-b220d738bb71"> Build an event-driven food delivery app </a>

</p>

## High-Level Architecture

<p align="center">
<img alt="memphis.dev-logo" height="500" alt="memphis.dev Architecture" src="https://user-images.githubusercontent.com/70286779/201409779-f23aa9b7-8175-4165-9720-d0a217b49878.jpeg">


</p>

## Local access
### Via Kubernetes
To access Memphis UI from localhost, run the below commands:
```shell
kubectl port-forward service/memphis-ui 9000:80 --namespace memphis > /dev/null &
```

To access Memphis using CLI or SDK from localhost, run the below commands:</br>
```shell
kubectl port-forward service/memphis-cluster 6666:6666 5555:5555 --namespace memphis > /dev/null &
```
Dashboard: http://localhost:9000</br>
Memphis broker: http://localhost:6666

**For Production Environments**
Please expose the UI, Cluster, and Control-plane via k8s ingress / load balancer / nodeport

### Via Docker
UI - http://localhost:9000<br>
Broker - http://localhost:6666<br>

## Beta
Memphis{dev} is currently in Beta version. This means that we are still working on essential features like real-time messages tracing, schema registry and inline processing as well as making more SDKs and supporting materials.

How does it affect you? Well... mostly it doesn't.<br>
(a) The core of memphis broker is highly stable<br>
(b) We learn and fix fast<br><br>
But we need your love, and any help we can get by stars, PR, feedback, issues, and enhancements.<br>
Read more on [Memphis{dev} Documentation 📃](https://memphis.dev/docs).

## Support 🙋‍♂️🤝

### Ask a question ❓ about Memphis{dev} or something related to us:

We welcome you to our discord server with your questions, doubts and feedback.

<a href="https://discord.gg/WZpysvAeTf"><img src="https://amplication.com/images/discord_banner_purple.svg"/></a>

### Create a bug 🐞 report

If you see an error message or run into an issue, please [create bug report](https://github.com/memphisdev/memphis-broker/issues/new?assignees=&labels=type%3A%20bug&template=bug_report.md&title=). This effort is valued and it will help all Memphis{dev} users.


### Submit a feature 💡 request 

If you have an idea, or you think that we're missing a capability that would make development easier and more robust, please [Submit feature request](https://github.com/memphisdev/memphis-broker/issues/new?assignees=&labels=type%3A%20feature%20request).

If an issue❗with similar feature request already exists, don't forget to leave a "+1".
If you add some more information such as your thoughts and vision about the feature, your comments will be embraced warmly :)

## Contributing

Memphis{dev} is an open-source project.<br>
We are committed to a fully transparent development process and appreciate highly any contributions.<br>
Whether you are helping us fix bugs, proposing new features, improving our documentation or spreading the word - we would love to have you as part of the Memphis{dev} community.

Please refer to our [Contribution Guidelines](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md).

## Contributors ✨

Thanks goes to these wonderful people ❤:<br><br>
 <a href = "https://github.com/memphisdev/memphis-broker/graphs/contributors">
   <img src = "https://contrib.rocks/image?repo=memphisdev/memphis-broker"/>
 </a>

## License 📃
Memphis is open-sourced and operates under the "Memphis Business Source License 1.0" license
Built out of Apache 2.0, the main difference between the licenses is:
"You may make use of the Licensed Work (i) only as part of your own product or service, provided it is not a message broker or a message queue product or service; and (ii) provided that you do not use, provide, distribute, or make available the Licensed Work as a Service. A “Service” is a commercial offering, product, hosted, or managed service, that allows third parties (other than your own employees and contractors acting on your behalf) to access and/or use the Licensed Work or a substantial set of the features or functionality of the Licensed Work to third parties as a software-as-a-service, platform-as-a-service, infrastructure-as-a-service or other similar services that compete with Licensor products or services."
Please check out [License](./LICENSE) to read the full text.
