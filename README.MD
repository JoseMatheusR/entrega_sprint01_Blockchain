# Atividade individual-Sprint01 - Blockchain_Simples

Entrega da primeira sprint do projeto de bolsas de Blockchain da Compass UOL. O projeto consiste na criação de uma rede Blockchain simples com funcionalidades básicas, como prática dos conteúdos estudados dentro do programa de bolsas. A linguagem escolhida(escolha do aluno) para realização da atividade foi o [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript). 

## Funcionalidades 

- Criação de transações;
- Minerar blocos contendo transações e ligar eles em uma rede blockchain;
- Implementação de um sistema simples de `Proof of Work`, usando a dificuldade da rede;
- Validar a integridade da blochain como um todo;
- Sistema de recompensa simples para mineradores.

## Instalação

Para que o código funcione, é necessário que se tenha o [node.js](https://nodejs.org/en/download/prebuilt-installer) instalado corretamente em seu sistema. Além disso, é necessária a instalação dos seguintes modulos:
- `crypto-js` para a geração dos hashes.
- `date-fns` para a formatação das datas.

### Passos:

1. Clone esse repositório usando o comando
   ```
   git clone https://github.com/JoseMatheusR/Akashic_Records.git
   ```
2. Navegue até o diretório onde o arquivo se encontra
3. Instale as depedências usando o comando a seguir no terminal:
   ```bash
   npm install crypto-js date-fns
   ```
4. Execute o programa no terminal:
   ```bash
   node main.js
   ```

## Estrutura do código

### 1. **`Transaction` (Classe)**
   - **Função**: Representa uma transação entre duas partes. Armazena os detalhes de quem envia (`origin`), a quantidade enviada (`quantity`), o tipo de moeda usada (`currency`) e para quem vai a transação (`destination`).

### 2. **`Block` (Classe)**
   - **Função**: Representa um bloco na blockchain. Um bloco contém várias transações, um hash que o identifica, o hash do bloco anterior e um número chamado `nounce`, que é utilizado no processo de mineração.
   - **Funções internas**:
     - **`hashfunction`**: Gera o hash exclusivo do bloco com base nas transações, timestamp, hash anterior e o `nounce`. Esse hash serve como uma impressão digital do bloco.
     - **`mineBlock`**: Realiza a mineração de um bloco. Ajusta o `nounce` até que o hash gerado atenda à dificuldade desejada.
     - **`isHashValid`**: Verifica se o hash gerado pelo bloco atende à dificuldade exigida, ou seja, se o hash começa com um determinado número de zeros.

### 3. **`Blockchain` (Classe)**
   - **Função**: Representa a cadeia de blocos. Gerencia a criação de novos blocos, valida a cadeia e lida com as transações pendentes até que sejam mineradas em um bloco.
   - **Funções internas**:
     - **`createGenesis`**: Cria o primeiro bloco da blockchain, conhecido como "bloco gênesis". É um bloco especial que não tem bloco anterior.
     - **`getLastBlock`**: Retorna o último bloco adicionado à blockchain. Usado para conectar novos blocos ao anterior.
     - **`minePendingTransactions`**: Cria um novo bloco com as transações pendentes, realiza a mineração e adiciona o bloco à cadeia. Também cria uma transação de recompensa para o minerador.
     - **`createTransaction`**: Adiciona uma nova transação à lista de transações pendentes, que serão incluídas no próximo bloco minerado.
     - **`isChainValid`**: Verifica se a blockchain inteira é válida, comparando os hashes dos blocos e verificando se eles estão corretamente encadeados. Garante que a cadeia não foi alterada.

Essas funções combinadas permitem que a blockchain registre transações, realize mineração, valide a integridade dos blocos e mantenha um histórico seguro de todas as transações feitas.

### Exemplo de uso:

Exemplo simples de criação de uma blokchain nova, criação de transações e mineração de bloco.

```javascript
let blockchain = new Blockchain();

// Criando uma nova transação
blockchain.createTransaction(new Transaction("Matheus", 13, "bitcoin", "Sávio"));

// Minerando transações pedentes
blockchain.minePendingTransactions("MinerAddress");

// Printando toda a rede
testezada.chain.forEach((block, index) => {
    console.log(`\nBlock ${index} \n[Timestamp: ${block.timestamp} \nNounce: ${block.nounce}\nHash: ${block.hash} \nPrevious Hash: ${block.previousHash}]`);
    block.transactions.forEach((tx, txIndex) => {
        console.log(  `Transaction: ${txIndex + 1}: ${tx.origin || 'Mining Reward'} -> ${tx.destination} | ${tx.quantity} ${tx.currency}`);
    });
});
```

### Funcionamento do processo de mineração

- **Proof of Work**: A função `mineBlock` executa em loop até que um hash valido é gerado(Um hash que tenha uma quantidade de zeros igual a valor da dificuldade determinada na classe `Blockchain`).
- **Recompensa**: "Mineradores" são recompensados por minerar e adicionar um bloco a rede com sucesso. A própria rede gera uma transação nova com o valor de recompensa determinado, que poderá ser adicionada ao próximo bloco a entrar na rede, validando-a.
  
### Validando a Blockchain

A função `isChainValid` verifica a integridade da blockchain como um todo, verificando os hashes de cada block, para ter certeza que nenhum deles foi alterado.

### Licença

This project is open-source and licensed under the MIT License. Feel free to modify and use it as needed.

