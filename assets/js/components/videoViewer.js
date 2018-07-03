import React from "react"

const VideoViewer = ({ lesson }) => {
  return (
    <a href={lesson.content} target="_blank">
      Watch Video
    </a>
  )
}

export default VideoViewer
