# W1TTY Banking Web App

Project setup, running and build generation guide for all the environments.

## Table of content

##### 1. [ Prerequisites ](#prerequisites)

##### 2. [ Node Installation ](#node_installation)

##### 3. [ Yarn Installation ](#yarn_installation)

##### 4. [ Dependencies Installation ](#packages_installation)

##### 5. [ Ensure Code Quality With ESlint ](#standards_verifications)

##### 6. [ Run Testcases ](#run_testcases)

##### 7. [ Build Generation ](#build_generation)

<a name="prerequisites"></a>

## 1. Pre-requisites

| Framework | Version |
| :-------: | :-----: |
|  Nodejs   | 18.17.1 |
|   yarn    | 1.22.19 |

<a name="node_installation"></a>

## 2. Nodejs Installation

### 2.1 Ubuntu

```
curl -s https://deb.nodesource.com/setup_18.x | sudo bash
sudo apt install nodejs -y

# verify installation

node -v
# v18.17.0
```

<a name="yarn_installation"></a>

### 3 Yarn Installation

This project uses yarn as its package manager instead of npm.

```
npm i -g yarn
```

<a name="packages_installation"></a>

### 4 Packages Installation

This commands downlaods all dependencies required for the project.

```
yarn
```

<a name="standards_verifications"></a>

### 5 Standards Verification using lint

```
yarn lint
```

<a name="run_testcases"></a>

### 6 Run Testcases

```
yarn test
```

<a name="build_generation"></a>

### 7 Build Generation

You run the following command based on the environment you are building the project for.

#### 7.1 Development

```
yarn build:dev
```

#### 7.2 Staging

```
yarn build:stage
```

#### 7.3 UAT

```
yarn build:uat
```

#### 7.4 Production

```
yarn build
```
