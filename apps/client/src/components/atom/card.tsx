import { cn } from "@/utils/cn.js";
import { type ReactElement } from "react";

type CardProps = React.ComponentPropsWithoutRef<"div">;

export function Card(props: CardProps): ReactElement {
  return (
    <div {...props} className={cn("border border-gray-300 rounded", props.className)}>
      {props.children}
    </div>
  );
}

type CardBodyProps = React.ComponentPropsWithoutRef<"div">;

Card.Body = function CardBody(props: CardBodyProps): ReactElement {
  return (
    <div {...props} className={cn("p-2", props.className)}>
      {props.children}
    </div>
  );
};
