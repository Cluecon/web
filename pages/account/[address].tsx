import React from 'react'
import Cover from '../../components/account/Cover'
import UserContent from '../../components/account/UserContent'
import UserInfo from '../../components/account/UserInfo'

function UserProfile() {
  return (
    <>
      <div>
        <Cover />
      </div>
      <div>
        <UserInfo />
      </div>
      <div>
        <UserContent />
      </div>
    </>
  )
}

export default UserProfile
