# 🖼️ imgtext

> Write multilingual text (including RTL like Farsi, Arabic, Hebrew, Japanese) on images using Node.js + canvas + sharp.

![imgtext banner](/raw/main/media/og-image.png)

## ✨ Features

- ✅ Supports Farsi, Arabic, Japanese, Chinese, English, etc.
- ✅ Automatically handles RTL/LTR direction
- ✅ Custom font, color, size, and stroke
- ✅ Multiple positioning modes (`center`, `bottom-center`, etc.)
- ✅ Multiline wrapping based on image width
- ✅ Works in both JavaScript and TypeScript

## 📦 Installation

```bash
npm install imgtext
```

You'll also need to install the required peer dependencies in your own project:

```bash
npm install @napi-rs/canvas sharp
```

## 🚀 Quick Example

```ts
import { writeTextOnImage, tryRegisterFont } from 'imgtext';

tryRegisterFont('./fonts/NotoSansJP-Regular.otf', 'NotoSansJP');

await writeTextOnImage('input.jpg', 'output.png', {
  text: 'سلام دنیا 🌍 Hello World こんにちは',
  fontFamily: 'NotoSansJP',
  fontSize: 48,
  color: 'white',
  strokeColor: 'black',
  strokeWidth: 2,
  position: 'bottom-center',
});
```

## 🛠 API

### `writeTextOnImage(inputPath, outputPath, options)`

| Option          | Type                                                                    | Description                                               | Default        |
| --------------- | ----------------------------------------------------------------------- | --------------------------------------------------------- | -------------- |
| `text`          | `string`                                                                | The text to draw                                          | —              |
| `fontFamily`    | `string`                                                                | Name of the font (must be registered or system-available) | `"sans-serif"` |
| `fontSize`      | `number`                                                                | Font size in pixels                                       | `48`           |
| `color`         | `string`                                                                | Fill color                                                | `"white"`      |
| `strokeColor`   | `string \| null`                                                        | Optional stroke outline color                             | `null`         |
| `strokeWidth`   | `number`                                                                | Stroke width                                              | `0`            |
| `position`      | `"top-left" \| "top-center" \| "center" \| "bottom-center" \| "custom"` | Position mode                                             | `"center"`     |
| `customX`       | `number \| null`                                                        | Used when `position = "custom"`                           | `null`         |
| `customY`       | `number \| null`                                                        | Used when `position = "custom"`                           | `null`         |
| `maxWidthRatio` | `number`                                                                | Text wrap width relative to image (0–1)                   | `0.8`          |

---

### `tryRegisterFont(path, name)`

Register a custom `.ttf` or `.otf` font for multilingual support (Farsi, Arabic, Japanese, etc.)

```ts
tryRegisterFont('./fonts/NotoSansCJKjp-Regular.otf', 'NotoCJK');
```

## 🖼 Example Output

![example](https://github.com/yourusername/imgtext/raw/main/media/example-output.png)

## 📄 License

MIT © [Your Name](https://yourwebsite.com)
