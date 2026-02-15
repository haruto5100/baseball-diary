import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: '野球観戦記録',
        short_name: '観戦記録',
        description: '野球観戦の記録をシンプルに管理するアプリケーション',
        start_url: '/',
        display: 'standalone',
        background_color: '#f3f4f6',
        theme_color: '#1e3a8a', // bg-blue-900 (approx)
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
