import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Fab,
} from "@material-ui/core";
import { ChromePicker, RGBColor, ColorResult } from "react-color";
import { FileCopy } from "@material-ui/icons";
import ClipboardJS from "clipboard";
import { Helmet } from "react-helmet";

import GenerateURL from "./utils/generateURL";
import IMG_Click2Copy from "./assets/click-to-copy.png";

export default function PickerContainer() {
  useEffect(() => {
    new ClipboardJS(".btn-to-copy");
  }, []);
  const [color, setColor] = useState<any>({
    rgb: {
      a: 1,
      b: 255,
      g: 255,
      r: 255,
    },
  });

  const [dimensions, setDimensions] = useState({
    h: 10,
    w: 10,
  });
  return (
    <>
      <Helmet>
        <meta name="theme-color" content={color.hex} data-react-helmet="true" />
      </Helmet>
      <Grid
        container
        style={{ margin: "auto" }}
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item md={"auto"}>
          <ChromePicker
            color={color.rgb}
            onChange={(color) => {
              const { r, g, b, a } = color.rgb;
              setColor({ ...color, hex: RGBAToHexA(r, g, b, a) });
            }}
          />
        </Grid>
        <Grid item md={"auto"}>
          <Paper style={{ padding: "1rem 0.5rem", position: "relative" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                fontSize: "0.75rem",
              }}
            >
              <TextField
                placeholder="Width"
                variant="standard"
                size="small"
                type="number"
                style={{ width: 70 }}
                value={dimensions.w}
                onChange={(e) => {
                  setDimensions({ ...dimensions, w: parseInt(e.target.value) });
                }}
              />
              <Typography variant="caption">x</Typography>
              <TextField
                placeholder="Height"
                variant="standard"
                size="small"
                type="number"
                style={{ width: 70 }}
                value={dimensions.h}
                onChange={(e) => {
                  setDimensions({ ...dimensions, h: parseInt(e.target.value) });
                }}
              />
            </div>
            <div
              style={{
                padding: "3px",
                display: "flex",
                marginTop: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  overflowX: "scroll",
                  width: 200,
                  padding: "5px",
                  background: "#eee",
                }}
              >
                <Typography variant="caption" noWrap id="copy-cont">
                  {GenerateURL({ ...color.rgb, ...dimensions })}
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                position: "absolute",
                bottom: "-90px",
                right: "-12%",
              }}
            >
              <img src={IMG_Click2Copy} style={{ width: 170 }} />
              <Fab
                data-clipboard-action="copy"
                data-clipboard-target="#copy-cont"
                variant="round"
                color="primary"
                style={{ top: "-15px" }}
                className="btn-to-copy"
              >
                <FileCopy fontSize="small" />
              </Fab>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

function RGBAToHexA(
  r: number | string,
  g: number | string,
  b: number | string,
  a: any
) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = a ? Math.round(a * 255).toString(16) : 255;

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  return "#" + r + g + b + a;
}
