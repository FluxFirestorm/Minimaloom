import m, { Component } from "mithril";

/** Text input (email, password, number, etc) */
export type TextInputAttrs = {
  type?: "text" | "email" | "password" | "number" | "search" | "date" | "time" | "datetime-local";
  name?: string;
  id?: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  style?: string;
  oninput?: (value: string) => void;
};

export const TextInput: Component<TextInputAttrs> = {
  view: ({attrs}) =>
    m("input", {
      type: attrs.type ?? "text",
      name: attrs.name,
      id: attrs.id,
      value: attrs.value,
      placeholder: attrs.placeholder,
      required: attrs.required,
      disabled: attrs.disabled,
      class: attrs.class,
      style: attrs.style,
      oninput: (e: InputEvent) => attrs.oninput?.((e.target as HTMLInputElement).value),
    })
};

/** Textarea */
export type TextAreaAttrs = {
  name?: string; id?: string; value?: string; placeholder?: string;
  required?: boolean; disabled?: boolean; class?: string; style?: string;
  rows?: number; oninput?: (value: string) => void;
};

export const TextArea: Component<TextAreaAttrs> = {
  view: ({attrs}) =>
    m("textarea", {
      name: attrs.name, id: attrs.id, rows: attrs.rows ?? 5,
      placeholder: attrs.placeholder, required: attrs.required, disabled: attrs.disabled,
      class: attrs.class, style: attrs.style,
      oninput: (e: InputEvent) => attrs.oninput?.((e.target as HTMLTextAreaElement).value)
    }, attrs.value ?? "")
};

/** Select */
export type SelectOption = { value: string; label: string; disabled?: boolean; selected?: boolean };
export type SelectAttrs = {
  name?: string; id?: string; value?: string; class?: string; style?: string;
  options: SelectOption[]; required?: boolean; disabled?: boolean;
  onchange?: (value: string) => void;
};

export const Select: Component<SelectAttrs> = {
  view: ({attrs}) =>
    m("select", {
      name: attrs.name, id: attrs.id, value: attrs.value,
      required: attrs.required, disabled: attrs.disabled,
      class: attrs.class, style: attrs.style,
      onchange: (e: Event) => attrs.onchange?.((e.target as HTMLSelectElement).value)
    }, attrs.options.map(o => m("option", { value: o.value, disabled: o.disabled, selected: o.selected }, o.label)))
};

/** Checkbox */
export type CheckboxAttrs = {
  name?: string; id?: string; checked?: boolean; label?: string;
  class?: string; style?: string; disabled?: boolean;
  onchange?: (checked: boolean) => void;
};

export const Checkbox: Component<CheckboxAttrs> = {
  view: ({attrs}) =>
    m("label", { class: ["choice", attrs.class].filter(Boolean).join(" "), style: attrs.style }, [
      m("input", {
        type: "checkbox",
        name: attrs.name, id: attrs.id, checked: attrs.checked, disabled: attrs.disabled,
        onchange: (e: Event) => attrs.onchange?.((e.target as HTMLInputElement).checked)
      }),
      " ",
      attrs.label ?? ""
    ])
};

/** Radio */
export type RadioAttrs = {
  name: string; value: string; id?: string; checked?: boolean; label?: string;
  class?: string; style?: string; disabled?: boolean;
  onchange?: (value: string) => void;
};

export const Radio: Component<RadioAttrs> = {
  view: ({attrs}) =>
    m("label", { class: ["choice", attrs.class].filter(Boolean).join(" "), style: attrs.style }, [
      m("input", {
        type: "radio",
        name: attrs.name, id: attrs.id, value: attrs.value, checked: attrs.checked, disabled: attrs.disabled,
        onchange: (e: Event) => attrs.onchange?.((e.target as HTMLInputElement).value)
      }),
      " ",
      attrs.label ?? ""
    ])
};
