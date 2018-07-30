import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"
import { Value } from "slate"

import React from "react"

class ReadOnly extends React.Component {
  render() {
    const { value } = this.props

    const text = Value.fromJSON(value)
    return (
      <Editor
        renderNode={this.renderNode}
        renderMark={this.renderMark}
        readOnly
        placeholder="Lesson text..."
        value={text}
      />
    )
  }
  renderNode = props => {
    const { attributes, children, node } = props

    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>
      case "list-item":
        return <li {...attributes}>{children}</li>
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>
    }
  }

  renderMark = props => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>
      case "code":
        return <code {...attributes}>{children}</code>
      case "italic":
        return <em {...attributes}>{children}</em>
      case "underlined":
        return <u {...attributes}>{children}</u>
    }
  }
}

export default ReadOnly
