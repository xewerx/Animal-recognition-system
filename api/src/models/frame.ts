import { Model } from "./model";

export interface Frame extends Model {
  processedAt: string | null;
  predictedClass: string | null;
  predictionConfidence: number | null;
}
