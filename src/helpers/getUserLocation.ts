export const getUserLocation = async (): Promise<[number, number]> =>
	new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				resolve([coords.longitude, coords.latitude]);
			},
			(err) => {
				// eslint-disable-next-line no-alert
				alert('Could not get geolocation');
				console.error(err);
				reject();
			},
		);
	});
