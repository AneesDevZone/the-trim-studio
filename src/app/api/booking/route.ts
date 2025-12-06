import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'
import { env } from '@/lib/validations/env'

const resend = new Resend(env.RESEND_API_KEY)

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    }

    // Check environment variables
    if (!env.RESEND_API_KEY || !env.RESEND_API_KEY.startsWith('re_')) {
      console.error('Invalid Resend API key')
      return NextResponse.json(
        { error: 'Server configuration error - Email service not configured' },
        { status: 500, headers }
      )
    }

    const body = await request.json()
    console.log('Received booking:', body)

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'dateTime']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400, headers }
      )
    }

    // 1. Save to Supabase
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.service,
        barber: body.barber || null,
        date_time: body.dateTime,
        duration: body.duration || 45,
        status: 'pending',
        notes: body.notes || null,
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Saved to Supabase:', data)

    // 2. Try to send confirmation email (but don't fail if email fails)
    try {
      await resend.emails.send({
        from: `The Trim Studio <${env.NEXT_PUBLIC_FROM_EMAIL}>`,
        to: [body.email],
        subject: 'Appointment Confirmation - The Trim Studio',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Appointment Confirmed!</h2>
            <p>Dear ${body.name},</p>
            <p>Your appointment has been scheduled for ${new Date(body.dateTime).toLocaleString()}.</p>
            <p><strong>Service:</strong> ${body.service}</p>
            <p>We look forward to seeing you!</p>
            <br/>
            <p><em>The Trim Studio Team</em></p>
          </div>
        `,
      })
      console.log('Email sent successfully')
    } catch (emailError) {
      console.warn('Email sending failed (continuing anyway):', emailError)
      // Don't throw - appointment was saved successfully
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Appointment booked successfully',
    }, { status: 200, headers })

  } catch (error: any) {
    console.error('Booking error:', error)
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to book appointment',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}