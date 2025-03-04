export function formatPrice(price) {
  if (typeof price !== 'number') return '';
  return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
}
