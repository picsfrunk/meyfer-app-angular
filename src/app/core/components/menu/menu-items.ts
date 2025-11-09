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
    children : [
      {
      title: 'Por Rubros',
      icon: 'shop',
      subMenuType: 'categories',
      link: '/products'
      },
      {
        title: 'Por Marcas',
        icon: 'shop',
        subMenuType: 'brands',
        link: '/products'
      },
    ]
  },
  // {
  //   title: 'Configuración',
  //   icon: 'setting',
  //   subMenuType: 'default',
  //   children: [
  //     {
  //       title: 'Perfil',
  //       icon: 'user',
  //       link: '/settings/profile'
  //     },
  //     {
  //       title: 'Seguridad',
  //       icon: 'lock',
  //       link: '/settings/security'
  //     }
  //   ]
  // }
];
