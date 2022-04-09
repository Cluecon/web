import React, { Component } from 'react'
import { MdVideocamOff, MdMicOff } from 'react-icons/md'
import { Button } from 'antd'
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons'
import OvVideoComponent from './OvVideo'

export default class StreamComponent extends Component {
  constructor(props: any) {
    super(props)
    // @ts-ignore
    this.state = { nickname: this.props.user.getNickname(), showForm: false, mutedSound: false, isFormValid: true }
    this.handleChange = this.handleChange.bind(this)
    this.handlePressKey = this.handlePressKey.bind(this)
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this)
    this.toggleSound = this.toggleSound.bind(this)
  }

  handleChange(event: any) {
    this.setState({ nickname: event.target.value })
    event.preventDefault()
  }

  toggleNicknameForm() {
    // @ts-ignore
    if (this.props.user.isLocal()) {
      // @ts-ignore
      this.setState({ showForm: !this.state.showForm })
    }
  }

  toggleSound() {
    // @ts-ignore
    this.setState({ mutedSound: !this.state.mutedSound })
  }

  handlePressKey(event: any) {
    if (event.key === 'Enter') {
      // @ts-ignore
      console.log(this.state.nickname)
      // @ts-ignore
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        // @ts-ignore
        this.props.handleNickname(this.state.nickname)
        this.toggleNicknameForm()
        this.setState({ isFormValid: true })
      } else {
        this.setState({ isFormValid: false })
      }
    }
  }

  render() {
    // @ts-ignore
    console.log('props user', this.state.showForm)
    return (
      <div className="OT_widget-container">
        <div className="pointer nickname">
          {/* @ts-ignore */}
          {/* {this.state.showForm ? (
                        <h1>Showing form</h1>
                        <FormControl id="nicknameForm">
                            <IconButton color="inherit" id="closeButton" onClick={this.toggleNicknameForm}>
                                <HighlightOff />
                            </IconButton>
                            <InputLabel htmlFor="name-simple" id="label">
                                Nickname
                            </InputLabel>
                            <Input
                                color="inherit"
                                id="input"
                                value={this.state.nickname}
                                onChange={this.handleChange}
                                onKeyPress={this.handlePressKey}
                                required
                            />
                            {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                                <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
                            )}
                            {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                                <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
                            )}
                        </FormControl>
                    ) : (
                        <div onClick={this.toggleNicknameForm}>
                            <span id="nickname">{this.props.user.getNickname()}</span>
                            {this.props.user.isLocal() && <span id=""> (edit)</span>}
                        </div>
                    )} */}
        </div>
        {/* @ts-ignore */}
        {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            {/* @ts-ignore */}
            <OvVideoComponent user={this.props.user} mutedSound={this.state.mutedSound} />
            <div id="statusIcons">
              {/* @ts-ignore */}
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <MdVideocamOff id="statusCam" />
                </div>
              ) : null}

              {/* @ts-ignore */}
              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MdMicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {/* @ts-ignore */}
              {!this.props.user.isLocal() && (
                // @ts-ignore
                <Button
                  type="primary"
                  shape="circle"
                  icon={this.state.mutedSound ? <AudioMutedOutlined color="secondary" /> : <AudioOutlined />}
                />
                // <IconButton id="volumeButton" onClick={this.toggleSound}>
                //     {this.state.mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
                // </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
