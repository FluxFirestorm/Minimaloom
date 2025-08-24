import m from "mithril";
import {
  Button,
  Form,
  InlineFields,
  Field,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  Radio,
} from "../../components";
import { CodeExample } from "../lib/CodeExample";

const formsHTML = `<form class="stack" onsubmit="event.preventDefault()">
  <div class="fields-inline">
    <div class="field">
      <label>First name</label>
      <input type="text" placeholder="Ada">
    </div>
    <div class="field">
      <label>Last name</label>
      <input type="text" placeholder="Lovelace">
    </div>
  </div>

  <div class="fields-inline" style="--cols:3">
    <div class="field">
      <label>Date</label>
      <input type="date">
    </div>
    <div class="field">
      <label>Time</label>
      <input type="time">
    </div>
    <div class="field">
      <label>Type</label>
      <select>
        <option>Talk</option>
        <option>Workshop</option>
      </select>
    </div>
  </div>

  <div class="field">
    <label>About</label>
    <textarea placeholder="Tell us something..."></textarea>
  </div>

  <div class="choices">
    <label class="choice"><input type="checkbox" checked> Subscribe</label>
    <label class="choice"><input type="radio" name="aud" checked> Public</label>
    <label class="choice"><input type="radio" name="aud"> Private</label>
  </div>

  <div class="cluster justify-end gap-2">
    <button class="btn ghost" type="reset">Reset</button>
    <button class="btn primary" type="submit">Submit</button>
  </div>
</form>`.trim();

const formsTS = `import { Form, InlineFields, Field, TextInput, TextArea, Select, Checkbox, Radio, Button } from "your-lib";

m(Form, { onsubmit: (e: Event) => e.preventDefault() }, [
  m(InlineFields, { cols: 2 }, [
    m(Field, { label: "First name" }, m(TextInput, { placeholder: "Ada" })),
    m(Field, { label: "Last name"  }, m(TextInput, { placeholder: "Lovelace" })),
  ]),
  m(InlineFields, { cols: 3 }, [
    m(Field, { label: "Date" }, m(TextInput, { type: "date" })),
    m(Field, { label: "Time" }, m(TextInput, { type: "time" })),
    m(Field, { label: "Type" }, m(Select, { options: [
      { value: "talk", label: "Talk" }, { value: "workshop", label: "Workshop" }
    ]}))
  ]),
  m(Field, { label: "About" }, m(TextArea, { placeholder: "Tell us something..." })),
  m("div.choices", [
    m(Checkbox, { label: "Subscribe", checked: true }),
    m(Radio, { name: "aud", value: "public",  label: "Public",  checked: true }),
    m(Radio, { name: "aud", value: "private", label: "Private" })
  ]),
  m("div.cluster.justify-end.gap-2", [
    m(Button, { variant: "ghost",   type: "reset"  }, "Reset"),
    m(Button, { variant: "primary", type: "submit" }, "Submit")
  ])
]);`.trim();

export const FormsExamples: m.Component = {
  view() {
    return m(
      "article#forms.stack",
      m(CodeExample, {
        title: "Forms",
        live: m(Form, { onsubmit: (e: Event) => e.preventDefault() }, [
          m(InlineFields, { cols: 2 }, [
            m(Field, { label: "First name" }, m(TextInput, { placeholder: "Ada" })),
            m(Field, { label: "Last name" }, m(TextInput, { placeholder: "Lovelace" })),
          ]),
          m(InlineFields, { cols: 3 }, [
            m(Field, { label: "Date" }, m(TextInput, { type: "date" })),
            m(Field, { label: "Time" }, m(TextInput, { type: "time" })),
            m(
              Field,
              { label: "Type" },
              m(Select, {
                options: [
                  { value: "talk", label: "Talk" },
                  { value: "workshop", label: "Workshop" },
                ],
              })
            ),
          ]),
          m(Field, { label: "About" }, m(TextArea, { placeholder: "Tell us something..." })),
          m("div.choices", [
            m(Checkbox, { label: "Subscribe", checked: true }),
            m(Radio, { name: "aud", value: "public", label: "Public", checked: true }),
            m(Radio, { name: "aud", value: "private", label: "Private" }),
          ]),
          m("div.cluster.justify-end.gap-2", [
            m(Button, { variant: "ghost", type: "reset" }, "Reset"),
            m(Button, { variant: "primary", type: "submit" }, "Submit"),
          ]),
        ]),
        html: formsHTML,
        ts: formsTS,
      })
    );
  },
};
