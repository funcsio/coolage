import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Fab,
} from "@material-ui/core";
import { ChromePicker, RGBColor } from "react-color";
import { FileCopy } from "@material-ui/icons";
import ClipboardJS from "clipboard";

import GenerateURL from "./utils/generateURL";
import IMG_Click2Copy from "./assets/click-to-copy.png";

export default function PickerContainer() {
  useEffect(() => {
    new ClipboardJS(".btn-to-copy");
  }, []);
  const [color, setColor] = useState<RGBColor>({
    a: 1,
    b: 255,
    g: 255,
    r: 255,
  });

  const [dimensions, setDimensions] = useState({
    h: 10,
    w: 10,
  });
  return (
    <Grid
      container
      style={{ margin: "auto" }}
      spacing={3}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item md={"auto"}>
        <ChromePicker color={color} onChange={(color) => setColor(color.rgb)} />
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
                {GenerateURL({ ...color, ...dimensions })}
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
            <img src={IMG_Click2Copy} style={{width:170}} />
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
  );
}
