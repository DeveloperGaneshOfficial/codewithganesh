import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const email = body && typeof body === 'object' ? (body as Record<string, unknown>).email : null

  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // TODO: wire up siteMetadata.newsletter.provider (buttondown) once an API key is set.
  console.log('New newsletter signup:', email)

  return NextResponse.json({ ok: true })
}
