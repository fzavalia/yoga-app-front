import React from 'react'
import Students from './views/students/Routes';
import Payments from './views/payments/Routes';

const routes: { path: string, component: any, name: string }[] = [
    {
        path: '/students',
        component: Students,
        name: 'Alumnos'
    },
    {
        path: '/payments',
        component: Payments,
        name: 'Pagos'
    },
    {
        path: '/classes',
        component: (props: any) => <div>Classes</div>,
        name: 'Clases'
    }
]

export default routes