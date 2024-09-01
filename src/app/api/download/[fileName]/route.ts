import { NextResponse } from 'next/server';
import { bucket } from '@/lib/gcs';

export async function GET(request: Request, { params }: { params: { fileName: string } }) {
  try {
    const { fileName } = params;
    const file = bucket.file(fileName);

    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const [fileBuffer] = await file.download();
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
