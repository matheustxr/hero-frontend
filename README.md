# Projeto Frontend - Gerenciador de Super-Heróis

## Sobre o Projeto

Este projeto é a interface de usuário (Frontend) para um sistema de Gerenciamento de Super-Heróis. Ele funciona como uma Aplicação de Página Única (SPA) que se comunica com uma API REST para realizar suas funções.

O objetivo foi desenvolver uma interface funcional e de fácil utilização para o usuário final.

## Funcionalidades

* **Listagem de Heróis**: Exibe todos os heróis cadastrados.
* **Formulário de Criação e Edição**: Permite o cadastro e a edição de heróis através de um formulário com validação de dados.
* **Exclusão com Confirmação**: Apresenta um diálogo de confirmação antes de excluir um herói para evitar ações acidentais.
* **Notificações de Feedback**: Informa o usuário sobre o resultado de suas ações (sucesso ou falha) através de notificações.
* **Roteamento**: Permite a navegação entre as diferentes telas do sistema (listagem, criação e edição).

## Tecnologias Utilizadas e Justificativa

As tecnologias foram selecionadas para construir uma aplicação moderna e eficiente.

* **React**: Biblioteca para a construção de interfaces de usuário baseadas em componentes.
* **Vite**: Ferramenta utilizada para a criação e execução do projeto, escolhida por sua alta velocidade no desenvolvimento.
* **TypeScript**: Adicionado ao JavaScript para garantir a segurança de tipos no código, o que ajuda a prevenir erros.
* **Tailwind CSS**: Framework para estilização que permite a criação de layouts diretamente no código HTML de forma ágil.
* **Shadcn/ui**: Biblioteca de componentes visuais (botões, cards, etc.) utilizada para acelerar a construção de uma interface consistente.
* **React Hook Form & Zod**: Ferramentas usadas para o gerenciamento e validação dos formulários, garantindo que os dados enviados à API estejam corretos.
* **Axios**: Cliente HTTP utilizado para realizar a comunicação com a API backend.

## Como Executar

**Pré-requisitos:**
* Node.js e npm
* A API backend do projeto deve estar em execução.

**Passos:**
1.  Clone o repositório.
2.  Navegue até a pasta do projeto: `cd hero-frontend`
3.  Instale as dependências: `npm install`
4.  Execute o servidor de desenvolvimento: `npm run dev`
5.  Abra o navegador e acesse o endereço fornecido no terminal (geralmente `http://localhost:5173`).

> **Nota:** A URL da API pode ser configurada no arquivo `src/services/apiService.ts`.
