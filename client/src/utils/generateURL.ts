const Base_URL = "https://coolage.herokuapp.com";

interface IGenerateURLArgs {
  r: number;
  g: number;
  b: number;
  a?: number | undefined;
  h: number;
  w: number;
}
export default function GenerateURL(schema: IGenerateURLArgs): String {
  let { r, g, b, a, h, w } = schema;
  if (a == undefined) {
    a = 255;
  } else {
    a = Math.round(a * 255);
  }

  return `${Base_URL}/?h=${h}&w=${w}&r=${r}&g=${g}&g=${g}&b=${b}&a=${a}`;
}
