# ddos-test-tool

A testing tool for DDOS-type attacks

## Install

```sh
npm install
```

## Configuration

The first thing to do is to complete the **config.json** file to configure the attack.

List of possible arguments:
- **url**: (string) URL to use
- **headers**: (object) headers to add to the request
- **method**: (string) get/post/put/delete
- **params**: (object) request parameters. Used as a query if the method is get, and as the body otherwise
- **calls**: (number) number of calls to make
- **timeout**: (number) time in milliseconds between each request

## Usage

```sh
npm start -- runAttack
```