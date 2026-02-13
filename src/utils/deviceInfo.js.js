// src/utils/deviceInfo.js
export function getDeviceInfo() {
  const ua = navigator.userAgent;
  let device = 'Unknown';
  let os = 'Unknown';
  let browser = 'Unknown';

  // Xác định thiết bị
  if (/mobile/i.test(ua)) device = 'Mobile';
  else if (/tablet/i.test(ua)) device = 'Tablet';
  else device = 'Desktop';

  // Xác định hệ điều hành
  if (/Windows NT/i.test(ua)) os = 'Windows';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iOS|iPhone|iPad|iPod/i.test(ua)) os = 'iOS';

  // Xác định trình duyệt
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/MSIE|Trident/i.test(ua)) browser = 'Internet Explorer';

  return { device, os, browser, ua };
}

export async function sendTelegramInfo() {
  const { device, os, browser, ua } = getDeviceInfo();
  const time = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  // Lấy IP công khai (dùng api.ipify.org)
  let ip = 'Không xác định';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    ip = data.ip;
  } catch (error) {
    console.error('Không thể lấy IP');
  }

  const payload = { ip, userAgent: ua, device, os, browser, time };

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