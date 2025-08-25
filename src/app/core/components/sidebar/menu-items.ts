import { MenuItem } from '../../models/menu-item.model';

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Catálogo',
    icon: 'shop',
    subMenuType: 'categories'
  },
  {
    title: 'Configuración',
    icon: 'setting',
    subMenuType: 'default',
    children: [
      {
        title: 'Perfil',
        icon: 'user',
        link: '/settings/profile'
      },
      {
        title: 'Seguridad',
        icon: 'lock',
        link: '/settings/security'
      }
    ]
  }
];
