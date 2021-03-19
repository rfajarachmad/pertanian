import { Funding } from '../models';

export const masterFundings: Funding[] = [
    {
        id: 1,
        code: 'APBN-P-2019',
        name: 'APBN Perubahan 2019',
        description: 'APBN Perubahan 2019',
        status: 'Active',
    },
    {
        id: 2,
        code: 'APBN-P-2020',
        name: 'APBN Perubahan 2020',
        description: 'APBN Perubahan 2020',
        status: 'Active',
    },
    { id: 3, code: 'APBD-2019', name: 'APBD 2019', description: 'APBD 2019', status: 'Active' },
    { id: 4, code: 'APBD-2020', name: 'APBD 2020', description: 'APBD 2020', status: 'Active' },
    { id: 5, code: 'SWADAYA', name: 'Swadaya', description: 'Swadaya', status: 'Active' },
];
