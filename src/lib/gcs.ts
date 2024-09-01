import { Storage } from '@google-cloud/storage';
import path from 'path';

const serviceKeyPath = path.join(process.cwd(), process.env.GCS_SERVICE_ACCOUNT_KEY_PATH as string);
const projectId = process.env.GCS_PROJECT_ID as string;
const bucketName = process.env.GCS_BUCKET_NAME as string;

const storage = new Storage({
  keyFilename: serviceKeyPath,
  projectId,
});

const bucket = storage.bucket(bucketName);

export { bucket };
