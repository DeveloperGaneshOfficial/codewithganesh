import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { name, email, subject, message } = body as Record<string, unknown>

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // TODO: wire up an email/notification provider (e.g. Resend, SMTP) once chosen.
  console.log('New contact form submission:', { name, email, subject, message })

  return NextResponse.json({ ok: true })
}
