// api/telegram.js
const ipCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ip, userAgent, device, os, browser, time } = req.body;

  const now = Date.now();
  const lastSent = ipCache.get(ip);
  if (lastSent && now - lastSent < CACHE_DURATION) {
    console.log(`IP ${ip} đã gửi trong 5 phút, bỏ qua.`);
    return res.status(200).json({ success: true, skipped: true });
  }

  ipCache.set(ip, now);
  for (const [key, value] of ipCache.entries()) {
    if (now - value > CACHE_DURATION) ipCache.delete(key);
  }

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Thiếu TELEGRAM_TOKEN hoặc TELEGRAM_CHAT_ID');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const message = `
🆕 Có người truy cập web Netflop!
🕒 Thời gian: ${time}
🌐 IP: ${ip}
📱 Thiết bị: ${device}
💻 Hệ điều hành: ${os}
🌍 Trình duyệt: ${browser}
  `;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) throw new Error('Telegram API error');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}