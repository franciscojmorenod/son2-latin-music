import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`
      SELECT id, title, artist, album, genre, price, preview_url, 
             duration_seconds, description, cover_image_url
      FROM music_tracks
      WHERE is_active = true
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ tracks: result.rows });
  } catch (error: any) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracks' },
      { status: 500 }
    );
  }
}