// // utils/text.ts
// export const truncateText = (text: string, maxLength: number = 20): string => {
//     if (text.length <= maxLength) return text;
//     const start = text.slice(0, 10);
//     const end = text.slice(-10);
//     return `${start}...${end}`;
//   };
  

export const truncateText = (text: string, maxLength: number = 20): string => {
  const element = document.createElement('div');
  element.innerHTML = text;
  
  // Get plain text content
  const plainText = element.textContent || element.innerText || '';

  if (plainText.length <= maxLength) return text;

  const start = plainText.slice(0, 10);
  const end = plainText.slice(-10);
  
  return `${start}...${end}`;
};
