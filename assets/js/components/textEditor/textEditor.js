import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"

function MarkHotkey(options) {
  const { type, key } = options

  return {
    onKeyDown(event, change) {
      if (!event.ctrlKey || event.key != key) return

      event.preventDefault()

      change.toggleMark(type)
      return true
    }
  }
}

const plugins = [
  MarkHotkey({ key: "b", type: "bold" }),
  MarkHotkey({ key: "`", type: "code" }),
  MarkHotkey({ key: "i", type: "italic" }),
  MarkHotkey({ key: "~", type: "strikethrough" }),
  MarkHotkey({ key: "u", type: "underline" })
]

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "A line of text in a paragraph."
              }
            ]
          }
        ]
      }
    ]
  }
})

class TextEditor extends React.Component {
  state = {
    value: initialValue
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    return (
      <Editor
        value={this.state.value}
        plugins={plugins}
        onChange={this.onChange}
        renderMark={this.renderMark}
      />
    )
  }

  renderMark = props => {
    switch (props.mark.type) {
      case "bold":
        return <strong>{props.children}</strong>
      case "code":
        return <code>{props.children}</code>
      case "italic":
        return <em>{props.children}</em>
      case "strikethrough":
        return <del>{props.children}</del>
      case "underline":
        return <u>{props.children}</u>
    }
  }
}

export default TextEditor
