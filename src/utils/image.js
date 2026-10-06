// Shrinks an image file to a JPEG data URL small enough to keep in localStorage
// (browsers allow roughly 5 MB per site, shared by every saved post).
export function compressImage(file, { maxSize = 1280, quality = 0.8 } = {}) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            const ctx = canvas.getContext('2d');
            // JPEG has no transparency; paint white behind transparent PNGs instead of black.
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("That image couldn't be read. Try a different file."));
        };
        img.src = url;
    });
}
