import { MapProvider, PlacesProvider } from './context';
import { HomeScreen } from './screens';

export const MapsApp = () => (
	<PlacesProvider>
		<MapProvider>
			<HomeScreen />
		</MapProvider>
	</PlacesProvider>
);
