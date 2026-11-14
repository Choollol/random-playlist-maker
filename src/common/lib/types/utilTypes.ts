import { ReactNode } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

type OmitPropertiesOfType<ObjectType, TypeToOmit> = {
  [K in keyof ObjectType as ObjectType[K] extends TypeToOmit ? never : K]: ObjectType[K];
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type PickNonFunctions<T> = OmitPropertiesOfType<T, Function>;

type ControlledInputProps<Values extends FieldValues, ComponentPropTypes> = WithRequired<
  UseControllerProps<Values>,
  "defaultValue"
> &
  ComponentPropTypes;

export type ControlledInput<ComponentPropTypes> = <Values extends FieldValues>(
  props: ControlledInputProps<Values, ComponentPropTypes>,
) => ReactNode;
