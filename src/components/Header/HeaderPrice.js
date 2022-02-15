import * as React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const color = "rgb(44, 177, 186)";

const HeaderPrice = ({ setPriceMin, setPriceMax, priceMin, priceMax }) => {
  const [values, setValues] = React.useState([priceMin, priceMax]);

  const handleRequest = (values) => {
    setPriceMin(values[0]);
    setPriceMax(values[1]);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        minWidth: "200px",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        onFinalChange={(values) => handleRequest(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", color, "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,

              height: "15px",
              width: "15px",
              borderRadius: "50%",
              borderRadius: "4px",
              backgroundColor: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#fff",
                fontSize: "12px",
                fontFamily: "Maison Neue",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: color,
              }}
            >
              {values[index]}€
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default HeaderPrice;
