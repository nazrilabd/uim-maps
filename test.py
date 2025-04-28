from PIL import Image, ImageDraw
import numpy as np

# Data numerik
data = [[1, 2, 1], [3, 4, 5, 6, 7]]

# Normalisasi nilai ke range 0-255
array = np.array(data, dtype=np.float32)
array = (array / array.max()) * 255
array = array.astype(np.uint8)

# Buat gambar grayscale
img = Image.fromarray(array, mode='L')
img = img.resize((300, 200), Image.NEAREST)  # Perbesar ukuran

# Simpan
img.save('realistic_texture.png')