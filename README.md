# Acessibilidade fácil

Programa para contar os caracteres de um texto em braile e calcular quantas folhas serão necessárias para imprimi-lo.

Projeto Integrador / Trabalho de Graduação — 4º ano de Análise e Desenvolvimento de Sistemas, Faculdade de Tecnologia de Sorocaba (FATEC).

O documento acadêmico segue o template institucional e as orientações da disciplina (veja [`docs/README.md`(não temos ainda)](docs/README.md)). Este README apresenta o projeto e explica a organização do código e dos documentos.

## Identificação

- **Projeto:** Acessibilidade fácil
- **Equipe:**
  - José Paulo Gomes de Freitas da Silva
  - Maycon Eduardo dos Santos
  - Murilo Reis Schiavotto
  - Vinícius Simões Mendes Zanardo
- **Orientação:** André e Antonio Cesar.
- **Cliente ou parceiro:** associação parceira (_preencher com o nome público, se autorizado_)
- **Disciplina/etapa:** PI
- **Versão analisada:**(não sei oq colocaria aqui)
- **Atualizado em:** 2026-10-27

## Resumo do projeto

A impressão de textos em braile consome muitas folhas, e saber de antemão quantas serão necessárias ajuda a evitar desperdício. O projeto consiste em criar um programa que conta os caracteres em braile de um texto e informa quantas folhas são necessárias para imprimi-lo. O mesmo cálculo também deve funcionar para arquivos `.docx`, ajudando a economizar folhas.

**Situação atual:** a tela foi projetada e desenhada no Canva, a linguagem foi escolhida (o sistema deve servir tanto para PC quanto para dispositivos móveis), a codificação foi iniciada e já existe um programa funcional. A equipe aguarda a data de uma visita para testar e validar o software com a associação.

## Problema, objetivos e avaliação

- **Problema ou necessidade:** estimar a quantidade de folhas necessárias para imprimir um texto em braile, evitando desperdício de papel.
- **Objetivo:** construir um programa que conte os caracteres em braile e calcule o número de folhas de impressão, aceitando arquivos como `.docx` e `.pdf`.
- **Como será avaliado:** teste e validação do software com a associação, em visita ainda sem data definida. Nenhum resultado de validação com a associação foi obtido até esta versão.

## Escopo e situação desta versão

### Incluído ou produzido

| Item | Estado |
|---|---|
| Desenho das telas (Canva) | Concluído |
| Definição da linguagem/tecnologias | Concluído (sujeito a ajustes) |
| Diagrama de casos de uso | Concluído |
| Levantamento de requisitos funcionais e não funcionais | Concluído |
| Programa funcional (anexar arquivo, calcular páginas) | Em andamento — codificação iniciada |
| Configuração de parâmetros da impressora | _confirmar estado_ |
| Validação com a associação | Pendente — aguardando data da visita |

### Fora do escopo ou ainda não iniciado

- Validação com usuários da associação (depende de agendamento).
- Outros itens ainda não definidos pela equipe devem ser registrados em [decisões](docs/decisoes/README.md), se existirem.

### Limitações, premissas e riscos

- O projeto ainda não foi concluído e nem tudo o que vai ocorrer está definido; as tecnologias listadas abaixo são as que a equipe pretende usar por enquanto.
- A precisão do cálculo depende dos parâmetros de impressão informados (RF03, RNF02). O resultado só poderá ser considerado confiável após a validação com a associação.
- A validação depende da data de visita à associação.

## Tecnologias

- HTML
- CSS
- Node.js (vaos usar para o servidor, pois ainda estmos usando o live serve do VScode)

## Requisitos

### Casos de uso

O usuário pode anexar um arquivo e configurar parâmetros. O cálculo de páginas é uma extensão (`<<extend>>`) do caso de uso "Anexar arquivo".

```text
Usuário ── Anexar arquivo ──<<extend>>──▶ Calcular páginas
       └── Configurar parâmetros
```

### Requisitos funcionais (RF)

| ID | Nome | Descrição |
|---|---|---|
| RF01 | Anexar arquivo | Envio do arquivo desejado pelo usuário, com opções de envio por janela de diálogo ou por anexo. |
| RF02 | Calcular páginas | O usuário solicita o cálculo e recebe o retorno com os resultados do cálculo de páginas. |
| RF03 | Configuração de parâmetros | Permitir a mudança completa dos parâmetros da impressora que influenciam o cálculo, para garantir maior precisão. |

### Requisitos não funcionais (RNF)

| ID | Nome | Descrição |
|---|---|---|
| RNF01 | Compatibilidade com formatos de arquivos | Oferecer compatibilidade com os tipos de arquivo mais populares, como `docx` e `pdf`. |
| RNF02 | Precisão de cálculo | Garantir precisão razoável no resultado dos cálculos de páginas. |
| RNF03 | Facilidade de uso | Interface simples e objetiva para o entendimento dos usuários. |
| RNF04 | Resposta rápida | O sistema deve informar os cálculos com rapidez. |
| RNF05 | Resistência a erros | Tratar erros corretamente, mantendo o sistema funcionando em casos como envio de arquivos corrompidos/incompatíveis e erros de cálculo. |
| RNF06 | Personalização fácil | O usuário deve poder configurar e personalizar as opções de maneira rápida. |
| RNF07 | Responsividade | O sistema deve se adaptar e exibir o conteúdo corretamente conforme as dimensões do dispositivo do usuário. |

## Organização do código

Todo o código do projeto fica em [`application/`](application/). Consulte o README dessa pasta para a estrutura interna, os pré-requisitos e como iniciar e validar a aplicação.

| Pasta/arquivo | Propósito |
|---|---|
| [`application/`](application/) | Código-fonte e instruções de execução da aplicação. |
| [`docs/`](docs/README.md) | Documento acadêmico e documentação de apoio (requisitos, casos de uso, protótipos, testes, decisões, continuidade). |

## Componentes e evidências

| Componente ou frente | Estado | Evidência e localização |
|---|---|---|
| Aplicação | Em andamento | `application/` |
| Requisitos e modelos (casos de uso) | Concluído | `docs/` |
| Protótipos de tela | Concluído | Desenhos feitos no Canva (_incluir link ou arquivo em `docs/prototipos/`_) |
| Testes e validação | Pendente | `docs/testes/` (_a criar após a visita_) |
| Documento acadêmico | Em andamento | `docs/` (_informar versão/data_) |

## Rastreabilidade do projeto

| Necessidade/objetivo | Requisito | Caso de uso | Implementação | Validação/evidência | Estado |
|---|---|---|---|---|---|
| Enviar o texto a ser impresso | RF01, RNF01, RNF05 | Anexar arquivo | `application/` | Pendente | Em andamento |
| Saber quantas folhas serão necessárias | RF02, RNF02, RNF04 | Calcular páginas | `application/` | Pendente (visita à associação) | Em andamento |
| Ajustar o cálculo à impressora usada | RF03, RNF06 | Configurar parâmetros | `application/` | Pendente | _confirmar_ |
| Uso simples em PC e celular | RNF03, RNF07 | — | `application/` | Pendente | Em andamento |

## Continuidade entre semestres

_Se o projeto recebeu código, pesquisa ou documentos de uma etapa anterior, registre aqui a linha de base e consulte [continuidade](docs/continuidade/README.md). Se começou nesta etapa, registre que não há linha de base anterior._
