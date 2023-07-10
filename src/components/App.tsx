import * as React from "react";

import Button, { ButtonProps } from "@mui/material/Button";
import { SvgIconProps } from "@mui/material/SvgIcon";

import {Tooltip} from "@technarts/tooltip";
import LoadingIcon from "./LoadingIcon";

type PlaneButtonBaseProps = {
  text?: string,
  tooltip?: [
    text: string,
    direction: "N" | "S" | "W" | "E" | "NE" | "NW" | "SE" | "SW" //todo  take this options from pillion.
  ],
  style?: React.CSSProperties,
  hover?: string,
  active?: string,
}

type PlaneButtonIconProps = {
  Icon: React.ElementType<SvgIconProps>,
  iconSize?: number,
  iconAfterText?: boolean,
}

type PlaneButtonNotIconProps = {
  text: string,
  Icon?: never,
  iconSize?: never,
  iconAfterText?: never,
}

type PlaneButtonLoadingProps = {
  loadingText?: string,
  loading: boolean,
}

type PlaneButtonNotLoadingProps = {
  loadingText?: never,
  loading?: never,
}

type PlaneButtonProps = PlaneButtonBaseProps & ButtonProps &
  (PlaneButtonIconProps | PlaneButtonNotIconProps) &
  (PlaneButtonLoadingProps | PlaneButtonNotLoadingProps);

const PlaneButton = (props: PlaneButtonProps) => {
  const [tooltipEl, setTooltipEl] = React.useState<HTMLElement | null>(null);

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: 3,
  }

  if (!props.loading) {
    return (
      <Button
        disableRipple
        disabled={props.disabled}
        onClick={props.onClick}
        style={{
          ...style,
          ...props.style,
          ...(props.disabled && {
            backgroundColor: "gray",
            color: "white",
          })
        }}
        sx={{
          ...(props.hover && { "&:hover": { backgroundColor: props.hover + "!important" }}),
          "&:active": {
            ...(props.active && { backgroundColor: props.active + "!important" }),
            transform: "translateY(1px)",
          },
        }}
        onMouseEnter={(event: React.MouseEvent<HTMLElement>) => setTooltipEl(event.currentTarget)}
        onMouseLeave={() => setTooltipEl(null)}
      >
        {props.text && props.iconAfterText && <p style={{ marginRight: "5px" }}>{props.text}</p>}
        {props.Icon && <props.Icon sx={{ ...(props.iconSize && { fontSize: props.iconSize }) }} />}
        {props.text && !props.iconAfterText && <p style={{ marginLeft: "5px" }}>{props.text}</p>}
        {
          props.tooltip &&
            <Tooltip
                anchorEl={tooltipEl}
                direction={props.tooltip[1]}
                text={props.tooltip[0]}
                ms={1000}
            />
        }
      </Button>
    )
  } else {
    return (
      <Button
        disableRipple
        style={{ ...style, ...props.style, cursor: "not-allowed" }}
      >
        {props.loadingText && props.iconAfterText && <p style={{ marginRight: "5px" }}>{props.loadingText}</p>}
        <LoadingIcon style={{ fontSize: props.iconSize }} />
        {props.loadingText && !props.iconAfterText && <p style={{ marginLeft: "5px" }}>{props.loadingText}</p>}
      </Button>
    )
  }
}

export default PlaneButton;


