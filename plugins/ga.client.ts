export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // Tạo thẻ script tải gtag.js
    const script1 = document.createElement('script')
    script1.setAttribute('async', '')
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-9Y11HZZBKG'
    document.head.appendChild(script1)

    // Tạo script cấu hình gtag
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
       gtag('config', 'G-9Y11HZZBKG');
    `
    document.head.appendChild(script2)
  }
})
