import React, { Component } from 'react'

export default class OvVideoComponent extends Component {
  constructor(props: any) {
    super(props)
    // @ts-ignore
    this.videoRef = React.createRef()
  }

  componentDidMount() {
    // @ts-ignore
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      // @ts-ignore
      console.log('==============vidref=================', this.videoRef)
      console.log('PROPS: ', this.props)
      // @ts-ignore
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current)
    }

    // @ts-ignore
    if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
      console.log('===========================================================')
      // @ts-ignore
      this.props.user.streamManager.session.on('signal:userChanged', (event) => {
        const data = JSON.parse(event.data)
        // @ts-ignore
        console.log('event data', data)
        if (data.isScreenShareActive !== undefined) {
          // @ts-ignore
          this.props.user.getStreamManager().addVideoElement(this.videoRef.current)
        }
      })
    }
  }

  componentDidUpdate(props: any) {
    // @ts-ignore
    if (props && !!this.videoRef) {
      // @ts-ignore
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current)
    }
  }

  render() {
    return (
      <video
        autoPlay={true}
        // @ts-ignore
        id={'video-' + this.props.user.getStreamManager().stream.streamId}
        // @ts-ignore
        ref={this.videoRef}
        // @ts-ignore
        muted={this.props.mutedSound}
      />
    )
  }
}
