/*
 * ============================================================
 *  GALERIA "PROJETOS RECENTES" (o carrossel)
 * ============================================================
 *  Fotos de projetos feitos na oficina, tiradas do Instagram
 *  @l.acustom. Elas passam sozinhas pela tela, em duas faixas
 *  (uma para cada lado). Ao passar o mouse, a faixa para, a foto
 *  aproxima e aparece o nome do carro.
 *
 *  Para colocar uma foto nova:
 *  1. Salve a foto na pasta images/galeria (formato .webp,
 *     de preferência com 480 x 600 pixels). O README explica como.
 *  2. Acrescente uma linha na lista abaixo.
 *
 *  - foto: caminho da imagem
 *  - carro: nome do carro (aparece em destaque)
 *  - detalhe: frase curta embaixo do nome
 *  - descricao: o que aparece na foto (lida por leitores de tela,
 *    usados por pessoas com deficiência visual)
 * ============================================================
 */

export const GALERIA = {
  // Faixa de cima (anda para a esquerda)
  primeiraFaixa: [
    {
      foto: "images/galeria/porsche-911-cup.webp",
      carro: "Porsche 911 de pista",
      detalhe: "Projeto L.A Custom",
      descricao: "Porsche 911 branco de pista sob a iluminação hexagonal da oficina",
    },
    {
      foto: "images/galeria/bmw-m3-beaver.webp",
      carro: "BMW M3",
      detalhe: "Customização com a Beaver",
      descricao: "BMW M3 envelopado em branco, rosa e roxo com a marca Beaver",
    },
    {
      foto: "images/galeria/skyline-r33.webp",
      carro: "Nissan Skyline GT-R R33",
      detalhe: "Direto do Japão, tratamento completo",
      descricao: "Nissan Skyline GT-R R33 prata visto de trás, na oficina",
    },
    {
      foto: "images/galeria/porsche-911-faixa.webp",
      carro: "Porsche 911",
      detalhe: "Faixas de competição",
      descricao: "Porsche 911 branco com faixa vermelha, visto de frente",
    },
    {
      foto: "images/galeria/peliculas-f150.webp",
      carro: "Ford F-150",
      detalhe: "Proteção e acabamento",
      descricao: "Ford F-150 cinza dentro da oficina",
    },
    {
      foto: "images/galeria/porsche-macan.webp",
      carro: "Porsche Macan",
      detalhe: "Pronto para a entrega",
      descricao: "Porsche Macan prata sob a iluminação hexagonal da oficina",
    },
  ],

  // Faixa de baixo (anda para a direita)
  segundaFaixa: [
    {
      foto: "images/galeria/envelopamento-gt3.webp",
      carro: "Porsche 911 GT3 RS",
      detalhe: "Personalidade com proteção",
      descricao: "Porsche 911 GT3 RS azul com capô preto",
    },
    {
      foto: "images/galeria/porsche-prata-faixa.webp",
      carro: "Porsche 911",
      detalhe: "Prata com faixa vermelha",
      descricao: "Porsche 911 prata com faixa vermelha, visto de cima",
    },
    {
      foto: "images/galeria/ppf-equipe.webp",
      carro: "Aplicação de PPF",
      detalhe: "Feita à mão, sob luz técnica",
      descricao: "Equipe da L.A Custom aplicando PPF em um Porsche preto",
    },
    {
      foto: "images/galeria/porsche-roda-bbs.webp",
      carro: "Porsche de pista",
      detalhe: "Cada detalhe conta",
      descricao: "Roda dourada de um Porsche branco de pista",
    },
    {
      foto: "images/galeria/oficina-vista-aerea.webp",
      carro: "Nossa oficina",
      detalhe: "Cada carro no seu box",
      descricao: "Vista de cima da oficina da L.A Custom com vários carros",
    },
  ],
};
