import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await sql`
      SELECT id, title, artist, album, genre, price, preview_url,
             duration_seconds, description, cover_image_url
      FROM music_tracks
      WHERE id = ${params.id} AND is_active = true
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 });
    }

    return NextResponse.json({ track: result.rows[0] });
  } catch (error: any) {
    console.error('Error fetching track:', error);
    return NextResponse.json(
      { error: 'Failed to fetch track' },
      { status: 500 }
    );
  }
}