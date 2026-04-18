export type UploadInput = {
  file: File;
  title?: string;
  altText?: string;
};

export type UploadResult = {
  title: string;
  altText: string;
  fileName: string;
  storageKey: string;
  url: string;
  mimeType: string;
  extension?: string;
  sizeBytes: number;
};

export interface StorageAdapter {
  upload(input: UploadInput): Promise<UploadResult>;
  remove(storageKey: string): Promise<void>;
}
