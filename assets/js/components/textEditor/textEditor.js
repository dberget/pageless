import { Editor } from "slate-react"

import React from "react"
import initialValue from "./value.js"
import { isKeyHotkey } from "is-hotkey"
import Button from "@material-ui/core/Button"
import EditorMenu from "./editorMenu"
import TextContainer from "./textContainer"

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatQuote,
  FormatListNumbered,
  FormatListBulleted
} from "@material-ui/icons"
import { Paper } from "../../../node_modules/@material-ui/core"

const DEFAULT_NODE = "paragraph"

const isBoldHotkey = isKeyHotkey("mod+b")
const isItalicHotkey = isKeyHotkey("mod+i")
const isUnderlinedHotkey = isKeyHotkey("mod+u")
const isCodeHotkey = isKeyHotkey("mod+`")

class TextEditor extends React.Component {
  // state = {
  //   value: this.props.value
  // }

  hasMark = type => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type == type)
  }

  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type == type)
  }

  render() {
    return (
      <Paper>
        <EditorMenu>
          {this.renderMarkButton("bold", <FormatBold />)}
          {this.renderMarkButton("italic", <FormatItalic />)}
          {this.renderMarkButton("underlined", <FormatUnderlined />)}
          {this.renderBlockButton("heading-one", "Title")}
          {this.renderBlockButton("heading-two", "Subtitle")}
          {this.renderBlockButton("block-quote", <FormatQuote />)}
          {this.renderBlockButton("numbered-list", <FormatListNumbered />)}
          {this.renderBlockButton("bulleted-list", <FormatListBulleted />)}
        </EditorMenu>
        <TextContainer>
          <Editor
            spellCheck
            autoFocus
            placeholder="Enter some rich text..."
            value={this.props.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
          />
        </TextContainer>
      </Paper>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        {icon}
      </Button>
    )
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const { value } = this.props
      const parent = value.document.getParent(value.blocks.first().key)
      isActive = this.hasBlock("list-item") && parent && parent.type === type
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        {icon}
      </Button>
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

  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    if (value.document != this.props.value.document) {
      const content = JSON.stringify(value.toJSON())
      localStorage.setItem("content", content)
    }

    this.props.handleChange(value)
  }

  onKeyDown = (event, change) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = "bold"
    } else if (isItalicHotkey(event)) {
      mark = "italic"
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined"
    } else if (isCodeHotkey(event)) {
      mark = "code"
    } else {
      return
    }

    event.preventDefault()
    change.toggleMark(mark)
    return true
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.props
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.props
    const change = value.change()
    const { document } = value

    // Handle everything but list buttons.
    if (type != "bulleted-list" && type != "numbered-list") {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock("list-item")

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item")
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      } else if (isList) {
        change
          .unwrapBlock(
            type == "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type)
      } else {
        change.setBlocks("list-item").wrapBlock(type)
      }
    }

    this.onChange(change)
  }
}

export default TextEditor
