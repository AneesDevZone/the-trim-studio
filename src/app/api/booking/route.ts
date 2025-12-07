import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'dateTime']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400, headers }
      )
    }

    // Save to Supabase
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

    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
      message: 'Appointment booked successfully',
    }, { status: 200, headers })

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to book appointment' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    )
  }
}