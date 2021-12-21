import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Registro',
    moduleName: 'Catalogos',
    icon: 'fas fa-money-check-alt',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'Catalogos/Razon-Social',
        title: 'Registro',
        moduleName: 'Catalogos',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'Catalogos/Main',
        title: 'Main',
        moduleName: 'Catalogos',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'Catalogos/Divisa',
        title: 'Divisa',
        moduleName: 'Catalogos',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },

     ]
   },
  {
    path: '',
    title: 'Prestamos',
    moduleName: 'oficina-virtual',
    icon: 'fas fa-desktop',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'oficina-virtual/Bandeja-de-Entrada',
        title: 'Bandeja-de-Entradao',
        moduleName: 'oficina-virtual',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [
        ]
      },
      {
        path: 'oficina-virtual/Tablero',
        title: 'ir a prestar',
        moduleName: 'oficina-virtual',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [
        ]
      },
    ]
  },
  {
    path: '',
    title: 'Depósitos',
    moduleName: 'Depositos',
    icon: 'fas fa-coins',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'Depositos/Captura-de-Depositos',
        title: 'Captura de Depósitos',
        moduleName: 'Inicio',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Procesos',
    moduleName: 'Procesos',
    icon: 'fas fa-desktop',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'Procesos/Calendar',
        title: 'Calendario',
        moduleName: 'Procesos',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },

];
export const CAPTURADATOS: RouteInfo[] = [
  {
    path: '',
    title: 'Registro',
    moduleName: 'Catalogos',
    icon: 'fas fa-money-check-alt',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'Catalogos/Razon-Social',
        title: 'Registro',
        moduleName: 'Catalogos',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },

    ]
  },
]
export const PRESTAREFECTIVO: RouteInfo[] =   [
  {
    path: '',
    title: 'Prestamos',
    moduleName: 'oficina-virtual',
    icon: 'fas fa-desktop',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'oficina-virtual/Bandeja-de-Entrada',
        title: 'Bandeja-de-Entradao',
        moduleName: 'oficina-virtual',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [
        ]
      },
      {
        path: 'oficina-virtual/Tablero',
        title: 'ir a prestar',
        moduleName: 'oficina-virtual',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [
        ]
      },
    ]
  },
  {
    path: '',
    title: 'Depósitos',
    moduleName: 'Depositos',
    icon: 'fas fa-coins',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'Depositos/Captura-de-Depositos',
        title: 'Captura de Depósitos',
        moduleName: 'Inicio',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Procesos',
    moduleName: 'Procesos',
    icon: 'fas fa-desktop',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'Procesos/Calendar',
        title: 'Calendario',
        moduleName: 'Procesos',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },

]
