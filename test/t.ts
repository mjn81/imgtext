import { writeTextOnImage, tryRegisterFont } from '../src/index';

// Optional: Register a custom font (use NotoSans or any other multi-language font)
// tryRegisterFont('./fonts/NotoSans-Regular.ttf', 'NotoSans');

writeTextOnImage('input.jpg', 'output.png', {
  text: 'سلام دنیا! Hello World! 你好，世界!',
  fontFamily: 'NotoSans',
  fontSize: 50,
  color: '#FFFFFF',
  strokeColor: '#000000', // Optional outline
  strokeWidth: 2,
  position: 'bottom-center', // Or 'top-left', 'custom', etc.
  // customX: 300, customY: 100,  // only if position = 'custom'
});
