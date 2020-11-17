export function RGBAToHexA(
  r: number | string,
  g: number | string,
  b: number | string,
  a: any
) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = a ? Math.round(a * 255).toString(16) : 255;

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;
  if (a.length === 1) a = "0" + a;

  return "#" + r + g + b + a;
}
