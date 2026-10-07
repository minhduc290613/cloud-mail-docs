import {defineConfig} from 'vitepress'

export default defineConfig({
    locales: {
        root: {
            head: [
                [
                    'link',
                    { rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' }
                ]
            ],
            label: 'Tiếng Việt',
            lang: 'vi',
            themeConfig: {
                siteTitle: 'Cloud Mail',
                logo: '/images/logo.png',
                nav: [
                    {text: 'Trang chủ', link: '/'},
                    {text: 'Tài liệu', link: '/preview/description'},
                    {text: 'Ủng hộ ❤️', link: '/support'},
                    {text: 'Release', link: 'https://github.com/minhduc290613/cloud-mail/releases'}
                ],

                sidebar: [
                    {
                        text: 'Tổng quan dự án',
                        items: [
                            {text: 'Giới thiệu dự án', link: '/preview/description'},
                            {text: 'Nhật ký cập nhật', link: 'https://github.com/minhduc290613/cloud-mail/releases'},
                        ]
                    },
                    {
                        text: 'Hướng dẫn triển khai',
                        items: [
                            {text: 'Triển khai giao diện', link: '/guide/dashboard'},
                            {text: 'Triển khai Action', link: '/guide/action'},
                            {text: 'Triển khai dòng lệnh', link: '/guide/command'},
                            {text: 'Biến môi trường khác', link: '/guide/environment'},
                            {text: 'Cập nhật dự án', link: '/guide/update'}
                        ]
                    },
                    {
                        text: 'Cài đặt hệ thống',
                        items: [
                            {text: 'Gửi email', link: '/system/sending'},
                            {text: 'Lưu trữ đối tượng', link: '/system/object-storage'},
                            {text: 'Turnstile', link: '/system/turnstile'},
                            {text: 'Chuyển tiếp email', link: '/system/forward'},
                            {text: 'OAuth2', link: '/oauth2/oauth2.md'},
                        ]
                    },
                    {
                        text: 'Giao diện API',
                        items: [
                            {text: 'Tài liệu API', link: '/api/api-doc'},
                        ]
                    },
                    {
                        text: 'Ủng hộ ❤️', link: '/support'
                    },
                    {
                        text: 'Liên hệ', link: '/contact'
                    }
                ],

                outline: {
                    level: [2, 3]
                },

                socialLinks: [
                    {icon: 'github', link: 'https://github.com/minhduc290613/cloud-mail'},
                    {icon: 'telegram', link: 'https://t.me/minhduc290613'}
                ]
            }
        },
        en: {
            head: [
                [
                    'link',
                    { rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' }
                ]
            ],
            label: 'English',
            lang: 'en',
            link: '/en/',
            themeConfig: {
                siteTitle: 'Cloud Mail',
                logo: '/images/logo.png',
                nav: [
                    { text: 'Home', link: '/en/' },
                    { text: 'Document', link: '/en/preview/description' },
                    { text: 'Sponsor ️ ❤️', link: '/en/support' },
                    {text: 'Release', link: 'https://github.com/minhduc290613/cloud-mail/releases'}
                ],

                sidebar: [
                    {
                        text: 'Project Preview',
                        items: [
                            { text: 'Description', link: '/en/preview/description' },
                            { text: 'Changelog', link: 'https://github.com/minhduc290613/cloud-mail/releases' },
                        ]
                    },
                    {
                        text: 'Deployment Guide',
                        items: [
                            { text: 'Dashboard Deployment', link: '/en/guide/dashboard'},
                            { text: 'Action Deployment', link: '/en/guide/action' },
                            { text: 'Command Deployment', link: '/en/guide/command' },
                            {text: 'Other Variables', link: '/en/guide/environment'},
                            { text: 'Project Updates', link: '/en/guide/update' }
                        ]
                    },
                    {
                        text: 'System Settings',
                        items: [
                            {text: 'Email Sending', link: '/en/system/sending'},
                            {text: 'Object Storage', link: '/en/system/object-storage'},
                            {text: 'Turnstile', link: '/en/system/turnstile'},
                            {text: 'Email Forwarding', link: '/en/system/forward'}

                        ]
                    },
                    {
                        text: 'API',
                        items: [
                            { text: 'API Document', link: '/en/api/api-doc' },
                        ]
                    },
                    {
                        text: 'Sponsor ❤️', link: '/en/support'
                    },
                    {
                        text: 'Contact', link: '/en/contact'
                    }
                ],

                outline: {
                    level: [2, 3]
                },

                socialLinks: [
                    { icon: 'github', link: 'https://github.com/minhduc290613/cloud-mail' },
                    { icon: 'telegram', link: 'https://t.me/minhduc290613'}
                ]
            }
        }
    },
    title: "Cloud Mail",
    description: "Cloud Mail"
})
