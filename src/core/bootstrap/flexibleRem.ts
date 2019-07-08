import { BASE_FONT_SIZE, BASE_SCREEN_WIDTH } from '~/config';

function scaleFontSize() {
  const docEl = document.documentElement;
  // 获取当前页面的宽度
  const screenWidth = docEl.getBoundingClientRect().width || window.innerWidth;
  // 设置页面的字体大小
  const fontSize = (screenWidth / BASE_SCREEN_WIDTH) * BASE_FONT_SIZE;
  // 给获取到的元素(docEl)的字体大小赋值
  docEl.style.fontSize = fontSize > BASE_FONT_SIZE ? `${BASE_FONT_SIZE}px` : `${fontSize}px`;
}

export default function flexibleRem() {
  scaleFontSize();
  // 监听屏幕变化
  window.addEventListener('resize', scaleFontSize, false);
}
