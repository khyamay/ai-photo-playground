export interface PredictionResponse {
  id: string;
  model: string;
  version: string;
  input: {
    img: string;
  };
  logs: string;
  output: string | null;
  data_removed: boolean;
  error: string | null;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  created_at: string;
  urls: {
    cancel: string;
    get: string;
  };
}
