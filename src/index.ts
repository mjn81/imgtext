import { warnMissingPeerDeps } from './warnMissingDeps';
warnMissingPeerDeps();

import {
  createCanvas,
  loadImage,
  GlobalFonts,
  SKRSContext2D,
} from '@napi-rs/canvas';
import sharp from 'sharp';

export interface WriteTextOptions {
  text: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  strokeColor?: string | null;
  strokeWidth?: number;
  position?: 'top-left' | 'top-center' | 'center' | 'bottom-center' | 'custom';
  customX?: number | null;
  customY?: number | null;
  maxWidthRatio?: number;
}

export function tryRegisterFont(fontPath: string, familyName: string): void {
  try {
    GlobalFonts.registerFromPath(fontPath, familyName);
  } catch (_error) {
    // prefixed 'error' with an underscore
    console.warn(
      `\u26A0\uFE0F Failed to register font "${familyName}". Using system default.`,
    );
  }
}

function isRTL(text: string): boolean {
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(text);
}

function wrapText(
  ctx: SKRSContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const testLine = line + (line ? ' ' : '') + word;
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

export async function writeTextOnImage(
  inputPath: string,
  outputPath: string,
  options: WriteTextOptions,
): Promise<void> {
  const {
    text,
    fontFamily = 'sans-serif',
    fontSize = 48,
    color = 'white',
    strokeColor = null,
    strokeWidth = 0,
    position = 'center',
    customX = null,
    customY = null,
    maxWidthRatio = 0.8,
  } = options;

  const baseImage = await loadImage(inputPath);
  const width = baseImage.width;
  const height = baseImage.height;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(baseImage, 0, 0, width, height);

  ctx.font = `${fontSize}px \"${fontFamily}\"`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  ctx.direction = isRTL(text) ? 'rtl' : 'ltr';

  const maxTextWidth = width * maxWidthRatio;
  const lines = wrapText(ctx, text, maxTextWidth);
  const lineHeight = fontSize * 1.4;
  const totalHeight = lines.length * lineHeight;

  let x: number, y: number;
  switch (position) {
    case 'top-left':
      x = 20;
      y = 20;
      ctx.textAlign = 'left';
      break;
    case 'top-center':
      x = width / 2;
      y = 20;
      ctx.textAlign = 'center';
      break;
    case 'center':
      x = width / 2;
      y = height / 2 - totalHeight / 2;
      ctx.textAlign = 'center';
      break;
    case 'bottom-center':
      x = width / 2;
      y = height - totalHeight - 20;
      ctx.textAlign = 'center';
      break;
    case 'custom':
      x = customX !== null ? customX : width / 2;
      y = customY !== null ? customY : height / 2;
      ctx.textAlign = 'center';
      break;
    default:
      throw new Error(`Invalid position: ${position}`);
  }

  lines.forEach((line, index) => {
    const lineY = y + index * lineHeight;
    if (strokeColor && strokeWidth > 0) {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
      ctx.strokeText(line, x, lineY);
    }
    ctx.fillText(line, x, lineY);
  });

  const buffer = canvas.toBuffer('image/png');
  await sharp(buffer).toFile(outputPath);
}
