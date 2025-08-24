export interface MenuItem {
  title: string;
  icon: string;
  link: string;
  disabled?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Catálogo',
    icon: 'shop',
    link: '/products'
  },
];
