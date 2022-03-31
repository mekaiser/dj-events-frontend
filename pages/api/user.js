import { API_URL } from '@/config/index'
import cookie from 'cookie'

// This route is a middleman for strapi

export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' }) // Forbidden
      return
    }
    const { token } = cookie.parse(req.headers.cookie) // if the cookie is found. This will put the token in a variable which we can send to strapi

    const strapiRes = await fetch(`${API_URL}api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = await strapiRes.json()

    if (strapiRes.ok) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User forbidden' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })

    // The HyperText Transfer Protocol (HTTP) 405 Method Not Allowed response status code indicates that the server knows the request method, but the target resource doesn't support this method. The server must generate an Allow header field in a 405 status code response
  }
}
