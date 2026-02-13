export function getDeviceInfo() {
  const ua = navigator.userAgent;
  let device = 'Desktop';
  let os = 'Unknown';
  let browser = 'Unknown';

  // Xác định thiết bị
  if (/mobile/i.test(ua)) device = 'Mobile';
  else if (/tablet/i.test(ua)) device = 'Tablet';

  // Xác định hệ điều hành (gọn)
  if (/Windows NT/i.test(ua)) os = 'Windows';
  else if (/Mac OS X/i.test(ua) && !/iPhone|iPad|iPod/i.test(ua)) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iOS|iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Linux/i.test(ua) && !/Android/i.test(ua)) os = 'Linux';

  // Xác định trình duyệt (gộp Chromium)
  if (/Chrome/i.test(ua) || /CriOS/i.test(ua) || /Edg/i.test(ua) || /OPR/i.test(ua)) {
    browser = 'Chrome'; // Gộp tất cả các trình duyệt dùng Chromium
  } else if (/Firefox/i.test(ua)) {
    browser = 'Firefox';
  } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua) && !/CriOS/i.test(ua)) {
    browser = 'Safari';
  }

  return { device, os, browser, ua };
}

export async function sendTelegramInfo() {
  const { device, os, browser, ua } = getDeviceInfo();
  const time = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  let ip = 'Không xác định';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    ip = data.ip;
  } catch (error) {
    console.error('Không thể lấy IP');
  }

  const payload = { ip, device, os, browser, time };

  try {
    await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Gửi thông tin thất bại', error);
  }
}