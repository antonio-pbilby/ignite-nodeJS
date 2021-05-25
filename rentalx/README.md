**Requisitos funcionais**

O que a aplicação deve fazer.

**Requisitos não funcionais**

Implementação de banco de dados, quais bibliotecas/frameworks serão usados.

**Regras de negócio**

Quais são as regras que norteiam as funcionalidades da aplicação, como ela pode fazer o que ela deve fazer.

# Cadastro de carro

**RF**

Deve ser possível cadastrar um novo carro.

**RN**

Não deve ser possível cadastar mais de um carro com a mesma placa.
Ao ser cadastrado, por padrão, o carro deve estar disponível.
* Somente um usuário administrador deve ser capaz de cadastrar um carro.

# Listagem de carros

**RF**

Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponívels pelo nome da categoria.
Deve ser possível listar todos os carros disponívels pelo nome da marca.
Deve ser possível listar todos os carros disponívels pelo nome do carro.

**RN**

O usuário não precisa estar logado no sistema.

# Cadastro de Especificação do carro

**RF**

Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**

Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação duplicada para o mesmo carro.
Somente um usuário administrador deve ser capaz de cadastrar uma especificação.

# Cadastro de imagens do carro

**RF**

Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros

**RNF**

Utilizar o Multer para upload dos arquivos

**RN**

O usuário pode cadastrar mais de uma imagem para o mesmo carro. 
Somente um usuário administrador deve ser capaz de cadastrar uma imagem.

# Aluguel de carro

**RF**

Deve ser possível cadastrar um aluguel

**RN**

O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.