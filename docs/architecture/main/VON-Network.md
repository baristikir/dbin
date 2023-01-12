# VON Network

The VON network is the core technology that powers the distributed ledger technology (DLT) based identity network. It is a set of docker containers that run the Indy Network and the Indy Nodes. The VON Network is a fork of the Hyperledger Indy Project and is the simplest way to get a network running. Used and created by the british government to power the [Verifiable Organizations Network](https://vonx.io/).

## Usage

Run following commands to spin up a local VON Network.

For Docker Setup:

First build the project via `manage` shell scripts.

```bash
./manage build
```

If the build was successful, you can start the network via `manage` shell scripts and add the aditional `--logs` flag for further logging capabilities.

```bash
./manage start --logs
```

On local environments it's also recommended to add the usage of local IP adress, to guarantee the connection between indy network and clients, like so:

```bash
./manage start 192.168.178.21 WEB_SERVER_HOST_PORT=9000 --logs
```

To stop the network simply exit the process via `CTRL + C` in the terminal tab where it's running and run the following command:

```bash
./manage stop
```

For resetting the network, including every transaction made and any storage for schemas, DIDs and so on, run the following command:

```bash
./manage down
```

After resetting the network and its docker containers it will be required to start from the `build` step (1. Step)
