# L.A Custom — Site

Site de apresentação da **L.A Custom** (PPF, envelopamento, film, lavagem e correção de pintura), com o efeito de **vídeo controlado pela rolagem**: conforme a pessoa rola a página, o vídeo anda junto, e textos e cartões vão aparecendo por cima.

**Site no ar:** https://lucasweb2025.github.io/sitelacustom/

> Hoje a experiência completa é **só para computador** (telas a partir de 1024px). No celular aparece um aviso pedindo para abrir no computador.

---

## Sumário

1. [Como o site funciona](#1-como-o-site-funciona)
2. [Estrutura das pastas](#2-estrutura-das-pastas)
3. [Como mudar textos, fotos e vídeos](#3-como-mudar-textos-fotos-e-vídeos)
4. [Como abrir o site no seu computador](#4-como-abrir-o-site-no-seu-computador)
5. [Como publicar](#5-como-publicar)
6. [Testes](#6-testes)
7. [Desempenho: o que deixa o site leve](#7-desempenho-o-que-deixa-o-site-leve)
8. [Ajustes de suavidade](#8-ajustes-de-suavidade)
9. [Padrões do código](#9-padrões-do-código)
10. [Pendências](#10-pendências)
11. [Problemas comuns](#11-problemas-comuns)

---

## 1. Como o site funciona

O site é uma página só, dividida em **4 cenas** e um bloco final de contato:

| # | Cena | Vídeo | Comportamento |
|---|------|-------|---------------|
| 1 | Entrada (fachada + Shelby GT500) | `videos/entrada.mp4` | vídeo segue a rolagem |
| 2 | Boxes (PPF e envelopamento) | `videos/boxes.mp4` | vídeo segue a rolagem + grade de cartões |
| 3 | Lavagem (o carro amarelo) | `videos/lavagem.mp4` | vídeo **toca sozinho em loop** |
| 4 | Correção de pintura | `videos/detalhamento.mp4` | vídeo segue a rolagem |
| — | "Agende seu orçamento" | — | botão de WhatsApp |

**O efeito, passo a passo:**

1. Quando a cena chega ao topo da tela, ela fica **presa** (não desce com a página).
2. Enquanto a pessoa continua rolando, o **vídeo avança** (ou volta, se rolar para cima).
3. Cada cena tem **capítulos**. Em cada capítulo, o vídeo anda um trecho, **para**, e aí aparece um título grande com uma frase.
4. Junto com o título aparecem **cartões**: a ficha do carro (foto + números), a grade "bento" (na cena dos boxes) e a barra de serviços (PPF, WRAP, FILM, WASH, DETAIL).
5. Terminada a cena, ela é "solta" e a próxima entra, com um escurecimento suave entre as duas.

**Ferramentas usadas** (carregadas de fora, pelo `index.html`):

- **GSAP + ScrollTrigger**: animações e leitura da rolagem.
- **Lenis**: rolagem suave, com inércia.
- **Cloudinary**: hospeda as **fotos** e entrega cada uma no formato mais leve.
- **GitHub Pages**: hospeda o site (gratuito).

O site é feito só com **HTML, CSS e JavaScript**, sem etapa de "build": os arquivos que estão aqui são exatamente os que vão para o ar.

---

## 2. Estrutura das pastas

```
sitelacustom/
├── index.html              ← a página (estrutura das cenas, vídeos, menu e rodapé)
├── css/
│   ├── style.css           ← visual geral (menu, cenas, textos, cartões, rodapé)
│   ├── bento.css           ← visual da grade "bento" e da ficha grande do Shelby
│   └── desktop-only.css    ← aviso "abra no computador" em telas pequenas
├── js/
│   ├── main.js             ← PONTO DE PARTIDA: liga tudo + AJUSTES de suavidade
│   ├── content/            ← ✏️ CONTEÚDO (dá para editar sem saber programar)
│   │   ├── scenes.js       ← textos dos capítulos e trecho de vídeo de cada um
│   │   ├── cards.js        ← ficha do carro, grade bento, barra de serviços
│   │   └── media.js        ← endereços das fotos (Cloudinary)
│   └── modules/            ← ⚙️ LÓGICA (só mexer sabendo o que está fazendo)
│       ├── scrollScene.js  ← o "motor" de cada cena (junta tudo)
│       ├── videos.js       ← baixa os vídeos na hora certa e move o vídeo na rolagem
│       ├── animations.js   ← como textos e cartões aparecem
│       ├── templates.js    ← monta os textos e cartões na página
│       ├── header.js       ← menu do topo
│       ├── math.js         ← contas do efeito (testadas em tests/)
│       └── environment.js  ← computador ou celular? animações reduzidas?
├── videos/                 ← os 4 vídeos do site (já otimizados)
├── tests/
│   └── math.test.js        ← testes automáticos das contas
├── package.json            ← comandos: npm run dev / npm test
└── .nojekyll               ← avisa o GitHub Pages para publicar os arquivos como estão
```

**Regra de ouro:** para mudar **o que** aparece, mexa em `js/content/`. Para mudar **como** funciona, mexa em `js/modules/`.

Todo o código está em **português** e comentado de um jeito que dá para entender sem ser programador.

---

## 3. Como mudar textos, fotos e vídeos

### Textos dos capítulos

Arquivo: **`js/content/scenes.js`**. Cada capítulo tem:

```js
{
  sobretitulo: "Serviço 01",            // texto pequeno acima do título
  titulo: ["PPF", "PROTEÇÃO"],          // cada item = uma linha do título grande
  linhaEmDestaque: 0,                   // qual linha fica dourada (0 = primeira)
  texto: "Película de proteção ...",   // frase abaixo do título
  inicioDoVideo: 0.28,                  // trecho do vídeo (0 = começo, 1 = fim)
  fimDoVideo: 0.58,
}
```

### Cartões (ficha do carro, grade bento, barra de serviços)

Arquivo: **`js/content/cards.js`**. No final dele, `porCapitulo` define o que aparece em cada capítulo, por exemplo qual bolinha de serviço acende ou qual carro aparece na ficha.

### Textos fixos (menu, "Agende seu orçamento", WhatsApp, endereço, rodapé)

Ficam direto no **`index.html`**.

### Fotos

1. Suba a foto no **Cloudinary**, na pasta `la-custom/site`.
2. Em **`js/content/media.js`**, coloque o nome dela na lista `FOTOS`.
3. Use essa foto em `js/content/cards.js`.

As imagens de capa dos vídeos (o `poster`, que aparece enquanto o vídeo carrega) ficam no `index.html`.

### Vídeos

Os vídeos **precisam de uma preparação especial** para a rolagem ficar lisa. Um vídeo comum tem um "quadro-chave" a cada 10 segundos, e para pular para um ponto qualquer o navegador precisa recalcular centenas de quadros. É isso que deixava o site travando.

Para trocar um vídeo, prepare o arquivo com o **ffmpeg** (já instalado no computador) e salve com o mesmo nome na pasta `videos/`.

**Vídeos que seguem a rolagem** (entrada, boxes, detalhamento):

```bash
ffmpeg -i ORIGINAL.mp4 -an -vf "scale=1280:-2" -c:v libx264 -preset veryslow -tune film \
  -crf 28 -g 12 -keyint_min 12 -sc_threshold 0 -bf 0 -pix_fmt yuv420p \
  -movflags +faststart videos/entrada.mp4
```

**Vídeo em loop** (lavagem):

```bash
ffmpeg -i ORIGINAL.mp4 -an -vf "scale=1280:-2" -c:v libx264 -preset veryslow -tune film \
  -crf 26 -g 48 -pix_fmt yuv420p -movflags +faststart videos/lavagem.mp4
```

O que cada parte faz:

| Opção | Para quê |
|-------|----------|
| `-an` | tira o áudio (o site não usa som) |
| `scale=1280:-2` | 1280px de largura (bom equilíbrio entre qualidade e peso) |
| `-crf 28` | nível de compressão. Menor = mais qualidade e mais pesado (24 a 30 é a faixa boa) |
| `-g 12 -keyint_min 12 -sc_threshold 0` | **quadro-chave a cada 12 quadros (0,5s)**. É o que deixa a rolagem lisa |
| `-bf 0` | facilita pular para qualquer ponto do vídeo |
| `-movflags +faststart` | o vídeo começa a tocar antes de terminar de baixar |

> **Dica:** sempre parta do vídeo **original** (o gravado), não de um que já foi comprimido. Assim a qualidade fica melhor com o mesmo peso.

Para conferir se o vídeo ficou certo (deve listar um quadro-chave a cada 0,5s):

```bash
ffprobe -v error -select_streams v:0 -skip_frame nokey -show_entries frame=pts_time -of csv=p=0 videos/entrada.mp4
```

---

## 4. Como abrir o site no seu computador

Precisa do **Node.js** instalado. Na pasta do projeto:

```bash
npm run dev
```

Depois abra **http://localhost:5610/** no Chrome.

> Não dá para abrir o `index.html` com dois cliques: o código usa "módulos" do JavaScript, e o navegador só permite isso quando o site é servido por um servidor (mesmo que local).

---

## 5. Como publicar

O site é publicado pelo **GitHub Pages**, a partir da branch `main`. Para colocar no ar:

```bash
git add .
git commit -m "Descreva o que mudou"
git push
```

Em 1 a 2 minutos o site no ar é atualizado. Depois confira em https://lucasweb2025.github.io/sitelacustom/.

---

## 6. Testes

As contas do efeito de rolagem (em `js/modules/math.js`) têm testes automáticos:

```bash
npm test
```

Eles conferem, por exemplo, que no começo da cena o texto está escondido e o vídeo andando, e que no fim do capítulo o vídeo para e o texto aparece inteiro.

---

## 7. Desempenho: o que deixa o site leve

Otimização feita em **novembro de 2026**. Teste de rolagem automática (página inteira em 16s), antes e depois:

| | Antes | Depois |
|---|---|---|
| Fluidez da rolagem | 24 quadros/s | 59 quadros/s |
| Travadas (quadros acima de 50ms) | 49 | 2 |
| Pedidos de vídeo durante a rolagem | 28 (baixava de novo) | 4 (uma vez cada) |

O que foi feito:

1. **Vídeos recodificados** com quadro-chave a cada 0,5s (antes eram só 2 por vídeo). Essa era a causa principal das travadas.
2. **Cada vídeo é baixado uma vez só.** Antes, ao sair de uma cena, o vídeo era descartado e baixado de novo na volta.
3. **Carregamento na hora certa:** o vídeo da entrada começa a baixar assim que a página abre; os outros, quando a pessoa está chegando perto da cena deles.
4. **Pulos do vídeo organizados:** no máximo um pedido por quadro da tela, sem acumular pedidos (veja `criarControleDeBusca` em `js/modules/videos.js`).
5. **Sem desfoque de fundo sobre o vídeo:** o efeito de "vidro fosco" (`backdrop-filter`) pesava muito com o vídeo em movimento. Foi trocado por um fundo escuro semitransparente.
6. **Fonte mais leve:** carrega só os 4 pesos usados da fonte Urbanist.
7. **Nada de vídeo no celular:** como o site ainda é só para computador, o celular não baixa vídeo nenhum.

Peso dos vídeos (1280px):

| Vídeo | Peso |
|---|---|
| entrada.mp4 | 4,9 MB |
| boxes.mp4 | 2,1 MB |
| lavagem.mp4 | 1,7 MB |
| detalhamento.mp4 | 1,3 MB |

---

## 8. Ajustes de suavidade

No topo de **`js/main.js`** fica o bloco `AJUSTES`:

| Ajuste | Valor atual | O que faz |
|---|---|---|
| `inerciaDaRolagem` | `0.075` | quanto a página "desliza" depois de girar a roda do mouse. Menor = mais macio |
| `velocidadeDaRoda` | `0.9` | quanto a página anda a cada giro da roda |
| `atrasoDoVideo` | `0.6` | segundos que o vídeo leva para alcançar a rolagem (movimento macio) |
| `menorMudancaDoVideo` | `1/48` | o vídeo só muda de quadro se a diferença for maior que isso |

Para deixar uma cena mais longa ou mais curta, mude `distanciaDeRolagem` dela em `js/content/scenes.js` (ex.: `"+=180%"` = rolar 1,8 vezes a altura da tela).

---

## 9. Padrões do código

- **Nomes em português** dentro do código (variáveis, funções, comentários). Os nomes de **arquivos e pastas** ficam em inglês, que é o que as ferramentas esperam.
- **Uma responsabilidade por arquivo:** conteúdo separado da lógica, e cada parte da lógica no seu módulo.
- **Funções pequenas e com nomes que explicam** o que fazem (ex.: `calcularEstadoDoCapitulo`, `baixarVideosAoSeAproximar`).
- **Contas separadas da página** (`math.js`), para poderem ser testadas.
- **Segurança:** todo texto passa por `protegerTexto` antes de ir para a página. Isso impede que algum texto seja interpretado como código (proteção contra XSS).
- **À prova de falhas:** se as animações derem erro, o site continua aparecendo, só que sem o efeito.
- Os **nomes de classe do CSS** (ex.: `.scene__video`, `.chapter-panel`) seguem o padrão BEM e ficaram como estavam, porque o HTML e o CSS dependem deles.

---

## 10. Pendências

- [ ] **Versão para celular** (hoje bloqueada). Ideia: fotos e um vídeo leve, sem o efeito de rolagem.
- [ ] **WhatsApp real:** os botões apontam para `https://wa.me/5500000000000`, um número de exemplo.
- [ ] **Endereço real:** está como "Av. — nº 398".
- [ ] **Instagram:** o link do rodapé não leva a lugar nenhum (`href="#"`).
- [ ] **Menu em português:** os itens estão em inglês ("Performance", "Technology"...), e dois deles levam para o mesmo lugar.
- [ ] **Vídeos originais:** recodificar a partir dos arquivos gravados, para ganhar qualidade.

---

## 11. Problemas comuns

**O vídeo trava ou "pula" na rolagem**
O vídeo provavelmente não foi preparado com quadro-chave a cada 0,5s. Rode o `ffprobe` da seção 3 e recodifique se precisar.

**Abri o `index.html` com dois cliques e não aparece nada**
É preciso abrir pelo servidor local (`npm run dev`). Veja a seção 4.

**Mudei um vídeo e o site continua mostrando o antigo**
É o cache do navegador. Recarregue com **Ctrl + Shift + R**.

**Mudei um texto e quebrou tudo**
Confira se não faltou uma aspa `"` ou uma vírgula `,` no arquivo de `js/content/`. Abra o site, aperte **F12** e veja a aba **Console**: ela mostra o arquivo e a linha do erro.
