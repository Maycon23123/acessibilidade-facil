# Aplicação — Estimador de páginas em braile

Esta pasta contém o código da aplicação web do projeto **Acessibilidade fácil**: um programa que estima quantas folhas serão necessárias para imprimir um texto em braile, a partir de texto digitado ou de arquivos `.txt`, `.md`, `.pdf` e `.docx`.

Atualmente a aplicação é **somente frontend** (HTML, CSS e JavaScript executados no navegador). Não há backend: todo o processamento do texto e o cálculo acontecem no próprio navegador, e nenhum dado do usuário é enviado a servidor.

## Estrutura e responsabilidades

| Caminho | Responsabilidade | Tecnologia/versão |
|---|---|---|
| `index.html` | Página única: carrega estilos, bibliotecas e o ponto de entrada `js/main.js` | HTML5 |
| `Components/` | Fragmentos HTML (envio de arquivo, configurações, caixa de texto, resultado), carregados dinamicamente por `js/loader.js` | HTML5 |
| `css/` | Estilos por componente (`home`, `menu`, `dropzone`, `settings`, `textbox`, `result`) e paleta de cores (`colors.css`) | CSS3 |
| `js/main.js` | Ponto de entrada: carrega os componentes, liga o botão "Estimar páginas" e exibe o resultado | JavaScript (módulos ES) |
| `js/loader.js` | Carrega um fragmento de `Components/` dentro de um elemento da página | JavaScript (módulos ES) |
| `js/dropzone.js` | Área de arrastar e soltar / selecionar arquivo; extrai o texto de TXT, MD, PDF e DOCX | JavaScript + PDF.js e Mammoth.js |
| `js/settings.js` | Preenche as opções de configuração, salva e devolve os valores atuais | JavaScript (módulos ES) |
| `models/settings.js` | Classe `Settings`: papéis, graus de contração, margens, valores padrão e persistência em `localStorage` | JavaScript (módulos ES) |
| `models/braille.js` | Classe `BrailleEstimator`: calcula colunas, linhas e número de páginas | JavaScript (módulos ES) |

Não existem `backend/` nem `mobile/` neste momento. A interface é responsiva (RNF07), então a mesma página deve servir PC e dispositivos móveis. Uma versão móvel separada não está prevista nesta etapa.

### Bibliotecas externas (carregadas por CDN)

| Biblioteca | Versão | Uso |
|---|---|---|
| [PDF.js](https://mozilla.github.io/pdf.js/) | 3.11.174 | Extrair texto de arquivos `.pdf` |
| [Mammoth.js](https://github.com/mwilliamson/mammoth.js) | 1.8.0 | Extrair texto de arquivos `.docx` |
| Open Sans (Google Fonts) | 400, 600, 700 | Fonte da interface |

Como são carregadas por CDN, a leitura de PDF e DOCX e a fonte exigem conexão com a internet. Sem ela, arquivos `.txt`/`.md` e a digitação direta continuam funcionando, com a fonte padrão do navegador.

## Como o cálculo funciona

O cálculo está em `models/braille.js` e usa estas premissas (valores aproximados, ainda **não validados** com a associação):

- Cela braile com cerca de 0,6 cm de largura e linha com cerca de 1,0 cm de altura.
- Colunas = (largura do papel − 2 × margem) ÷ largura da cela; linhas = (altura do papel − 2 × margem) ÷ altura da linha.
- Maiúsculas e números recebem celas extras de sinal.
- Grau 2 (contraído) reduz o tamanho das palavras em cerca de 25%.
- O texto é distribuído em linhas respeitando quebras de parágrafo e palavras maiores que a linha; páginas = linhas ÷ linhas por página, arredondado para cima.

Opções configuráveis (RF03): papel (A4, A5, Carta, Ofício), contração (Grau 1 ou Grau 2) e margem (1 a 3 cm). As configurações são salvas no `localStorage` do navegador.

Estado atual da interface: o resultado exibe apenas o total de páginas (`Estimativa: N pgs`). O cálculo também produz colunas, linhas e linhas por página, mas esses valores ainda não aparecem na tela.

## Pré-requisitos

| Ferramenta ou serviço | Versão utilizada | Como verificar |
|---|---|---|
| Navegador moderno com suporte a módulos ES (Chrome, Edge, Firefox ou Safari atuais) | A preencher pela equipe (versão em que a equipe testou) | Abrir `index.html` por um servidor local (ver abaixo) e verificar se a página carrega |
| Servidor HTTP local para arquivos estáticos | Qualquer um. A equipe usa a extensão **Live Server** do VS Code | Ver seção de execução |
| Conexão com a internet | Não aplicável | Necessária para PDF.js, Mammoth.js e fonte (CDN) |
| Node.js | **Não é necessário hoje.** A equipe pretende usá-lo no servidor no futuro | `node -v` (somente se for usar para servir ou testar) |

**Para desenvolver:** editor de código (a equipe usa VS Code) e um servidor estático local.
**Para executar:** apenas navegador e servidor estático; não há etapa de build nem dependências a instalar.

> A aplicação **não funciona abrindo `index.html` direto pelo arquivo** (`file://`), porque os componentes são carregados com `fetch` e os scripts usam módulos ES. Use sempre um servidor local.

## Configuração segura

A aplicação não usa variáveis de ambiente, credenciais, chaves ou tokens, então não há `.env` nem `.env.example` por enquanto. Caso um servidor Node.js seja adicionado, crie um `.env.example` com valores fictícios, mantenha o `.env` fora do Git e não inclua dados reais do cliente.

Os arquivos enviados pelo usuário são lidos apenas no navegador e não são armazenados nem enviados a nenhum servidor. Somente as opções de configuração (papel, contração, margem) ficam salvas no `localStorage`.

## Instalação, execução e validação

Não há dependências a instalar (sem `package.json`).

**Opção 1 — Live Server (VS Code), usada pela equipe**

1. Instale a extensão *Live Server* no VS Code.
2. Abra a pasta do projeto, clique com o botão direito em `application/index.html` e escolha **Open with Live Server**.
3. Para encerrar, clique em **Port** (ou **Go Live**) na barra de status do VS Code.

**Opção 2 — Servidor estático por linha de comando** (alternativa, sem VS Code; requer Python 3)

    cd application
    python3 -m http.server 8080

Depois acesse `http://localhost:8080`. Para encerrar, pressione `Ctrl+C`.

**Validação manual (roteiro mínimo)**

1. Digite ou cole um texto na caixa e clique em **Estimar páginas**; o resultado deve mostrar `Estimativa: N pgs`.
2. Envie um arquivo `.txt`, `.docx` e `.pdf` (arraste ou use **Selecionar arquivo**); o texto deve aparecer na caixa e a estimativa deve ser atualizada.
3. Altere papel, contração e margem, clique em **Salvar configurações**, recarregue a página e confira se as opções foram mantidas.
4. Envie um formato não suportado (por exemplo `.png`); deve aparecer o aviso de formato não suportado.
5. Escolha uma margem grande demais para um papel pequeno; deve aparecer o aviso de margem grande demais.

**Testes automatizados:** ainda não existem. Estão pendentes e devem ser registrados em `docs/testes/` quando criados.

## Limitações conhecidas

- O cálculo é uma **estimativa** baseada nas premissas acima. Ele só poderá ser considerado confiável após validação com a associação (RNF02).
- PDFs digitalizados (imagens) não têm texto extraível e geram um aviso; não há OCR.
- A extração de texto de PDF une os itens de cada página com espaços, então a separação de linhas e parágrafos do original pode não ser preservada, o que pode afetar a contagem de linhas.
- O sistema lê apenas o primeiro arquivo enviado; não há processamento em lote.
- O cabeçalho (`<header id="menu">`) ainda está vazio, e os estilos de menu estão preparados, mas sem conteúdo.
- Depende de CDN externo para PDF.js, Mammoth.js e a fonte.

## Configuração integrada (se aplicável)

Não se aplica. A aplicação é um único componente estático, sem Docker Compose ou orquestração de serviços. Se um servidor Node.js for adicionado, esta seção deve ser atualizada com a forma de iniciar os componentes juntos.

## Relação com outras pastas

- **App móvel independente:** não existe `mobile/` neste projeto.
- **Dados, análises ou pipelines:** não existe `data/` neste projeto.
- **Documentação acadêmica e artefatos:** [`docs/`](../docs/) (casos de uso, requisitos e documento acadêmico; `docs/README.md` ainda não existe).
- **Backlog do produto:** não adotado.
- **README geral do projeto:** [`README.md`](../README.md) (requisitos RF01–RF03 e RNF01–RNF07, rastreabilidade e estado do projeto).

## Estado desta versão

A aplicação roda localmente com texto digitado e com arquivos TXT, MD, PDF e DOCX, calculando o número de páginas conforme papel, contração e margem escolhidos. Ainda não há testes automatizados, e o cálculo ainda não foi validado com a associação (ASAC), pois a visita não tem data definida. A equipe atualizará este trecho quando houver evidência reproduzível.
