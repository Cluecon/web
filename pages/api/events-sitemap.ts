// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    })

    const events: any = []

    events.forEach((event: any) => {
      smStream.write({
        url: `/event/${event.uid}`,
        changefreq: 'daily',
        priority: 0.9,
      })
    })

    // End sitemap stream
    smStream.end()

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString()

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    // Display output to user
    res.end(sitemapOutput)
  } catch (e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }
}
