import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

interface PlacesContextProps {
	isLoading: boolean;
	userLocation?: [number, number];
	isLoadingPlaces: boolean;
	showListPlaces: boolean;
	places: Feature[];
	// Methods;
	searchPlacesByTerms: (query: string) => Promise<Feature[]>;
	setShowListPlaces: () => void;
}

export const PlacesContext = createContext<PlacesContextProps>(
	{} as PlacesContextProps,
);
