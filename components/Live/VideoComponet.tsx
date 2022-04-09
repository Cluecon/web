import React, { Component } from 'react'
import axios from 'axios'
import { OpenVidu } from 'openvidu-browser'
import CallUserModel from '../../models/callUser'
import OpenViduLayout from '../layout/openvidu-layout'
import StreamComponent from './stream/StreamComponent'
// import StreamComponent from './stream/StreamComponent';
// import DialogExtensionComponent from './dialog-extension/DialogExtension';
// import ChatComponent from './chat/ChatComponent';
// import ToolbarComponent from './toolbar/ToolbarComponent';

const localUser = new CallUserModel()

class VideoRoomComponent extends Component {
  hasBeenUpdated: boolean
  layout: any
  remotes: never[]
  localUserAccessAllowed: boolean
  OPENVIDU_SERVER_URL: string
  constructor(props: any) {
    super(props)
    // @ts-ignore
    this.OPENVIDU_SERVER_URL = 'https://video.clueconn.com'
    // @ts-ignore
    this.OPENVIDU_SERVER_SECRET = 'JCmq4AMnfUJPhXBUBQiBELZj'
    this.hasBeenUpdated = false
    this.layout = new OpenViduLayout()
    // @ts-ignore
    const sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA'
    // @ts-ignore
    const userName = this.props.user ? this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100)
    this.remotes = []
    this.localUserAccessAllowed = false
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'none',
      currentVideoDevice: undefined,
    }

    this.joinSession = this.joinSession.bind(this)
    this.leaveSession = this.leaveSession.bind(this)
    this.onbeforeunload = this.onbeforeunload.bind(this)
    this.updateLayout = this.updateLayout.bind(this)
    this.camStatusChanged = this.camStatusChanged.bind(this)
    this.micStatusChanged = this.micStatusChanged.bind(this)
    this.nicknameChanged = this.nicknameChanged.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.switchCamera = this.switchCamera.bind(this)
    this.screenShare = this.screenShare.bind(this)
    this.stopScreenShare = this.stopScreenShare.bind(this)
    this.closeDialogExtension = this.closeDialogExtension.bind(this)
    this.toggleChat = this.toggleChat.bind(this)
    this.checkNotification = this.checkNotification.bind(this)
    this.checkSize = this.checkSize.bind(this)
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    }

    if (typeof window !== 'undefined') {
      this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions)
      window.addEventListener('beforeunload', this.onbeforeunload)
      window.addEventListener('resize', this.updateLayout)
      window.addEventListener('resize', this.checkSize)
      this.joinSession()
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', this.onbeforeunload)
      window.removeEventListener('resize', this.updateLayout)
      window.removeEventListener('resize', this.checkSize)
      this.leaveSession()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onbeforeunload(_event: any) {
    this.leaveSession()
  }

  joinSession() {
    // @ts-ignore
    this.OV = new OpenVidu()

    this.setState(
      {
        // @ts-ignore
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated()
        this.connectToSession()
      }
    )
  }

  connectToSession() {
    // @ts-ignore
    if (this.props.token !== undefined) {
      // @ts-ignore
      console.log('token received: ', this.props.token)
      // @ts-ignore
      this.connect(this.props.token)
    } else {
      this.getToken()
        .then((token) => {
          console.log(token)
          this.connect(token)
        })
        .catch((error) => {
          // @ts-ignore
          if (this.props.error) {
            // @ts-ignore
            this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status })
          }
          console.log('There was an error getting the token:', error.code, error.message)
          // @ts-ignore
          alert('There was an error getting the token:', error.message)
        })
    }
  }

  connect(token: any) {
    // @ts-ignore
    this.state.session
      // @ts-ignore
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam()
      })
      // @ts-ignore
      .catch((error) => {
        // @ts-ignore
        if (this.props.error) {
          // @ts-ignore
          this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status })
        }
        // @ts-ignore
        alert('There was an error connecting to the session:', error.message)
        console.log('There was an error connecting to the session:', error.code, error.message)
      })
  }

  async connectWebCam() {
    // @ts-ignore
    const devices = await this.OV.getDevices()
    console.log('devices', devices)
    // @ts-ignore
    const videoDevices = devices.filter((device) => device.kind === 'videoinput')

    // @ts-ignore
    const publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices.length ? videoDevices[0].deviceId : undefined,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    })

    // @ts-ignore
    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        // @ts-ignore
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers()
          this.localUserAccessAllowed = true
          // @ts-ignore
          if (this.props.joinSession) {
            // @ts-ignore
            this.props.joinSession()
          }
        })
      })
    }
    // @ts-ignore
    localUser.setNickname(this.state.myUserName)
    // @ts-ignore
    localUser.setConnectionId(this.state.session.connection.connectionId)
    localUser.setScreenShareActive(false)
    localUser.setStreamManager(publisher)
    this.subscribeToUserChanged()
    this.subscribeToStreamDestroyed()
    this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() })

    this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
      // @ts-ignore
      this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
        this.updateLayout()
        publisher.videos[0].video.parentElement.classList.remove('custom-class')
      })
    })
  }

  updateSubscribers() {
    const subscribers = this.remotes
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        // @ts-ignore
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            // @ts-ignore
            isAudioActive: this.state.localUser.isAudioActive(),
            // @ts-ignore
            isVideoActive: this.state.localUser.isVideoActive(),
            // @ts-ignore
            nickname: this.state.localUser.getNickname(),
            // @ts-ignore
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          })
        }
        this.updateLayout()
      }
    )
  }

  leaveSession() {
    // @ts-ignore
    const mySession = this.state.session

    if (mySession) {
      mySession.disconnect()
    }

    // Empty all properties...
    // @ts-ignore
    this.OV = null
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
      localUser: undefined,
    })
    // @ts-ignore
    if (this.props.leaveSession) {
      // @ts-ignore
      this.props.leaveSession()
    }
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive())
    localUser.getStreamManager().publishVideo(localUser.isVideoActive())
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() })
    this.setState({ localUser: localUser })
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive())
    localUser.getStreamManager().publishAudio(localUser.isAudioActive())
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() })
    this.setState({ localUser: localUser })
  }

  nicknameChanged(nickname: any) {
    // @ts-ignore
    const localUser = this.state.localUser
    localUser.setNickname(nickname)
    this.setState({ localUser: localUser })
    // @ts-ignore
    this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() })
  }

  // @ts-ignore
  deleteSubscriber(stream) {
    // @ts-ignore
    const remoteUsers = this.state.subscribers
    // @ts-ignore
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0]
    const index = remoteUsers.indexOf(userStream, 0)
    if (index > -1) {
      remoteUsers.splice(index, 1)
      this.setState({
        subscribers: remoteUsers,
      })
    }
  }

  subscribeToStreamCreated() {
    // @ts-ignore
    this.state.session.on('streamCreated', (event) => {
      // @ts-ignore
      const subscriber = this.state.session.subscribe(event.stream, undefined)
      // var subscribers = this.state.subscribers;
      subscriber.on('streamPlaying', (e: any) => {
        this.checkSomeoneShareScreen()
        subscriber.videos[0].video.parentElement.classList.remove('custom-class')
      })
      // @ts-ignore
      const newUser = new UserModel()
      newUser.setStreamManager(subscriber)
      newUser.setConnectionId(event.stream.connection.connectionId)
      newUser.setType('remote')
      const nickname = event.stream.connection.data.split('%')[0]
      newUser.setNickname(JSON.parse(nickname).clientData)
      // @ts-ignore
      this.remotes.push(newUser)
      if (this.localUserAccessAllowed) {
        this.updateSubscribers()
      }
    })
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    // @ts-ignore
    this.state.session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream)
      setTimeout(() => {
        this.checkSomeoneShareScreen()
      }, 20)
      event.preventDefault()
      this.updateLayout()
    })
  }

  subscribeToUserChanged() {
    // @ts-ignore
    this.state.session.on('signal:userChanged', (event) => {
      // @ts-ignore
      const remoteUsers = this.state.subscribers
      remoteUsers.forEach((user: any) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data)
          console.log('EVENTO REMOTE: ', event.data)
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive)
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive)
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname)
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive)
          }
        }
      })
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      )
    })
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout()
    }, 20)
  }

  sendSignalUserChanged(data: any) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    }
    // @ts-ignore
    this.state.session.signal(signalOptions)
  }

  toggleFullscreen() {
    if (typeof window !== 'undefined') {
      const document = window.document
      const fs = document.getElementById('container')
      if (
        !document.fullscreenElement &&
        // @ts-ignore
        !document.mozFullScreenElement &&
        // @ts-ignore
        !document.webkitFullscreenElement &&
        // @ts-ignore
        !document.msFullscreenElement
      ) {
        // @ts-ignore
        if (fs.requestFullscreen) {
          // @ts-ignore
          fs.requestFullscreen()
          // @ts-ignore
        } else if (fs.msRequestFullscreen) {
          // @ts-ignore
          fs.msRequestFullscreen()
          // @ts-ignore
        } else if (fs.mozRequestFullScreen) {
          // @ts-ignore
          fs.mozRequestFullScreen()
          // @ts-ignore
        } else if (fs.webkitRequestFullscreen) {
          // @ts-ignore
          fs.webkitRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
          // @ts-ignore
        } else if (document.msExitFullscreen) {
          // @ts-ignore
          document.msExitFullscreen()
          // @ts-ignore
        } else if (document.mozCancelFullScreen) {
          // @ts-ignore
          document.mozCancelFullScreen()
          // @ts-ignore
        } else if (document.webkitExitFullscreen) {
          // @ts-ignore
          document.webkitExitFullscreen()
        }
      }
    }
  }

  async switchCamera() {
    try {
      // @ts-ignore
      const devices = await this.OV.getDevices()
      // @ts-ignore
      const videoDevices = devices.filter((device) => device.kind === 'videoinput')

      if (videoDevices && videoDevices.length > 1) {
        // @ts-ignore
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        )

        if (newVideoDevice.length > 0) {
          // @ts-ignore
          const newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          })

          //newPublisher.once("accessAllowed", () => {
          // @ts-ignore
          await this.state.session.unpublish(this.state.localUser.getStreamManager())
          // @ts-ignore
          await this.state.session.publish(newPublisher)
          // @ts-ignore
          this.state.localUser.setStreamManager(newPublisher)
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  screenShare() {
    if (typeof window !== 'undefined') {
      const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen'
      // @ts-ignore
      const publisher = this.OV.initPublisher(
        undefined,
        {
          videoSource: videoSource,
          publishAudio: localUser.isAudioActive(),
          publishVideo: localUser.isVideoActive(),
          mirror: false,
        },
        (error: any) => {
          if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
            this.setState({ showExtensionDialog: true })
          } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
            alert('Your browser does not support screen sharing')
          } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
            alert('You need to enable screen sharing extension')
          } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
            alert('You need to choose a window or application to share')
          }
        }
      )

      publisher.once('accessAllowed', () => {
        // @ts-ignore
        this.state.session.unpublish(localUser.getStreamManager())
        localUser.setStreamManager(publisher)
        // @ts-ignore
        this.state.session.publish(localUser.getStreamManager()).then(() => {
          localUser.setScreenShareActive(true)
          this.setState({ localUser: localUser }, () => {
            this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() })
          })
        })
      })
      publisher.on('streamPlaying', () => {
        this.updateLayout()
        publisher.videos[0].video.parentElement.classList.remove('custom-class')
      })
    }
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false })
  }

  stopScreenShare() {
    // @ts-ignore
    this.state.session.unpublish(localUser.getStreamManager())
    this.connectWebCam()
  }

  checkSomeoneShareScreen() {
    // return true if at least one passes the test
    // @ts-ignore
    const isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive()
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    }
    this.layout.setLayoutOptions(openviduLayoutOptions)
    this.updateLayout()
  }

  toggleChat(property: any) {
    let display = property

    if (display === undefined) {
      // @ts-ignore
      display = this.state.chatDisplay === 'none' ? 'block' : 'none'
    }
    if (display === 'block') {
      this.setState({ chatDisplay: display, messageReceived: false })
    } else {
      console.log('chat', display)
      this.setState({ chatDisplay: display })
    }
    this.updateLayout()
  }

  checkNotification(event: any) {
    this.setState({
      // @ts-ignore
      messageReceived: this.state.chatDisplay === 'none',
    })
  }
  checkSize() {
    // @ts-ignore
    if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
      this.toggleChat('none')
      this.hasBeenUpdated = true
    }
    // @ts-ignore
    if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
      this.hasBeenUpdated = false
    }
  }

  render() {
    // @ts-ignore
    const mySessionId = this.state.mySessionId
    // @ts-ignore
    const localUser = this.state.localUser
    // @ts-ignore
    const chatDisplay = { display: this.state.chatDisplay }

    return (
      <div className="container" id="container">
        {/* <h2>Live Video Screen</h2> */}
        {/* <ToolbarComponent
                    sessionId={mySessionId}
                    user={localUser}
                    showNotification={this.state.messageReceived}
                    camStatusChanged={this.camStatusChanged}
                    micStatusChanged={this.micStatusChanged}
                    screenShare={this.screenShare}
                    stopScreenShare={this.stopScreenShare}
                    toggleFullscreen={this.toggleFullscreen}
                    switchCamera={this.switchCamera}
                    leaveSession={this.leaveSession}
                    toggleChat={this.toggleChat}
                /> */}

        {/* <DialogExtensionComponent showDialog={this.state.showExtensionDialog} cancelClicked={this.closeDialogExtension} /> */}

        <div id="layout" className="bounds">
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <div className="OT_root OT_publisher custom-class" id="localUser">
              {/* @ts-ignore */}
              <StreamComponent user={localUser} handleNickname={this.nicknameChanged} />
            </div>
          )}
          {/* @ts-ignore */}
          {this.state.subscribers.map((sub, i) => (
            <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
              {/* @ts-ignore */}
              <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
            </div>
          ))}
          {/* {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
                            <ChatComponent
                                user={localUser}
                                chatDisplay={this.state.chatDisplay}
                                close={this.toggleChat}
                                messageReceived={this.checkNotification}
                            />
                        </div>
                    )} */}
        </div>
      </div>
    )
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    // @ts-ignore
    return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId))
  }

  createSession(sessionId: any) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const data = JSON.stringify({ customSessionId: sessionId })
      axios
        .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            // @ts-ignore
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response)
          resolve(response.data.id)
        })
        .catch((response) => {
          const error = Object.assign({}, response)
          if (error.response && error.response.status === 409) {
            resolve(sessionId)
          } else {
            console.log(error)
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' + this.OPENVIDU_SERVER_URL
            )
            if (
              typeof window !== 'undefined' &&
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              if (typeof window !== 'undefined') {
                window.location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate')
              }
            }
          }
        })
    })
  }

  createToken(sessionId: any) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({})
      axios
        .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
          headers: {
            // @ts-ignore
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('TOKEN', response)
          resolve(response.data.token)
        })
        .catch((error) => reject(error))
    })
  }
}
export default VideoRoomComponent
