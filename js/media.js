/** URLs de mídia no Cloudinary — desktop otimizado */
const CLOUD = "https://res.cloudinary.com/dcc2fweye";
const VIDEO_TRANSFORM = "w_1280,c_limit,q_auto:eco,vc_h264,f_mp4";

function cloudVideo(name) {
  return `${CLOUD}/video/upload/${VIDEO_TRANSFORM}/la-custom/site/${name}.mp4`;
}

const MEDIA = {
  fachada: `${CLOUD}/image/upload/f_auto,q_auto,w_1920/la-custom/site/fachada`,
  boxesWide: `${CLOUD}/image/upload/f_auto,q_auto,w_1200/la-custom/site/boxes-wide`,
  lavagem: `${CLOUD}/image/upload/f_auto,q_auto,w_1200/la-custom/site/lavagem`,
  shelby: `${CLOUD}/image/upload/f_auto,q_auto,w_1000/la-custom/site/shelby`,
  lavagemAction: `${CLOUD}/image/upload/f_auto,q_auto,w_1000/la-custom/site/lavagem-action`,
  featureDetail: `${CLOUD}/image/upload/f_auto,q_auto,w_1000/la-custom/site/feature-detail`,
  aston: `${CLOUD}/image/upload/f_auto,q_auto,w_800/la-custom/site/aston`,
  videos: {
    entrada: cloudVideo("entrada"),
    boxes: cloudVideo("boxes"),
    lavagem: cloudVideo("lavagem"),
  },
};
