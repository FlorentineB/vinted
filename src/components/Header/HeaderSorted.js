import * as React from "react";
import Switch from "react-switch";
import { BsSortNumericDown, BsSortNumericUpAlt } from "react-icons/bs";

const HeaderSorted = () => {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (e) => {
    setChecked(!checked);
  };

  return (
    <>
      <Switch
        checked={checked}
        onChange={handleChange}
        uncheckedIcon={<div></div>}
        checkedIcon={<div></div>}
        uncheckedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 20,
            }}
          >
            <BsSortNumericDown />
          </div>
        }
        checkedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 20,
            }}
          >
            <BsSortNumericUpAlt />
          </div>
        }
        className="react-switch-custom"
      />
    </>
  );
};

export default HeaderSorted;
