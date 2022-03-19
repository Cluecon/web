import React, {useState} from 'react'
import {Image, Avatar, message, Upload} from 'antd'
import {EditOutlined, UserOutlined} from '@ant-design/icons'
import {create} from 'ipfs-http-client'
import {AppConstants} from '../../config/constants'

function Cover() {
  const [coverUrl, setCoverUrl] = useState(
    `${AppConstants.IPFS_URL}/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX`
  )
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>('')

  const IpfsClient = create({url: ' https://dev-ipfs.clueconn.com'})

  async function uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        // @ts-ignore
        const buffer = Buffer.from(reader.result)
        IpfsClient.add(buffer)
          .then((files) => {
            resolve(files)
          })
          .catch((error) => reject(error))
      }
      reader.readAsArrayBuffer(file)
    })
  }

  function isImage(file: File) {
    const isImage = file['type'].split('/')[0] === 'image'
    if (!isImage) {
      message.error(`${file.name} is not an image`)
    }
    return isImage || Upload.LIST_IGNORE
  }

  const uploadCoverProps = {
    beforeUpload: isImage,
    onChange: (info: any) => {
      const {status} = info.file
      if (status !== 'uploading') {
        console.log('Uploading')
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        uploadFile(info.file.originFileObj)
          .then((file: any) => {
            setCoverUrl(`${AppConstants.IPFS_URL}/ipfs/${file.path}`)
            // TODO: Update user object IPFS
          })
          .catch((err) => {
            console.log('err', err)
            message.error(`Error uploading file`)
          })
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  const uploadAvatarProps = {
    beforeUpload: isImage,
    onChange: (info: any) => {
      const {status} = info.file
      if (status !== 'uploading') {
        console.log('Uploading')
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        uploadFile(info.file.originFileObj)
          .then((file: any) => {
            setAvatarUrl(`${AppConstants.IPFS_URL}/ipfs/${file.path}`)
            // TODO: Update user object IPFS
          })
          .catch((err) => {
            console.log('err', err)
            message.error(`Error uploading file`)
          })
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div style={{display: 'relative'}}>
        <div>
          <Image
            preview={false}
            src={coverUrl}
            alt="Picture of the author"
            width="100vw"
            height="30vh"
            style={{objectFit: 'cover'}}
          />
        </div>
        <div style={{position: 'absolute', right: 0, bottom: 10, cursor: 'pointer'}}>
          <Upload {...uploadCoverProps} showUploadList={false}>
            <EditOutlined style={{fontSize: 48, color: '#d818ff'}} />
          </Upload>
        </div>
      </div>
      <div style={{position: 'absolute', bottom: '-60px'}}>
        <div style={{position: 'relative'}}>
          <div>
            {!avatarUrl ? (
              <>
                <Avatar size={150} icon={<UserOutlined />} />
              </>
            ) : (
              <>
                <Avatar size={150} src={<Image alt="avatar" src={avatarUrl} />} />
              </>
            )}
          </div>
          <div style={{position: 'absolute', bottom: 0, right: 0, cursor: 'pointer'}}>
            <Upload {...uploadAvatarProps} showUploadList={false}>
              <EditOutlined style={{fontSize: 32, color: '#d818ff'}} />
            </Upload>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cover
