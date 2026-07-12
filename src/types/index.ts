export interface Place {
  id: string;
  title: string;
  country: string;
  region: string;
  address: string;
  coordinates: {lat: number; lon: number};
  category: PlaceCategory;
  shortDescription: string;
  fullDescription: string;
  image: any;
}

export type PlaceCategory =
  | 'VolcanoIcons'
  | 'CraterLands'
  | 'HighPeaks'
  | 'ScenicCliffs';

export interface TravelNote {
  id: string;
  number: number;
  title: string;
  shortText: string;
  fullText: string;
  image: any;
}

export interface SafetyTip {
  id: string;
  title: string;
  fullText: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface QuizLevel {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}
