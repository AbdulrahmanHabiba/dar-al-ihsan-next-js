/**
 * Utility to handle video URLs, primarily to support YouTube embeds.
 */

export interface VideoInfo {
    type: 'youtube' | 'direct' | 'unknown';
    url: string;
    embedUrl?: string;
    id?: string;
}

/**
 * Parses a video URL to determine if it's a YouTube link or a direct video link.
 */
export function getByVideoInfo(url: string | null | undefined): VideoInfo | null {
    if (!url) return null;

    // YouTube regex patterns
    const ytPatterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&#]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?&#]+)/,
    ];

    for (const pattern of ytPatterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            const id = match[1];
            return {
                type: 'youtube',
                url: url,
                embedUrl: `https://www.youtube.com/embed/${id}`,
                id: id,
            };
        }
    }

    // Check for common video extensions for direct links
    const directExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const isDirect = directExtensions.some(ext => url.toLowerCase().includes(ext));

    if (isDirect) {
        return {
            type: 'direct',
            url: url,
        };
    }

    // Default to unknown if we can't be sure, but might still be a direct link
    return {
        type: 'unknown',
        url: url,
    };
}
