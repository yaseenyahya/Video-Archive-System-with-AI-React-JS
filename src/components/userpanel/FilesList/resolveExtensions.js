export default class resolveExtensions {
    isImageExtension(extension) {
        const allowedImageExtensions = ["bmp", "jpg", "jpeg", "png", "webp"];
        return allowedImageExtensions.includes(extension.toLowerCase());
    }

    isVideoExtension(extension) {
        const allowedVideoExtensions = ["mp4", "webm"];
        return allowedVideoExtensions.includes(extension.toLowerCase());
    }
    isOggExtension(extension) {
        const allowedAudioExtensions = [ "ogg"];
        return allowedAudioExtensions.includes(extension.toLowerCase());
    }
    isAudioExtension(extension) {
        const allowedAudioExtensions = ["mp3", "wav"];
        return allowedAudioExtensions.includes(extension.toLowerCase());
    }
    isPdfExtension(extension) {
        const allowedPdfExtensions = ["pdf"];
        return allowedPdfExtensions.includes(extension.toLowerCase());
    }
     convertDurationToHMS = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);

        // Format the result as "hh:mm:ss"
        const formattedDuration = `${String(hours).padStart(2, '0')}:${String(
            minutes
        ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedDuration;
    }
}