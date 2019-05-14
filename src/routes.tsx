import React from 'react'

const routes: { path: string, component: any, name: string }[] = [
    {
        path: '/students',
        component: (props: any) => <div>Students</div>,
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