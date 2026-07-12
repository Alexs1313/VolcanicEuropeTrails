import type {Place, TravelNote} from '../types';

export type AppPhase = 'Loader' | 'Onboarding' | 'Main';

export type AppTab =
  | 'PlacesTab'
  | 'MapTab'
  | 'SavedTab'
  | 'NotesTab'
  | 'TipsTab'
  | 'QuizTab';

export type AppOverlay =
  | {type: 'none'}
  | {type: 'PlaceDetail'; place: Place}
  | {type: 'NoteDetail'; note: TravelNote};
