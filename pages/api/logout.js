import cookie from 'cookie'

// This route is a middleman for strapi

export default async (req, res) => {
  if (req.method === 'POST') {
    // Destroy cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/', // we want this to be accessible from everywhere around the site
      })
    )
    res.status(200).json({ message: 'Success' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })

    // The HyperText Transfer Protocol (HTTP) 405 Method Not Allowed response status code indicates that the server knows the request method, but the target resource doesn't support this method. The server must generate an Allow header field in a 405 status code response
  }
}
