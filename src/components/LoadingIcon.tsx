import * as React from "react";

import LoopIcon from '@mui/icons-material/Loop';

const LoadingIcon = (props: { style?: React.CSSProperties }) => {
  return (
    <LoopIcon
      style={{ ...props.style }}
      sx={{
        animation: "spin 2s linear infinite",
        "@keyframes spin": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" }
        },
      }}
    />
  )
}

export default LoadingIcon;


