import { NextResponse } from 'next/server';
import { bucket } from '@/lib/gcs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const blob = file as Blob;
    const blobName = uuidv4(); // ファイル名にはUUIDを使用
    const blobStream = bucket.file(blobName).createWriteStream();

    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    blobStream.end(buffer);

    return NextResponse.json({ message: 'File uploaded successfully', fileName: blobName });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
