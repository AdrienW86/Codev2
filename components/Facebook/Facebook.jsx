'use client'

import { useEffect } from 'react'

export default function FacebookFeed() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse()
      return
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: 'v18.0',
      })
    }

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/fr_FR/sdk.js'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div style={{ width: 600, height: 700 }}>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/profile.php?id=61550727002805"
        data-tabs="timeline"
        data-width="600"
        data-height="700"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      ></div>
    </div>
  )
}
