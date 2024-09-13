export const STATUS = {
    ACTIVE: 'active',
    CANCELLED: 'cancelled'
};

export const turnos = [
    {
        id: 1,
        date: new Date('2024-06-01'),
        time: '10:00 AM',
        userId: 101,
        status: STATUS.ACTIVE
    },
    {
        id: 2,
        date: new Date('2024-06-02'),
        time: '11:00 AM',
        userId: 102,
        status: STATUS.CANCELLED
    },
    {
        id: 3,
        date: new Date('2024-06-03'),
        time: '12:00 PM',
        userId: 103,
        status: STATUS.ACTIVE
    },
    {
        id: 4,
        date: new Date('2024-06-04'),
        time: '01:00 PM',
        userId: 104,
        status: STATUS.CANCELLED
    }
];