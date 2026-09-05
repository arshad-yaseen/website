import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Group } from "@fyi/ui/components/select/group";
import { GroupLabel } from "@fyi/ui/components/select/group-label";
import { Icon } from "@fyi/ui/components/select/icon";
import { Item } from "@fyi/ui/components/select/item";
import { ItemDescription } from "@fyi/ui/components/select/item-description";
import { ItemIndicator } from "@fyi/ui/components/select/item-indicator";
import { ItemText } from "@fyi/ui/components/select/item-text";
import { Label } from "@fyi/ui/components/select/label";
import { List } from "@fyi/ui/components/select/list";
import { Popup } from "@fyi/ui/components/select/popup";
import { ScrollDownArrow, ScrollUpArrow } from "@fyi/ui/components/select/scroll-arrows";
import { Separator } from "@fyi/ui/components/select/separator";
import { Trigger } from "@fyi/ui/components/select/trigger";
import { Value } from "@fyi/ui/components/select/value";

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
