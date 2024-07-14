function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

export async function replaceBlackToTransparent(imgURL: string) {
  const img = await loadImage(imgURL);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw Error("Can't create an context for canvas");
  }

  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imgData.data;

  for (let i = 0, n = pixels.length; i < n; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // const a = pixels[i+3]; // alpha

    if (r <= 20 && g <= 20 && b <= 20) {
      pixels[i + 3] = 0; // Set alpha to 0
    }
  }

  ctx.putImageData(imgData, 0, 0);

  return canvas.toDataURL();
}
