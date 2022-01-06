declare namespace I18NextAsyncStorageBackend {
  interface BackendOptions {
    prefix?: string;
    expirationTime?: number;
    versions?: { [key: string]: string };
  }

  type LoadCallback = (error: any, result: string | false) => void;
}

export default class I18NextAsyncStorageBackend {
  constructor(
    services?: any,
    options?: I18NextAsyncStorageBackend.BackendOptions
  );
  init(
    services?: any,
    options?: I18NextAsyncStorageBackend.BackendOptions
  ): void;
  read(
    language: string,
    namespace: string,
    callback: I18NextAsyncStorageBackend.LoadCallback
  ): void;
  save(language: string, namespace: string, data: any): void;
  type: 'backend';
  services: any;
  options: I18NextAsyncStorageBackend.BackendOptions;
}
