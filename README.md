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
11. [Histórico](#11-histórico)
12. [Problemas comuns](#12-problemas-comuns)

---

## 1. Como o site funciona

O site é uma página só. De cima para baixo:

| # | Parte | Tipo | O que tem |
|---|-------|------|-----------|
| 1 | Entrada (fachada + Shelby GT500) | cena com vídeo | vídeo segue a rolagem; ficha com +17 anos, 86 mil seguidores e SEMA |
| 2 | Nossa história (`#historia`) | seção | texto sobre a loja, números e a foto da equipe com o Renato Garcia (foto: @_gravalos) |
| 3 | Estrutura / boxes (`#estrutura`) | cena com vídeo | vídeo segue a rolagem; uma grade "bento" diferente em cada capítulo (estrutura, PPF, vinil) |
| 4 | Serviços (`#servicos`) | seção | 5 cards com foto (PPF, películas, envelopamento, lavagem, detail). Fica presa na tela um pouco |
| 5 | Lavagem, o carro amarelo (`#padrao`) | cena com vídeo | vídeo **toca sozinho em loop**; ficha com o processo de lavagem |
| 6 | Frase da marca | seção | "Seu carro é a extensão de quem você é." |
| 7 | Correção de pintura (`#detalhamento`) | cena com vídeo | vídeo segue a rolagem; ficha do coating |
| 8 | Projetos recentes (`#projetos`) | seção | **carrossel** de fotos de projetos, em duas faixas |
| 9 | Orçamento (`#contato`) | seção | WhatsApp, endereço e Instagram |

**Efeitos ao passar o mouse** (só no computador):

- **Cards de serviço:** o card sobe, ganha borda dourada, a foto aproxima, o texto completo aparece e os outros ficam apagados.
- **Galeria:** a faixa para, a foto aproxima e mostra o nome do carro.
- **Fotos da grade bento e da história:** a foto aproxima e a legenda sobe.
- **Fichas por cima dos vídeos:** cada card sobe e ganha brilho dourado; a foto aproxima.
- **Barra de serviços (PPF, Vinil, Película, Lavagem, Detalhe):** são botões. O clique leva até o card daquele serviço na seção "Serviços" e deixa o card aceso por alguns segundos.

**Visor de foto (clique):** clicar num card de serviço, numa foto do carrossel ou na foto da equipe abre a foto grande por cima do site, com o texto ao lado. Nos serviços aparece o botão **"Pedir orçamento de [serviço]"** e nos projetos **"Quero um projeto assim"**: os dois abrem o WhatsApp com a mensagem já escrita. Fecha no X, com Esc ou clicando fora. Também funciona pelo teclado (Tab até a foto e Enter).

**Transições entre seções e cenas:** cada seção "derrete" no vídeo vizinho com um degradê, e nas emendas seção → cena passa uma **faixa com a logo da L.A em loop**, que disfarça a troca (`[data-faixa-logos]` no `index.html`).

**Dados oficiais usados** (tirados do Instagram [@l.acustom](https://www.instagram.com/l.acustom/) e do [linktr.ee/lacustom](https://linktr.ee/lacustom)):

- WhatsApp (11) 99674-1058 (botão já abre com a mensagem "Vim pelo site e quero um orçamento")
- Endereço: Av. dos Imarés, 398, Moema, São Paulo
- Avaliação no Google: `g.page/r/CQq8jrJz9e56EAE/review`
- Bio: "Seu carro é a extensão de quem você é. + 17 anos elevando o padrão da estética automotiva."

**O efeito, passo a passo:**

1. Quando a cena chega ao topo da tela, ela fica **presa** (não desce com a página).
2. Enquanto a pessoa continua rolando, o **vídeo avança** (ou volta, se rolar para cima).
3. Cada cena tem **capítulos**. Em cada capítulo, o vídeo anda um trecho, **para**, e aí aparece um título grande com uma frase.
4. Junto com o título aparecem **cartões**: a ficha (foto + 3 destaques), a grade "bento" (na cena dos boxes) e a barra de botões de serviço (PPF, Vinil, Película, Lavagem, Detalhe).
5. Terminada a cena, ela é "solta" e a página segue para a próxima seção, com o degradê e a faixa de logos disfarçando a emenda.

Cada cena tem **exatamente a altura da tela** (`.scene { height: 100vh }` em `css/style.css`). Quem segura a cena enquanto a pessoa rola é o ScrollTrigger (o "pin"). Não aumente essa altura: o vídeo "sobra" na tela depois da cena e aparece repetido.

**Ferramentas usadas** (carregadas de fora, pelo `index.html`):

- **GSAP + ScrollTrigger**: animações e leitura da rolagem.
- **Lenis**: rolagem suave, com inércia.
- **Cloudinary**: hospeda a foto do Shelby e as **capas dos vídeos** (as fotos novas ficam na pasta `images/`).
- **GitHub Pages**: hospeda o site (gratuito).

O site é feito só com **HTML, CSS e JavaScript**, sem etapa de "build": os arquivos que estão aqui são exatamente os que vão para o ar.

---

## 2. Estrutura das pastas

```
sitelacustom/
├── index.html              ← a página: cenas, seções (história, serviços, projetos, orçamento), menu e rodapé
├── favicon.png             ← ícone da aba do navegador (o "A" da logo)
├── css/
│   ├── style.css           ← visual geral (menu, cenas, textos, cartões, rodapé)
│   ├── bento.css           ← visual da grade "bento" e da ficha grande do Shelby
│   ├── sections.css        ← seções novas, carrossel, logo e todos os efeitos de mouse
│   └── desktop-only.css    ← aviso "abra no computador" em telas pequenas
├── js/
│   ├── main.js             ← PONTO DE PARTIDA: liga tudo + AJUSTES de suavidade
│   ├── content/            ← ✏️ CONTEÚDO (dá para editar sem saber programar)
│   │   ├── scenes.js       ← textos dos capítulos e trecho de vídeo de cada um
│   │   ├── cards.js        ← ficha, grade bento e barra de serviços das cenas
│   │   ├── gallery.js      ← fotos e legendas do carrossel "Projetos recentes"
│   │   ├── contact.js      ← número do WhatsApp usado pelo visor de foto
│   │   └── media.js        ← lista das fotos usadas nos cartões
│   └── modules/            ← ⚙️ LÓGICA (só mexer sabendo o que está fazendo)
│       ├── scrollScene.js  ← o "motor" de cada cena (junta tudo)
│       ├── videos.js       ← baixa os vídeos na hora certa e move o vídeo na rolagem
│       ├── animations.js   ← como textos e cartões aparecem; trava dos serviços
│       ├── templates.js    ← monta os textos e cartões na página
│       ├── gallery.js      ← monta o carrossel "Projetos recentes"
│       ├── marquee.js      ← faixas que andam sozinhas (logo em loop) e pausa fora da tela
│       ├── navigation.js   ← botões da barra de serviços e links do menu deslizando
│       ├── lightbox.js     ← visor de foto (abre a foto grande ao clicar)
│       ├── header.js       ← menu do topo
│       ├── math.js         ← contas do efeito (testadas em tests/)
│       └── environment.js  ← computador ou celular? animações reduzidas?
├── images/                 ← fotos (WebP) tiradas do Instagram + logo
│   ├── logo-lacustom.webp  ← logo oficial em versão clara, fundo transparente
│   ├── equipe-renato-garcia.webp ← foto da equipe (Nossa história; foto de @_gravalos)
│   ├── ppf-equipe.webp, peliculas-f150.webp, envelopamento-gt3.webp,
│   │   lavagem-tecnica.webp, coating-ceramico.webp ← fotos dos 5 cards de serviço (720 x 900)
│   └── galeria/            ← fotos do carrossel (480 x 600)
│       └── grande/         ← as mesmas fotos em 960 x 1200, abertas no visor (só baixam ao clicar)
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
  faseDoVideo: 0.8,                     // (opcional) pausa própria deste capítulo
}
```

O hero usa `faseDoVideo: 0.8` (pausa curta), porque ali não tem cartões; uma pausa longa no começo do site parecia uma "travadinha".

### Cartões (ficha do carro, grade bento, barra de serviços)

Arquivo: **`js/content/cards.js`**:

- **`gradesBento`:** uma grade de 6 blocos para cada capítulo da cena dos boxes (estrutura, PPF e vinil). Assim o conteúdo não se repete de um capítulo para o outro.
- **`barraDeServicos`:** os botões e o card de serviço que cada um mostra (`cartao` = o `data-servico` do card no `index.html`).
- **`porCapitulo`:** o que aparece em cada capítulo: qual botão acende, e o título, a foto e os 3 destaques da ficha.

### Cards de serviço e botões da barra

Os 5 cards ficam no `index.html` (seção `SERVIÇOS`). Cada card tem um `data-servico` (ex.: `data-servico="ppf"`), e o botão da barra aponta para ele em `js/content/cards.js` (`barraDeServicos`, campo `cartao`). Para incluir um serviço novo:

1. Copie um bloco `<div class="servicos__item">…</div>` no `index.html`, troque foto, número, título, resumo e detalhe, e dê um `data-servico` novo.
2. Se quiser um botão para ele, acrescente `{ rotulo: "Nome", cartao: "o-data-servico" }` em `barraDeServicos`.
3. A grade tem 5 colunas (`.servicos__grade` em `css/sections.css`); com 6 cards, mude para `repeat(3, 1fr)` ou `repeat(6, 1fr)`.

O texto do visor de foto e a mensagem do WhatsApp são lidos do próprio card: não precisa mexer em mais nada.

### WhatsApp e endereço

O número aparece em **dois tipos de lugar**. Se mudar, troque em todos:

- `js/content/contact.js` (botão do visor de foto);
- `index.html`: procure por `wa.me/5511996741058` (botão do orçamento, menu de celular, rodapé e o botão inicial do visor).

O endereço e o link do Google Maps ficam no bloco `ORÇAMENTO` do `index.html`.

### Textos das seções (história, serviços, frase, orçamento), menu e rodapé

Ficam direto no **`index.html`**. Cada seção começa com um comentário `<!-- ===== NOME ===== -->` para facilitar achar. Elementos com `data-revelar` aparecem subindo quando chegam na tela.

**Dicas de copy usadas no site** (para manter o mesmo tom ao escrever textos novos):

- Fale do **benefício** antes do serviço ("a armadura invisível da sua pintura", não "aplicamos PPF").
- **Frases curtas.** Uma ideia por frase.
- **Prova real:** números e fatos verdadeiros (+17 anos, 86 mil seguidores, SEMA Show 2026).
- **Você, não nós:** o centro da frase é o cliente e o carro dele.
- **Nada inventado:** se não tiver certeza de um dado, deixe de fora.

### Carrossel "Projetos recentes"

Fotos e legendas em **`js/content/gallery.js`**, divididas em duas faixas. Para incluir uma foto:

1. Salve a foto original em qualquer pasta.
2. Gere a versão do site (480 x 600, WebP) com o ffmpeg:

   ```bash
   ffmpeg -i FOTO.jpg -vf "crop=ih*4/5:ih,scale=480:600" -c:v libwebp -quality 76 images/galeria/nome-da-foto.webp
   ```

3. Gere também a versão grande, com o mesmo nome, em `images/galeria/grande/` (troque `scale=480:600` por `scale=960:1200`). É ela que abre no visor ao clicar.
4. Acrescente um item na lista de `js/content/gallery.js` (foto, carro, detalhe e descrição).

### Fotos dos cartões e seções

1. Gere a foto em WebP dentro de `images/` (veja o comando acima; para os cards de serviço use 720 x 900).
2. Coloque o caminho em **`js/content/media.js`** (lista `FOTOS`) ou direto no `index.html`.

Fotos antigas e as capas dos vídeos (o `poster`, que aparece enquanto o vídeo carrega) ficam no **Cloudinary**.

> As fotos vieram do Instagram da própria L.A Custom. Os originais estão em `Documentos\site-lacustom` (OneDrive), junto com as 3 versões da logo.

### Logo

`images/logo-lacustom.webp` é a logo horizontal oficial em versão **clara** (o preto virou branco e o fundo ficou transparente), para combinar com o fundo escuro. Ela foi gerada a partir de `LALOGO2.jpeg`:

```bash
ffmpeg -i LALOGO2.jpeg -vf "format=rgb24,geq=r='if(lt(abs(r(X,Y)-b(X,Y)),45),255-r(X,Y),r(X,Y))':g='if(lt(abs(r(X,Y)-b(X,Y)),45),255-g(X,Y),g(X,Y))':b='if(lt(abs(r(X,Y)-b(X,Y)),45),255-b(X,Y),b(X,Y))',colorkey=0x000000:0.28:0.12,crop=iw-60:ih-40:30:20,scale=360:-2" -c:v libwebp -quality 90 images/logo-lacustom.webp
```

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

Em 1 a 2 minutos o site no ar é atualizado. Depois confira em https://lucasweb2025.github.io/sitelacustom/ (com **Ctrl + Shift + R**, para não ver a versão guardada no navegador).

Para saber se a publicação terminou (precisa do GitHub CLI, `gh`):

```bash
gh api repos/Lucasweb2025/sitelacustom/pages/builds/latest --jq '.status + " " + .commit[0:7]'
```

Quando aparecer `built` com o código do seu último commit, já está no ar.

> Este site é separado do site atual **lacustom.com.br** (o link "Conheça nosso site" do Linktree).

---

## 6. Testes

As contas do efeito de rolagem (em `js/modules/math.js`) têm testes automáticos:

```bash
npm test
```

São 12 testes. Eles conferem, por exemplo:

- no começo da cena, o texto está escondido e o vídeo andando;
- no fim do capítulo, o vídeo para e o texto aparece inteiro;
- um capítulo pode ter a própria pausa (como o hero);
- o ponto para onde um botão leva é o meio da pausa do capítulo, com o texto inteiro na tela.

> **Ao testar no navegador:** se a janela do Chrome estiver minimizada ou coberta por outra, o Chrome congela as animações e a rolagem suave (cai para 2 ou 3 quadros por segundo). Isso não é defeito do site; teste com a janela visível.

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
5. **Sem desfoque de fundo sobre o vídeo:** o efeito de "vidro fosco" (`backdrop-filter`) pesava muito com o vídeo em movimento. Foi trocado por fundo escuro sólido.
6. **Fonte mais leve:** carrega só os 4 pesos usados da fonte Urbanist.
7. **Nada de vídeo no celular:** como o site ainda é só para computador, o celular não baixa vídeo nenhum.
8. **Fotos em WebP e sob demanda:** todas as fotos novas são WebP (de 30 a 100 KB cada) e só baixam quando chegam perto da tela (`loading="lazy"`). As versões grandes do carrossel só baixam quando alguém clica.
9. **Movimento só na tela:** o carrossel e as faixas de logo param quando saem da tela (`animarSoNaTela` em `js/modules/marquee.js`).

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
| `tempoComOsServicosNaTela` | `"+=60%"` | quanto a pessoa rola com os cards de serviço parados na tela |

Em **`js/content/scenes.js`**, cada cena tem:

- `distanciaDeRolagem`: o tamanho da cena (ex.: `"+=260%"` = rolar 2,6 vezes a altura da tela).
- `faseDoVideo`: que parte de cada capítulo é do vídeo andando (ex.: `0.5` = metade). **O resto é a pausa em que os textos e cartões ficam parados na tela.** Número menor = cartões na tela por mais tempo.

Um capítulo pode ter a sua própria `faseDoVideo`, que vale só para ele (é o caso do hero).

Velocidades em `css/sections.css` (número maior = mais devagar):

- carrossel: `animation: galeria-andar-esquerda 70s` (faixa de cima) e `80s` (faixa de baixo);
- faixa de logos: `animation: faixa-andar 45s`.

Tempo que o card de serviço fica aceso depois do clique num botão: `TEMPO_DO_CARD_ACESO_MS` em `js/modules/navigation.js` (2600 = 2,6 segundos).

---

## 9. Padrões do código

- **Nomes em português** dentro do código (variáveis, funções, comentários). Os nomes de **arquivos e pastas** ficam em inglês, que é o que as ferramentas esperam.
- **Uma responsabilidade por arquivo:** conteúdo separado da lógica, e cada parte da lógica no seu módulo.
- **Funções pequenas e com nomes que explicam** o que fazem (ex.: `calcularEstadoDoCapitulo`, `baixarVideosAoSeAproximar`).
- **Contas separadas da página** (`math.js`), para poderem ser testadas.
- **Segurança:** todo texto passa por `protegerTexto` antes de ir para a página. Isso impede que algum texto seja interpretado como código (proteção contra XSS).
- **À prova de falhas:** se as animações derem erro, o site continua aparecendo, só que sem o efeito.
- **Acessibilidade:** quem pediu ao sistema para reduzir animações vê o site sem movimento; o visor de foto é um `<dialog>` (fecha com Esc e prende o foco do teclado); cards e fotos abrem com Tab + Enter; toda foto tem descrição (`alt`).
- Os **nomes de classe do CSS** (ex.: `.scene__video`, `.chapter-panel`) seguem o padrão BEM e ficaram como estavam, porque o HTML e o CSS dependem deles.

---

## 10. Pendências

- [ ] **Versão para celular** (hoje bloqueada). As seções novas e o carrossel já se ajustam a telas pequenas; falta liberar e adaptar as cenas de vídeo.
- [ ] **Vídeos originais:** recodificar a partir dos arquivos gravados, para ganhar qualidade.
- [ ] **Conferir a copy** da seção "Nossa história" com a equipe (ano de fundação, se quiserem citar).
- [ ] **Foto da equipe:** é do fotógrafo @_gravalos (post em parceria com a L.A Custom). Está creditada na legenda; vale confirmar com ele o uso no site.
- [ ] **Definir o papel deste site** em relação ao site atual, lacustom.com.br.
- [x] WhatsApp, endereço e Instagram reais (vindos do Linktree oficial).
- [x] Menu e botões em português.
- [x] Logo oficial no topo, no rodapé e no ícone da aba.

---

## 11. Histórico

Commits principais (mais recentes no fim):

| Data | Commit | O que mudou |
|---|---|---|
| 15/06/2026 | `d15e7c0` | Última versão antiga (antes da otimização) |
| 20/11/2026 | `3341995` | Acentos quebrados corrigidos (arquivos salvos em UTF-8) |
| 20/11/2026 | `c35b663` | Otimização: vídeos recodificados, código em módulos, README |
| 20/11/2026 | `84a25df` | Corrige o vídeo da entrada parado na 1ª rolagem |
| 20/11/2026 | `617d4ad` | Conteúdo real, novas seções, carrossel, logo, botões e transições |
| 21/11/2026 | `729f59f` | Visor de foto com orçamento no WhatsApp |
| 21/11/2026 | `5e76e1e` | Corrige erro no console do botão do visor |

**Defeitos antigos que foram encontrados e corrigidos** (bom saber, para não voltarem):

- **Títulos dos capítulos nunca apareciam:** o painel tinha `opacity: 0` fixo no CSS e a classe de ativo não mudava isso. Agora `.chapter-panel.is-active` tem `opacity: 1`.
- **Vídeo repetido depois da cena** (Mustang e correção de pintura): as cenas tinham 200vh de altura. Agora têm 100vh.
- **Menu acendia o link errado:** os gatilhos do menu eram criados antes das cenas presas e calculavam posições antigas. Agora são criados depois (ordem em `js/main.js`).
- **Vídeo da entrada parado na primeira rolagem:** quando a página abre dentro da cena, o aviso de "entrou na cena" não chega. A cena agora é ativada na primeira rolagem (`aoRolar` em `js/modules/scrollScene.js`).
- **Cards invisíveis:** a animação de entrada e o efeito do mouse mexiam nas mesmas propriedades do mesmo elemento. Por isso cada card fica dentro de uma "moldura" (`.servicos__item`).

---

## 12. Problemas comuns

**O vídeo trava ou "pula" na rolagem**
O vídeo provavelmente não foi preparado com quadro-chave a cada 0,5s. Rode o `ffprobe` da seção 3 e recodifique se precisar.

**Abri o `index.html` com dois cliques e não aparece nada**
É preciso abrir pelo servidor local (`npm run dev`). Veja a seção 4.

**Mudei um vídeo e o site continua mostrando o antigo**
É o cache do navegador. Recarregue com **Ctrl + Shift + R**.

**Mudei um texto e quebrou tudo**
Confira se não faltou uma aspa `"` ou uma vírgula `,` no arquivo de `js/content/`. Abra o site, aperte **F12** e veja a aba **Console**: ela mostra o arquivo e a linha do erro.

**Coloquei uma foto nova e ela não aparece**
Confira o caminho (maiúsculas e minúsculas contam no GitHub Pages: `Foto.webp` é diferente de `foto.webp`) e recarregue com **Ctrl + Shift + R**.

**Um botão da barra não leva a lugar nenhum**
O `cartao` do botão em `js/content/cards.js` precisa ser igual ao `data-servico` de um card no `index.html`.

**As animações ou a rolagem ficaram lentas só no meu teste**
Veja se a janela do Chrome está visível (seção 6): janela minimizada ou coberta congela as animações.
