import { API_URL } from '@/config/index'
import cookie from 'cookie'

// This route is a middleman for strapi

export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body

    const strapiRes = await fetch(`${API_URL}api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {

      console.log("Cookie", data.jwt)

      // Set cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/', // we want this to be accessible from everywhere around the site
        })
      )

      res.status(200).json({ user: data.user })
    } else {
      res.status(data.error.status).json({ message: data.error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })

    // The HyperText Transfer Protocol (HTTP) 405 Method Not Allowed response status code indicates that the server knows the request method, but the target resource doesn't support this method. The server must generate an Allow header field in a 405 status code response
  }
}
