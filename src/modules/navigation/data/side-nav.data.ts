import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    /* {
        text: 'CORE',
        items: ['dashboard'],
    }, */
    {
        text: 'Alsintan',
        roles: ['ADMIN', 'PENGAWAS', 'PENYULUH'],
        items: ['submissions', 'verification'],
    },
    {
        text: 'Laporan',
        roles: ['ADMIN', 'PENGAWAS', 'PENYULUH'],
        items: ['reportall', 'reportStatus', 'rekapBantuan', 'rekapKondisi'],
    },
    {
        text: 'Administrasi',
        roles: ['ADMIN'],
        items: ['master', 'user'],
    },
    /* {
        text: 'INTERFACE',
        items: ['layouts', 'pages'],
    },
    {
        text: 'ADDONS',
        items: ['charts', 'tables'],
    }, */
];

export const sideNavItems: SideNavItems = {
    // dashboard: {
    //     icon: 'tachometer-alt',
    //     text: 'Dashboard',
    //     link: '/dashboard',
    // },
    // layouts: {
    //     icon: 'columns',
    //     text: 'Layouts',
    //     submenu: [
    //         {
    //             text: 'Static Navigation',
    //             link: '/dashboard/static',
    //         },
    //         {
    //             text: 'Light Sidenav',
    //             link: '/dashboard/light',
    //         },
    //     ],
    // },
    // pages: {
    //     icon: 'book-open',
    //     text: 'Pages',
    //     submenu: [
    //         {
    //             text: 'Authentication',
    //             submenu: [
    //                 {
    //                     text: 'Login',
    //                     link: '/auth/login',
    //                 },
    //                 {
    //                     text: 'Register',
    //                     link: '/auth/register',
    //                 },
    //                 {
    //                     text: 'Forgot Password',
    //                     link: '/auth/forgot-password',
    //                 },
    //             ],
    //         },
    //         {
    //             text: 'Error',
    //             submenu: [
    //                 {
    //                     text: '401 Page',
    //                     link: '/error/401',
    //                 },
    //                 {
    //                     text: '404 Page',
    //                     link: '/error/404',
    //                 },
    //                 {
    //                     text: '500 Page',
    //                     link: '/error/500',
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // charts: {
    //     icon: 'chart-area',
    //     text: 'Charts',
    //     link: '/charts',
    // },
    // tables: {
    //     icon: 'table',
    //     text: 'Tables',
    //     link: '/tables',
    // },
    submissions: {
        icon: 'table',
        text: 'Input Data',
        link: '/submissions',
        roles: ['PENGAWAS', 'PENYULUH', 'ADMIN'],
    },
    verification: {
        icon: 'table',
        text: 'Verifikasi Data',
        link: '/submissions/verification',
        roles: ['PENGAWAS', 'ADMIN'],
    },
    reportall: {
        icon: 'table',
        text: 'Alsintan',
        link: '/reports',
        roles: ['PENGAWAS', 'PENYULUH', 'ADMIN'],
    },
    reportStatus: {
        icon: 'table',
        text: 'Status Penginputan',
        link: '/reports/submission-status',
        roles: ['PENGAWAS', 'PENYULUH', 'ADMIN'],
    },
    rekapBantuan: {
        icon: 'table',
        text: 'Cara Perolehan',
        link: '/reports/funding',
        roles: ['PENGAWAS', 'PENYULUH', 'ADMIN'],
    },
    rekapKondisi: {
        icon: 'table',
        text: 'Kondisi Alsintan',
        link: '/reports/condition',
        roles: ['PENGAWAS', 'PENYULUH', 'ADMIN'],
    },
    rekapKondisiPercent: {
        icon: 'table',
        text: 'Prosentase Kondisi',
        link: '/reports',
        roles: ['PENGAWAS', 'PENYULUH', 'ADMIN'],
    },
    rekapKecukupan: {
        icon: 'table',
        text: 'Kecukupan',
        link: '/reports/coverage',
        roles: ['PENGAWAS', 'PENYULUH', 'ADMIN'],
    },
    sebaran: {
        icon: 'table',
        text: 'Peta Sebaran',
        link: '/reports/distribution',
        roles: ['PENGAWAS', 'PENYULUH', 'ADMIN'],
    },
    master: {
        text: 'Master Data',
        icon: 'table',
        roles: ['ADMIN'],
        submenu: [
            {
                text: 'Jenis Alsintan',
                link: '/admin/master/alsintan',
                roles: ['ADMIN'],
            },
            {
                text: 'Lokasi & Luas Lahan',
                link: '/admin/master/location',
                roles: ['ADMIN'],
            },
            {
                text: 'Sumber Dana',
                link: '/admin/master/funding',
                roles: ['ADMIN'],
            },
        ],
    },
    user: {
        text: 'Pengguna',
        icon: 'table',
        link: '/admin/users',
        roles: ['ADMIN'],
    },
};
