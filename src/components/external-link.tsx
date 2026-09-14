import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { cloneElement, type ReactElement } from "react";
import type { GestureResponderEvent } from "react-native";

type Props = {
  href: string;
  asChild?: boolean;
  children: ReactElement<{ onPress?: (event: GestureResponderEvent) => void }>;
};

export function ExternalLink({ href, children }: Props) {
  return cloneElement(children, {
    onPress: async (event) => {
      children.props.onPress?.(event);
      await openBrowserAsync(href, {
        presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
      });
    },
  });
}
