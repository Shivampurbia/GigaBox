import { StyleProp, View, ViewStyle } from "react-native";
import Svg, { G, Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  background?: string;
  opacity?: number;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  padding?: number;
  style?: StyleProp<ViewStyle>;
};

const BellNotificationIcon = ({
  size = 24,
  color = "#000000",
  strokeWidth = 2,
  background = "transparent",
  opacity = 1,
  rotation = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0,
  style,
}: Props) => {
  const transforms: string[] = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push("scaleX(-1)");
  if (flipVertical) transforms.push("scaleY(-1)");

  const viewBoxSize = 24 + padding * 2;
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
    <View
      style={[
        {
          opacity,
          backgroundColor:
            background !== "transparent" ? background : undefined,
          transform: [
            ...(rotation !== 0 ? [{ rotate: `${rotation}deg` }] : []),
            ...(flipHorizontal ? [{ scaleX: -1 }] : []),
            ...(flipVertical ? [{ scaleY: -1 }] : []),
          ],
        },
        style,
      ]}
    >
      <Svg
        viewBox={viewBox}
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <G fill="none">
          <Path
            stroke="#4147d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.354 12.458a1.5 1.5 0 0 0 2.646 0"
          />
          <Path
            fill="#d7e0ff"
            d="M4.262 1.884a3.872 3.872 0 0 1 6.61 2.738c0 .604.1 1.171.25 1.752q.063.198.137.373c.232.545.871.732 1.348 1.084c.711.527.574 1.654-.018 2.092c0 0-.955.827-5.589.827s-5.589-.827-5.589-.827c-.592-.438-.73-1.565-.018-2.092c.477-.352 1.116-.539 1.348-1.084c.231-.544.387-1.24.387-2.125c0-1.027.408-2.012 1.134-2.738"
          />
          <Path
            stroke="#4147d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.262 1.884a3.872 3.872 0 0 1 6.61 2.738c0 .604.1 1.171.25 1.752q.063.198.137.373c.232.545.871.732 1.348 1.084c.711.527.574 1.654-.018 2.092c0 0-.955.827-5.589.827s-5.589-.827-5.589-.827c-.592-.438-.73-1.565-.018-2.092c.477-.352 1.116-.539 1.348-1.084c.231-.544.387-1.24.387-2.125c0-1.027.408-2.012 1.134-2.738"
          />
        </G>
      </Svg>
    </View>
  );
};

export default BellNotificationIcon;
