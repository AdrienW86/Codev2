'use client'

import { useEffect } from 'react'

export default function InstagramWidget() {
  useEffect(() => {
    // Charger le script LightWidget une seule fois au montage
    const scriptId = 'lightwidget-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js'
      script.id = scriptId
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full h-[500px] border rounded-xl overflow-hidden">
      <iframe
        src="//lightwidget.com/widgets/5f2fff847b125a8681307d1581c0ef88.html"
        scrolling="no"
        allowTransparency="true"
        className="lightwidget-widget w-full h-full border-0 overflow-hidden"
        title="Instagram Feed"
      ></iframe>
    </div>
  )
}
