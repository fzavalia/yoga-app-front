import React from 'react'
import Students from './views/students/Routes';

const routes: { path: string, component: any, name: string }[] = [
    {
        path: '/students',
        component: Students,
        name: 'Alumnos'
    },
    {
        path: '/payments',
        component: (props: any) => <div>Payments</div>,
        name: 'Pagos'
    },
    {
        path: '/classes',
        component: (props: any) => <div>Classes</div>,
        name: 'Clases'
    }
]

export default routes