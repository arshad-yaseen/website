import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Group } from "@/ui/components/select/group";
import { GroupLabel } from "@/ui/components/select/group-label";
import { Icon } from "@/ui/components/select/icon";
import { Item } from "@/ui/components/select/item";
import { ItemDescription } from "@/ui/components/select/item-description";
import { ItemIndicator } from "@/ui/components/select/item-indicator";
import { ItemText } from "@/ui/components/select/item-text";
import { Label } from "@/ui/components/select/label";
import { List } from "@/ui/components/select/list";
import { Popup } from "@/ui/components/select/popup";
import { ScrollDownArrow, ScrollUpArrow } from "@/ui/components/select/scroll-arrows";
import { Separator } from "@/ui/components/select/separator";
import { Trigger } from "@/ui/components/select/trigger";
import { Value } from "@/ui/components/select/value";

export type SelectProps<
  Value,
  Multiple extends boolean | undefined = false,
> = SelectPrimitive.Root.Props<Value, Multiple>;

export const Select = {
  Root: SelectPrimitive.Root,
  Label,
  Trigger,
  Value,
  Icon,
  Popup,
  List,
  Item,
  ItemIndicator,
  ItemText,
  ItemDescription,
  Group,
  GroupLabel,
  Separator,
  ScrollUpArrow,
  ScrollDownArrow,
};
