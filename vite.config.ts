import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
	Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

	return defineConfig({
		base:
			process.env.NODE_ENV === 'production'
				? `/${process.env.BASE_URL || ''}/` // prod
				: '/', // dev,
		plugins: [react()],
	});
};

// `/${process.env.BASE_URL || ''}/`
