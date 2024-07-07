export interface Frame {
  id: string;
  createdAt: string;
  predictedClass: string;
  predictionConfidence: number;
  processedAt: string;
  updatedAt: string;
}

export interface FrameWithData extends Frame {
  data: string;
}
