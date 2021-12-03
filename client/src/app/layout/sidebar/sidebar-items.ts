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

];
