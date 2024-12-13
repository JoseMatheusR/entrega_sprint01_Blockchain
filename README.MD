# Atividade individual-Sprint01 - Blockchain_Simples

Entrega da primeira sprint do projeto de bolsas de Blockchain da Compass UOL. O projeto consiste na criação de uma rede Blockchain simples com funcionalidades básicas, como prática dos conteúdos estudados dentro do programa de bolsas. A linguagem escolhida (escolha do aluno) para realização da atividade foi o [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript).

## Funcionalidades

- Criação de transações;
- Minerar blocos contendo transações e conectar esses blocos em uma rede blockchain;
- Implementação de um sistema simples de `Proof of Work`, utilizando a dificuldade da rede;
- Validar a integridade da blockchain como um todo;
- Sistema de recompensa simples para mineradores;
- Geração de endereços de usuário de forma segura e validação de endereços;
- Histórico de transações por meio de um endereço;
- Suporte a múltiplos nós na rede, incluindo sincronização de blocos;
- Propagação de transações e blocos pela rede;
- Resolução de conflitos para garantir consenso entre os nós.

## Instalação

Para que o código funcione, é necessário que o [Node.js](https://nodejs.org/en/download/prebuilt-installer) esteja instalado corretamente em seu sistema. Além disso, é necessária a instalação dos seguintes módulos:

- `crypto-js` para a geração dos hashes.
- `date-fns` para a formatação das datas.
- `elliptic` para a geração de chaves públicas e privadas (utilizada na criação de endereços).

### Passos:

1. Clone este repositório usando o comando:
   ```
   git clone https://github.com/JoseMatheusR/entrega_sprint01_Blockchain.git
   ```
2. Navegue até o diretório onde o arquivo se encontra.
3. Instale as dependências usando o comando a seguir no terminal:
   ```bash
   npm install crypto-js date-fns elliptic
   ```
4. Execute o programa no terminal usando:
   ```bash
   node main.js
   ```
ou
```bash
node testBlockChain.js
```

## Estrutura do código

### 1. **`Transaction` (Classe)**
   - **Função**: Representa uma transação entre duas partes. Armazena os detalhes de quem envia (`origin`), a quantidade enviada (`quantity`), o tipo de moeda utilizada (`currency`) e para quem vai a transação (`destination`).

### 2. **`Block` (Classe)**
   - **Função**: Representa um bloco na blockchain. Um bloco contém várias transações, um hash que o identifica, o hash do bloco anterior e um número chamado `nounce`, utilizado no processo de mineração.
   - **Funções internas**:
     - **`hashfunction`**: Gera o hash exclusivo do bloco com base nas transações, timestamp, hash anterior e o `nounce`. Esse hash serve como uma impressão digital do bloco.
     - **`mineBlock`**: Realiza a mineração de um bloco. Ajusta o `nounce` até que o hash gerado atenda à dificuldade desejada.
     - **`isHashValid`**: Verifica se o hash gerado pelo bloco atende à dificuldade exigida, ou seja, se o hash começa com um número de zeros determinado pela dificuldade da rede.

### 3. **`Blockchain` (Classe)**
   - **Função**: Representa a cadeia de blocos. Gerencia a criação de novos blocos, valida a cadeia e lida com as transações pendentes até que sejam mineradas em um bloco.
   - **Funções internas**:
     - **`createGenesis`**: Cria o primeiro bloco da blockchain, conhecido como "bloco gênesis". É um bloco especial que não tem bloco anterior.
     - **`getLastBlock`**: Retorna o último bloco adicionado à blockchain. Usado para conectar novos blocos ao anterior.
     - **`minePendingTransactions`**: Cria um novo bloco com as transações pendentes, realiza a mineração e adiciona o bloco à cadeia. Também cria uma transação de recompensa para o minerador.
     - **`createTransaction`**: Adiciona uma nova transação à lista de transações pendentes, que serão incluídas no próximo bloco minerado.
     - **`createNewAddress`**: Gera um novo endereço de usuário baseado em uma chave pública gerada aleatoriamente.
     - **`isAddressValid`**: Valida se o endereço gerado está no formato correto.
     - **`getUserTransactions`**: Retorna todas as transações geradas por determinado endereço.
     - **`validateAndAddBlock`**: Valida e adiciona um bloco à blockchain, garantindo que o bloco seja válido antes de integrá-lo.
     - **`isChainValid`**: Verifica se a blockchain inteira é válida, comparando os hashes dos blocos e verificando se eles estão corretamente encadeados.

### 4. **`Node` (Classe)**
   - **Função**: Representa um nó na rede blockchain, permitindo comunicação, propagação de blocos e transações e resolução de conflitos.
   - **Funções internas**:
     - **`connectToNetwork`**: Conecta o nó a outros nós na rede.
     - **`broadcastTransaction`**: Propaga uma transação para todos os nós conectados.
     - **`broadcastBlock`**: Propaga um bloco para todos os nós conectados.
     - **`receiveTransaction`**: Recebe uma transação propagada de outro nó e a adiciona à lista de transações pendentes.
     - **`receiveBlock`**: Recebe um bloco propagado de outro nó e tenta validá-lo e adicioná-lo à cadeia.
     - **`resolveConflicts`**: Verifica as cadeias dos nós conectados e adota a mais longa e válida, garantindo o consenso.

## Exemplos de Uso

### Exemplo 1: Criar e minerar uma transação
```javascript
let blockchain = new Blockchain();

// Criando uma nova transação
blockchain.createTransaction(new Transaction("Matheus", 13, "bitcoin", "Sávio"));

// Minerando transações pendentes
blockchain.minePendingTransactions("MinerAddress");

// Exibindo toda a blockchain
blockchain.chain.forEach((block, index) => {
    console.log(`\nBlock ${index} \n[Timestamp: ${block.timestamp} \nNounce: ${block.nounce}\nHash: ${block.hash} \nPrevious Hash: ${block.previousHash}]`);
    block.transactions.forEach((tx, txIndex) => {
        console.log(`Transaction: ${txIndex + 1}: ${tx.origin || 'Mining Reward'} -> ${tx.destination} | ${tx.quantity} ${tx.currency}`);
    });
});
```

### Exemplo 2: Registro de transações de usuário
```javascript
// Gerando um novo endereço de usuário
let newAddress = blockchain.createNewAddress();

// Verificando o histórico de transações do endereço
let transactions = blockchain.getUserTransactions(newAddress);
console.log(transactions);
```

### Exemplo 3: Resolução de Conflitos na Rede
```javascript
let node1 = new Node();
let node2 = new Node();

node1.connectToNetwork(node2);

// Broadcast de transações e blocos
node1.broadcastTransaction(new Transaction("Alice", 50, "bitcoin", "Bob"));
node1.broadcastBlock(blockchain.getLastBlock());

// Resolvendo conflitos para garantir consenso
node2.resolveConflicts();
```

## Licença

This project is open-source and licensed under the MIT License. Feel free to modify and use it as needed.

