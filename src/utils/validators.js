export const sanitizeText = (value) => {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').trim();
};

export const isValidText = (value) => {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= 250;
};

export const isOrderValid = (items, total) => {
  return Array.isArray(items)
    && items.length > 0
    && items.every((item) => item && typeof item.name === 'string' && typeof item.price === 'number' && item.price > 0)
    && typeof total === 'number'
    && total > 0
    && Number.isFinite(total);
};

export const isCrowdLevel = (value) => ['low', 'medium', 'high'].includes(value);
